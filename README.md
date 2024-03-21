# Sign In using Google and S3 File Uploader

In this application, users can sign in using google authentication.
After the users get logged in, they can upload any type of file with max limit of 1GB. The uploaded file will be saved to AWS S3 bucket. The files will be private to the users particularly. Only a logged-in user will be able to view the uploaded file.

## Project Setup

Add the following credentials to your .env file.

- Create a MongoDb URI.
- Generate Google OAuth2.0 credentials from the Google Cloud console.
- Create a private S3 bucket with custom policy for signed-url and add a dedicated IAM user for the S3 bucket.

## Keys

- DB_URL
- GOOGLE_CLIENT_ID
- GOOGLE_CLIENT_SECRET
- AWS_BUCKET_NAME
- AWS_BUCKET_REGION
- AWS_ACCESS_KEY_ID
- AWS_SECRET_ACCESS_KEY
