import boto3
from fastapi import UploadFile, HTTPException
from slug_gen import generate_slug
from botocore.exceptions import ClientError
import logging
import os
import re


s3 = boto3.client("s3")

def generate_safe_filename(s: str):
    """
    Generate a safe string from a given string
    """

    # Split the filename into the name and extension
    name_parts = s.rsplit(".", 1) # Split from the right once to get the extension
    name = name_parts[0]
    extension = name_parts[1] if len(name_parts) > 1 else ""

    # Sanitise the name
    name = name.lower().strip() # Lowercase and remove leading and trailing whitespace
    name = re.sub(r'[^\w\s-]', '', name) # Remove non-alphanumeric characters
    name = re.sub(r'[\s_-]+', '-', name) # Replace spaces with dashes
    name = re.sub(r'^-+|-+$', '', name) # Remove leading and trailing dashes

    # Return the sanitised name and extension
    return f"{name}.{extension}"

def generate_presigned_url(key: str, original_filename: str):
    """
    Generate a presigned URL for a given key
    """

    try:
        params = {
            'Bucket': os.environ['BUCKET_NAME'],
            'Key': key
        }

        # If the original filename is provided, add it to the response  
        if original_filename:
            params['ResponseContentDisposition'] = f'attachment; filename="{original_filename}"'

        return s3.generate_presigned_url(
            'get_object',
            Params=params,
            ExpiresIn=3600 # URL expires in 1 hour
        )
    except ClientError as e:
        logging.error(e)
        raise HTTPException(status_code=500, detail=str(e))

async def upload_file(file: UploadFile): 
    slug = generate_slug() # Use a slug to avoid collisions
    filename = generate_safe_filename(file.filename)
    file_key = f"{slug}-{filename}"
    
    try:
        s3.upload_fileobj(
            file.file,
            os.environ['BUCKET_NAME'],
            file_key
        )

        # Generate the URL
        bucket_name = os.environ['BUCKET_NAME']
        region = s3.meta.region_name or "eu-west-2"
        file_url = f"https://{bucket_name}.s3.{region}.amazonaws.com/{file_key}"

        logging.info(f"Uploaded file {file.filename} to {file_url} with key {file_key}")
        
        return {
            "filename": file.filename, # Original filename the user provided
            "key": file_key # The key of the uploaded file which contains the slug and the sanitised filename
        }
    
    except ClientError as e:
        logging.error(e)
        raise HTTPException(status_code=500, detail=str(e))


