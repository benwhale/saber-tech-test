from fastapi import FastAPI
from mangum import Mangum
from slug_gen import generate_slug

app = FastAPI()
handler = Mangum(app)

@app.get("/")
async def hello():
    slug = generate_slug()
    return {"slug": slug}