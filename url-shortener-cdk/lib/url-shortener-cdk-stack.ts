import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as cr from 'aws-cdk-lib/custom-resources';

export class UrlShortenerCdkStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create S3 Bucket for File Uploads
    const fileUploadBucket = new s3.Bucket(this, 'FileUploadBucket', {
      removalPolicy: cdk.RemovalPolicy.DESTROY, // Deletes bucket when stack is removed (for testing)
      autoDeleteObjects: true, // WARNING: Deletes all objects (Only use in development)
    });

    // Create DynamoDB Table for URL Shortener
    const urlTable = new dynamodb.Table(this, 'UrlShortenerTable', {
      partitionKey: { name: 'slug', type: dynamodb.AttributeType.STRING },
      removalPolicy: cdk.RemovalPolicy.DESTROY, // Deletes table when stack is removed (for testing)
    });

    // IAM Role for Lambda
    const lambdaRole = new iam.Role(this, 'LambdaExecutionRole', {
      assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
      managedPolicies: [
        iam.ManagedPolicy.fromAwsManagedPolicyName('service-role/AWSLambdaBasicExecutionRole'),
      ],
    });

    // Allow Lambda to Write to DynamoDB
    urlTable.grantReadWriteData(lambdaRole);

    // Allow Lambda to Upload and Read from S3
    fileUploadBucket.grantReadWrite(lambdaRole);

    // Create Lambda Function (FastAPI Backend)
    const urlShortenerLambda = new lambda.Function(this, 'UrlShortenerLambda', {
      runtime: lambda.Runtime.PYTHON_3_12,
      handler: 'main.handler', // Use mangum handler for fastAPI app
      code: lambda.Code.fromAsset('lambda', {
        bundling: {
          image: lambda.Runtime.PYTHON_3_12.bundlingImage,
          command: [
            'bash', '-c',
            'pip install -r requirements.txt -t /asset-output && cp -au . /asset-output' // build python application and package dependencies - credit https://subaud.io/blog/deploying-python-lambda-with-requirements-using-cdk
          ],
        },
      }),
      role: lambdaRole,
      environment: { // Use environment variables in the lambda function to store names of resources. Populated in the custom resource below

      },
    });
    // Create API Gateway for FastAPI
    const api =new apigateway.LambdaRestApi(this, 'UrlShortenerApi', {
      handler: urlShortenerLambda,
      defaultCorsPreflightOptions: {
        allowOrigins: apigateway.Cors.ALL_ORIGINS,
        allowMethods: apigateway.Cors.ALL_METHODS,
        allowHeaders: apigateway.Cors.DEFAULT_HEADERS,
        allowCredentials: true
      }
    });

     // Create Custom Resource to update Lambda environment
     new cr.AwsCustomResource(this, 'UpdateLambdaEnvironment', {
      onCreate: {
        service: 'Lambda',
        action: 'updateFunctionConfiguration',
        parameters: {
          FunctionName: urlShortenerLambda.functionName,
          Environment: {
            Variables: {
              TABLE_NAME: urlTable.tableName,
              BUCKET_NAME: fileUploadBucket.bucketName,
              API_URL: api.url
            }
          }
        },
        physicalResourceId: cr.PhysicalResourceId.of('UpdateLambdaEnvironment')
      },
      policy: cr.AwsCustomResourcePolicy.fromStatements([
        new iam.PolicyStatement({
          actions: ['lambda:UpdateFunctionConfiguration'],
          resources: [urlShortenerLambda.functionArn]
        })
      ])
    });

    // Outputs
    new cdk.CfnOutput(this, 'ApiUrl', { value: api.url });
    new cdk.CfnOutput(this, 'S3BucketName', { value: fileUploadBucket.bucketName });
    new cdk.CfnOutput(this, 'DynamoDBTableName', { value: urlTable.tableName });
  }
}
