# URL Shortener Lambda Function

FastAPI application deployed as an AWS Lambda function for URL shortening and file upload services.

## Components

- `main.py` - FastAPI application entry point and route handlers
- `db_service.py` - DynamoDB interaction service
- `s3_service.py` - S3 file storage service
- `slug_gen.py` - Random slug generation for shortened URLs

## Local Development

1. Create and activate virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Run locally with uvicorn:
```bash
uvicorn main:app --reload
```

The API will be available at `http://localhost:8000`

## API Endpoints

- `POST /url` - Shorten a URL
- `POST /upload` - Upload a file
- `GET /items` - List all shortened URLs and files
- `GET /{slug}` - Access a shortened URL or file

## Environment Variables

The following environment variables are required:
- `TABLE_NAME` - DynamoDB table name
- `BUCKET_NAME` - S3 bucket name
- `API_URL` - Base URL for the API Gateway

Note: When running locally, you'll need AWS credentials configured with appropriate permissions for DynamoDB and S3.