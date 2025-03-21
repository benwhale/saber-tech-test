1. Setup AWS Account (Free Tier)
   a. Setup user/role
   b. Install AWS CLI and CDK and configure CDK with auth

2. Get a CDK stack set up with expected services and work out how to package/deploy a hello world app
   a. Investigate how to use FastAPI and Lambda together (answer: Mangum)
   i. outstanding question whether docker container would also work
   b. Initialise new cdk repo
   c. Set up the permissions using infrastructure-as-code (we are going to be deploying using CDK or Terraform, but CDK sounds lighter-weight)
   d. Create hello world lambda and deploy it 

3. URL Shortening feature (API only) --> Dynamo DB <-- we are here

   - This needs associate a long url with a random slug.
   - We should ensure the random slug is long enough to limit clashes - my first assumption is to use a UUID, although this will not actually shorten it.
   - Because it is random rather than sequential, we will need to handle the case when the slug is already in use
     - Given we are in python, and it'll save an API call, I think we should try to add to the database and if we get an error saying the key is already in use then we try again
     - Either that, or does DynamoDB handle random keys? Maybe we should utilise DB functionality instead -- research this
   - Python libraries... slugify wouldn't be random. Sqids (formerly Hashids) could be interesting. Should probably use a salt to make it more secure. Although it doesn't need to be secure, just a random slug associated in the database. So I could just generate a random number and put it in base 32? Or perhaps just use random.choices from the alphanumeric characters for the number of characters I need given it's not actually important it just needs to be short and random
   - NOTE - I should definitely unit test this :D

   - I will need boto3 for db interaction, but I'm going to start an initial version with just the 

3a. Listing urls? (or do later)

4. File Upload feature (only upload file)

   - lambda for uploading a file and displaying the url?

5. File Upload generates short link to file destination?

   - first lambda to upload the file calls second lambda to shorten the url

6. listing of urls and files (listing is the core requirement, deleting would be out of scope, but consider CRUD)

   - new lambda to get everything from db?

7. UI - initialise Next.js repo with tailwind - remember React hooks and state management.

8. Homepage - enter a URL
9. Homepage - upload a file
10. Display list of short URLs and file
