1. Setup AWS Account (Free Tier)
   a. Setup user/role
   b. Install AWS CLI and CDK and configure CDK with auth

2. Get a CDK stack set up with expected services and work out how to package/deploy a hello world app
   a. Investigate how to use FastAPI and Lambda together (answer: Mangum)
   i. outstanding question whether docker container would also work
   b. Initialise new cdk repo
   c. Set up the permissions using infrastructure-as-code (we are going to be deploying using CDK or Terraform, but CDK sounds lighter-weight)
   d. Create hello world lambda and deploy it <-- we are here

3. URL Shortening feature (API only) --> Dynamo DB

3a. Listing urls? (or do later)

4. File Upload feature (only upload file)

5. File Upload generates short link to file destination?

6. listing of urls and files (listing is the core requirement, deleting would be out of scope, but consider CRUD)

7. UI - initialise Next.js repo with tailwind - remember React hooks and state management.

8. Homepage - enter a URL
9. Homepage - upload a file
10. Display list of short URLs and file
