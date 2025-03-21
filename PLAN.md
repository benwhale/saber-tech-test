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

   - I will need boto3 for db interaction, but I'm going to start an initial version with just the slug generation

   - Now that I've created that, I want to create a new entry in my database each time I call that API endpoint with a url. Lets start by adding a post endpoint to accept the URL and return an object with the doc

   - Now I've done that; I need to actually push it to DynamoDB. Time to read up.
   - This now works!

3a. Listing urls? (or do later)

    - Decided it felt like a complete feature to list urls
    - I've added in a scan for all entries (looks like it's limited to 1MB, so a smarter solution needed in future to scroll through)
    - Seemed sensible to test the looking up as well, so added a single url/slug get

---

Diversion from plan. Doing some research into best way to host that UI on-demand

Looks like AWS Amplify is my easiest option with 12 months free tier.

---

4. File Upload feature (only upload file)

   - Current plan is to re-use the same lambda that I'm currently working with (but I do need to read up and check if that's a bad idea - though task says deploy as an AWS Lambda function which implies single)
   - https://fastapi.tiangolo.com/tutorial/request-files/

   - I've now got a file upload working that returns the location. Plan will be to use my URL shortener to create and store this in DynamoDB.
   - However I'm going to need to make sure you can distinguish between files and links, so maybe a new field needed for my objects (optional filename?)

5. File Upload generates short link to file destination?

   - first lambda to upload the file calls second lambda to shorten the url

6. listing of urls and files (listing is the core requirement, deleting would be out of scope, but consider CRUD)

   - new lambda to get everything from db?

7. UI - initialise Next.js repo with tailwind - remember React hooks and state management.

8. Homepage - enter a URL
9. Homepage - upload a file
10. Display list of short URLs and file
