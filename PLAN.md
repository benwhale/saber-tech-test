1. Setup AWS Account (Free Tier)
   a. Setup user/role
   b. Install AWS CLI and CDK and configure CDK with auth

2. Get a CDK stack set up with expected services and work out how to package/deploy a hello world app
   a. Investigate how to use FastAPI and Lambda together (answer: Mangum)
   i. outstanding question whether docker container would also work
   b. Initialise new cdk repo
   c. Set up the permissions using infrastructure-as-code (we are going to be deploying using CDK or Terraform, but CDK sounds lighter-weight)
   d. Create hello world lambda and deploy it

3. URL Shortening feature (API only) --> Dynamo DB

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

-- reflecting a bit on testing at the moment

5. File Upload generates short link to file destination?

   - I've implemented this, and am doing some manual testing. Noticed I need to sanitise the file string, so I've implemented a quick method for that
   - Could do with some unit tests for that method
   - Reflecting that it would be cool to have GitHub setup to run cdk deploy each time I push, but that's extra effort at the moment for a throwaway project

6. listing of urls and files (listing is the core requirement, deleting would be out of scope, but consider CRUD)

   - new lambda to get everything from db?
   - I should provide a means to list all URLs and to list all files, and to list everything
   - For later, a simple way to deal with auth/multi users would be to put them in a folder/sub section of s3 (check terms)
   - I should also update my get function to allow lambda/slug to redirect to the file location or download the file
   - I also need to think about downloading the file from S3.
   - I don't like my response objects either yet, I should tidy those up at the end.

   - Looks like generating a pre-signed URL is a sensible approach to allow file downloads without making the bucket public (big security problem there)

7. UI - initialise Next.js repo with tailwind - remember React hooks and state management.

   - Decide whether to use Amplify or if I should use Vercel given it's what Saber use
   - I am going to use Vercel as it's well integrated with next.js. I can use useState for state management
   - I initialised it, and generated a basic structure with the app router.
   - I'm quite new to tailwind, so I lifted a free tailwind template and broke it down into a couple of components. Trying to MVP while looking ok
   - React hooks I knew the core concept, but had not used in some years so relied a bit on lift and shift...
   - Got a simple input box and button connected to the API. Needed to update CORS, I've temporarily allowed everything for the purposes of dev
   - Can now enter a url and upload it! So I've done stage 8 already
   - improvements: more permissive URL entry and returning the full short URL from the API would be prefered.

8. Homepage - enter a URL
   Done above

9. Upload File page - upload a file

   - I've generated a file form and hooked it into the upload function

10. Display list of short URLs and file

- I've generated a table and sorted out date formatting from the API so this should now work. Could do with some suspense/loading behaviour
- Delete functionality would be a good next step

11. Back to Backend -- error handling and logging
    ?. Tests
    ?. Improve return typing

TODO

- validate for empty input (ensure valid before sending request)
- restore mobile menu
