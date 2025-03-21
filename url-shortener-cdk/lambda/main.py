from fastapi import FastAPI
from mangum import Mangum
from slug_gen import generate_slug
from db_service import put_shortened_url
from pydantic import BaseModel

class Url(BaseModel):
    url: str

class File(BaseModel):
    file: str # temporary



app = FastAPI()
handler = Mangum(app)

@app.get("/")
async def hello():
    slug = generate_slug()
    return {"slug": slug}

@app.post("/url")
async def shorten_url(url: Url):
    slug = generate_slug()
    return put_shortened_url(slug, url.url)

