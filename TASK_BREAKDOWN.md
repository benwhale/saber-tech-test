# Project: Mini URL Shortener with File Uploads

Timeline: One Week

## Overview

We are building a URL shortener similar to Bit.ly that also supports file uploads. We need to support multiple users, with Authentication and Access Control and ensure that they can only access their own shortened URLs and files.

## Key Functional Requirements

* A user must log in using an email/password, which should use JWT-based authentication
* Users can only access their own shortened URLs and uploaded files
* A user can shorten a URL and recieve a unique short code
* Upload a file, and the API should return a short link to download it.
* View their list of shortened URLs and uploaded files.

## Tech Stack

### Backend

#### Serverless AWS
* Lambda
* API Gateway
* DynamoDB
* S3
* Cognito

#### API
* Python
* FastAPI returning JSON
* Pytest for Unit Tests
* Hosted on Lambda

### Frontend
* Next.js
* React
* Tailwind
* Vercel for hosting

## Task Breakdown

### Backend Tasks (Assigned to Backend Developer)

* FastAPI Endpoints
  * Implement a file shortening endpoint which stores a url in DynamoDB with a random slug
  * Implement a file upload endpoint which stores a file in S3 in a way that associates it with the user.  
    * The API should return a short link stored in DynamoDB to download it
  * Implement an endpoint to retrieve user-specific links and files
  * Implement an endpoint that lists all of the user's links and files
  * Implement JWT Authentication using AWS Cognito and JWT Validation
  * Secure the endpoints based upon the authenticated user
* Build FastAPI backend as an AWS Lambda Function
* Define DynamoDB schema for URL and fine storage with user scoping
* Testing Strategy
  * Unit testing with pytest for core functionality
  * Integration test suite with mock API calls to validate user access

### Frontend Tasks (Assigned to Frontend Developer)

* Next.js Components
  * Login UI
  * UI for URL Shortening and File Uploads
  * UI for displaying user's history of shortened URLs and uploaded files
* UI Design
  * Responsive, clean UI designed using TailwindCSS
  * Display results using React hooks and state management
* Authentication integration
  * Handle JWT storage securely
* API Integration - fetch() or axios
* Testing Strategy
  * Unit test components using Jest with React Testing Library
  * Integratio tests - validate API calls with a mock
  * End to End testing - Cypress to test auth and core workflows
  * Accessibility testing (if required)
  * Error handling and validation - ensure user errors are correctly handled and fed back.

### DevOps Tasks (Assigned to DevOps Engineer)

* AWS Infrastructure Setup
  * Provision DynamoDB, S3, API Gateway, and Lambda using AWS CDK.
  * Set up Cognito for authentication.
  * Ensure access control & billing monitoring.
  * Work with frontend to set up Vercel automation (if needed).
* CDK Deployment
  * Automate backend deployments via CI/CD pipeline.
  * Support in deployments to AWS, and increase automation of deployments.
* API Gateway Configuration
  * Configure JWT validation at API Gateway.
* CI/CD Pipeline
  * Set up GitHub Actions for automated testing & deployment.


## Timeline

### Day 1: Planning and Setup

Frontend

* Set Up Next JS Project
* Create UI wireframe
* Validate API contract with Back End

Backend

* Define API Routes for
  * Authentication flow
  * Shorten URL
  * Upload File
  * Retrieve file/link
  * List files
* Set up FastAPI project structure
* Define DynamoDB object schema
* If time start on auth flow to unblock UI.

DevOps

* Set up AWS CDK project
* Provision AWS resources and set up Cognito (needed for tomorrow)
* Ensure access control, and set up billing monitoring
* Work with Front End to set up Vercel automation (if neeeded)
  
End State: Projects initialised.

### Day 2: Authentication & Core API Skeleton

Frontend

* Implement Authentication UI
* Handle JWT Storage
* Begin building core UI structure (Pages, layout, display components)
* Component and unit test as we go

Backend

* Implement JWT Authentication flow (Cognito)
* Create Skeleton routes requiring authentication (STUB response for now)
* If time start on URL shortening logic first
* Unit test as we go

DevOps

* API Gateway configuration to validate JWTs
* Setup GitHub actions CI/CD

End State: Authentication working to FastAPI, soft start on functionality

### Day 3: Core Features & Integration (Functionally Complete)

Frontend

* Build URL Shortening UI
* Build File Upload Form
* Build Display list
* Integrate with API using axios/fetch.
  * Utilise the Skeleton routes from yesterday that should be returning Mock Data until Backend work complete, then try and integrate)

Backend
* Build URL shortening logic into API endpoint w/ DynamoDB
* Implement file upload to S3, separate file by user and store short URL in DynamoDB
* Implement list/history endpoint to return a user's URLs and Files

Devops
* Support in deployments to AWS, and increase automation of deployments
* Potentially overflow work with CI/CD, billing, monitoring from yesterday

End State: Functionally complete, and integrated - effort moving to bug fixes and testing

### Day 4: Testing and Bug Fixes

Frontend
* Fix any issues remaining from integration on day 3
* Refine UI (ideally iterate on feedback once we have functional completeness from Day 3)
* Harden validation, logging, error handling
* Harden component testing and set up e2e testing

Backend
* Fix any issues remaining from integration on day 3 - particularly looking out for authentication and permissions issues
* Ensure logging/monitoring sufficient
* Strengthen unit testing and start integration testing

DevOps
* Security Checks, assist with permissions issues.
* Check logging/monitoring is sufficient
* Finalise infrastructure for production

### Day 5: Final testing and deployment to production

Frontend
* Final UI tweaks, e2e test
* Accessibility testing (if required)

Backend
* Integration Testing
* Final API hardening, optimisations

DevOps
* Deploy Frontend to Vercel production
* Deploy Backend to AWS production environment


## Risk Assessment & Mitigation

* Aim is to resolve authentication first, as this could be fiddly
* Integrating quickly (Planned by Day 3)
* Security of user data
  * Separated in S3 by username
  * Only allow access by presigned URL
  * Only allow generation of presigned URL by validated user JWT Token
* Large files could slow down API
  * Mitigation (and security consideration) -- pre-signed URLS mentioned above will ensure that the frontend is uploading directly to S3
  * Multi-part uploads for large files
* Large files could cost a lot
  * Consider file size limits, retention time/policy, avoidance of duplicate files?
* Front end blocking API calls
  * Lazy loading for large datasets, use suspense to load in a page skeleton
  * Ideally we want paging/scrolling implemented rather than returning everything back.
* Use CORS correctly to ensure that our API can only be called from our deployed service.

## Testing Strategy

Backend
* Unit Tests - pytest
* Integration tests - mock API calls
* Consider load testing depending on amount of expected use (k6)

Frontend
* Component tests with Jest + React Testing Library
* E2E tests with Cypress to test auth and API integration
* Accessibility testing (consider automated tools - we should aim for WCAG compliance)
* Check for error handling and validation edge cases

DevOps
* CI/CD pipeline to automate test runs and avoid broken deployments
* Health check of deployed services
* Validation of infrastructure
* Security audits (Iam Role, API gateway permissions)
* Monitoring and alerting of unusual behaviour

## Basic Auth Flow - Login

* User accesses application
* User logs in on the UI, which authenticates with AWS Cognito (We are manually creating accounts for our first cut)
* UI stores JWT securely (httpOnly cookies)

Basic Auth Flow - Request
* UI sends request to API Gateway with JWT
* JWT validated and request allowed to FastAPI
* FastAPI reads the user from the JWT


