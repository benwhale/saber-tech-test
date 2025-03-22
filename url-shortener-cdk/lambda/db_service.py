import os
import boto3

from datetime import datetime

client = boto3.client("dynamodb")

def unmarshal_dynamodb_item(item: dict) -> dict:
    """Convert DynamoDB item format to plain dictionary"""
    if not item:
        return None
    
    result = {}
    for key, value in item.items():
        # Get the first (and only) key from the value dict
        result[key] = list(value.values())[0]
    return result

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
            "created_at": {"S": get_iso_timestamp()} # Will be useful for the UI
            },
    )
    return response

def put_file(slug: str, filename: str, file_key: str):
    """
    Put a file in the database
    """
    timestamp = get_iso_timestamp()
    response = client.put_item(
        TableName=os.environ["TABLE_NAME"],
        Item={
            "slug": {"S": slug}, # The slug for the shortened url
            "type": {"S": "file"},
            "filename": {"S": filename}, # Gives the ability to display the filename in the UI
            "file_key": {"S": file_key},
            "created_at": {"S": timestamp}
        }
    )
    return {
        "slug": slug,
        "filename": filename,
        "file_key": file_key,
        "created_at": timestamp   
    }

def get_all_items():
    """
    Get all items from the database
    """
    response = client.scan(TableName=os.environ["TABLE_NAME"])
    return {
        "Items": [unmarshal_dynamodb_item(item) for item in response["Items"]],
        "Count": response["Count"],
        "ScannedCount": response["ScannedCount"]
    }

def get_item_by_slug(slug: str):
    """
    Get a url from the database by slug
    """
    response = client.get_item(TableName=os.environ["TABLE_NAME"], Key={"slug": {"S": slug}})
    if "Item" not in response:
        return None
    return unmarshal_dynamodb_item(response["Item"])

def get_all_items_by_type(type: str):
    """
    Get all items from the database by type
    """
    #TODO

def get_iso_timestamp() -> str:
    """
    Get the current datetime in ISO 8601 format (UTC) without microseconds.
    Returns a string like: '2024-03-22T15:47:09Z'
    """
    return datetime.now().strftime("%Y-%m-%dT%H:%M:%SZ")