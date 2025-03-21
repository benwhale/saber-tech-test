import boto3
from fastapi import UploadFile, HTTPException
from slug_gen import generate_slug
from botocore.exceptions import ClientError
import logging
import os


s3 = boto3.client("s3")

async def upload_file(file: UploadFile): 
    slug = generate_slug() # Use a slug to avoid collisions
    file_key = f"{slug}-{file.filename}"
    
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
    
        return {
            "filename": file.filename,
            "url": file_url,
            "key": file_key
        }
    
    except ClientError as e:
        logging.error(e)
        raise HTTPException(status_code=500, detail=str(e))


