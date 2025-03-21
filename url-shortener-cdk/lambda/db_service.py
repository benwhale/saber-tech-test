import os
import boto3

client = boto3.client("dynamodb")


def put_shortened_url(slug: str, url: str):
    """
    Put a shortened url in the database
    """
    response = client.put_item(
        TableName=os.environ["TABLE_NAME"],
        Item={"slug": {"S": slug}, "url": {"S": url}},
    )
    return response

def get_all_urls():
    """
    Get all urls from the database
    """
    response = client.scan(TableName=os.environ["TABLE_NAME"]) # Simple scan, no filters
    return response

def get_url_by_slug(slug: str):
    """
    Get a url from the database by slug
    """
    response = client.get_item(TableName=os.environ["TABLE_NAME"], Key={"slug": {"S": slug}})
    return response
