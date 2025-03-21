# Build instructions

Install dependencies using requirements.txt and venv

```bash
python3 -m venv venv
source ./venv/bin/activate
```

# Deployment instructions

```bash
cdk deploy
```

Run locally: `uvicorn main:app --reload`

navigate to /docs for swagger docs

TODO - ensure that top level README has instructions for installing AWS CLI/CDK or at least mentions them.
