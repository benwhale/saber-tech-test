# URL Shortener CDK

AWS CDK project for deploying the URL shortener backend infrastructure.

## Prerequisites

- Node.js (v18+)
- AWS CLI configured with appropriate credentials
- AWS CDK CLI (`npm install -g aws-cdk`)

## Setup

1. Install dependencies:
```bash
npm install
```

2. Install Python dependencies for Lambda:
```bash 
cd lambda
pip install -r requirements.txt
```

## Deploy

Deploy the stack to AWS:
```bash
cdk deploy
```

The deployment will output the API Gateway URL which can be used as the backend endpoint.

## Useful CDK Commands

* `cdk diff`        Compare deployed stack with current state
* `cdk synth`       Emit the synthesized CloudFormation template
* `cdk destroy`     Remove the stack from AWS