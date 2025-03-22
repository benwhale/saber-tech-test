import os
import boto3

from datetime import datetime

client = boto3.client("dynamodb")

def put_shortened_url(slug: str, url: str):
    """
    Put a shortened url in the database
    """
    response = client.put_item(
        TableName=os.environ["TABLE_NAME"],
        Item={
            "slug": {"S": slug},
            "type": {"S": "url"},
            "url": {"S": url},
            "created_at": {"S": datetime.now().isoformat()} # Will be useful for the UI
            },
    )
    return response

def put_file(slug: str, filename: str, file_url: str, file_key: str):
    """
    Put a file in the database
    """
    response = client.put_item(
        TableName=os.environ["TABLE_NAME"],
        Item={
            "slug": {"S": slug}, # The slug for the shortened url
            "type": {"S": "file"},
            "filename": {"S": filename}, # Gives the ability to display the filename in the UI
            "url": {"S": file_url},
            "file_key": {"S": file_key},
            "created_at": {"S": datetime.now().isoformat()}
        }
    )
    return {
        "slug": slug,
        "filename": filename,
        "url": file_url,
        "file_key": file_key,
        "created_at": datetime.now().isoformat() # TODO: Cheating for debugging
    }

def get_all_items():
    """
    Get all items from the database
    """
    response = client.scan(TableName=os.environ["TABLE_NAME"]) # Simple scan, no filters
    return response

def get_item_by_slug(slug: str):
    """
    Get a url from the database by slug
    """
    response = client.get_item(TableName=os.environ["TABLE_NAME"], Key={"slug": {"S": slug}})
    return response

def get_all_items_by_type(type: str):
    """
    Get all items from the database by type
    """
    #TODO


