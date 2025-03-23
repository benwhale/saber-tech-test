# Sabermine technical test - Ben Whale

This repository contains my submission for the Sabermine technical test.

The code for Part 1 (Coding Challenge Mini URL Shortener with File Uploads) is inside the `url-shortener-cdk` and `url-shortener-ui` folders.

The submission for Part 2 (Task Breakdown) is in `TASK_BREAKDOWN.md`

## Architecture

- Backend: AWS Lambda with FastAPI, using Mangum for AWS Lambda integration
- Storage: DynamoDB for URL/file metadata, S3 for file storage
- Frontend: Next.js with TypeScript and Tailwind CSS
- Deployment: Backend on AWS (CDK) behind AWS API Gateway, Frontend on Vercel

## Features

- URL shortening with random slug generation
- File upload to S3 with secure pre-signed URLs for downloads
- Combined history view of shortened URLs and uploaded files
- Mobile-responsive UI

## Deployed Solution

The deployed UI can be accessed at https://saber-tech-test.vercel.app/

## Technical Implementation Notes

- Uses pre-signed URLs for secure file downloads without making S3 bucket public
- DynamoDB scan currently limited to 1MB (pagination would be needed for production)
- File names are sanitized before storage
- Combined Lambda function handling both URL shortening and file uploads

## Known limitations

* The codebase suffers from a lack of tests, and limited method documentation
* Error handling and logging could also be significantly improved but was constrained by time
* CORS is disabled for ease of testing
* DynamoDB listing is limited to 1MB of data (would need pagination for production)
* No delete functionality implemented
* Basic URL validation could be more permissive

## Future Improvements

* Implement proper CORS configuration
* Add pagination for URL/file listing
* Add delete functionality
* Implement user authentication and per-user file storage
* Add comprehensive testing suite
* Improve error handling and logging
* Set up CI/CD with automated CDK deployment
* Add loading states and better UI feedback

## Development Process

My working notes are inside notes/WORKLOG_AND_NOTES.md. I maintained this as I progressed through the tasks to demonstrate my thinking. It is intended to act as an aide memoir for running through the submission.

There's a reasonable git commit history available as well 