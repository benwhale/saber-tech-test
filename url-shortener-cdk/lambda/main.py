from fastapi import FastAPI
from mangum import Mangum
from slug_gen import generate_slug
from pydantic import BaseModel

class Url(BaseModel):
    url: str

class File(BaseModel):
    file: str # temporary

class URLDocument(BaseModel):
    url: str
    slug: str

app = FastAPI()
handler = Mangum(app)

@app.get("/")
async def hello():
    slug = generate_slug()
    return {"slug": slug}

@app.post("/url")
async def shorten_url(url: Url):
    slug = generate_slug()
    doc = URLDocument(url=url.url, slug=slug)
    return doc
