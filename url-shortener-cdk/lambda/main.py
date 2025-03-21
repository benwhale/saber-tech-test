from fastapi import FastAPI
from mangum import Mangum
from slug_gen import generate_slug
from db_service import put_shortened_url, get_all_urls, get_url_by_slug
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

@app.get("/urls")
async def list_urls():
    return get_all_urls() # TODO: Paginate, and consider converting the response to a list of friendly objects

@app.get("/url/{slug}")
async def get_url(slug: str):
    return get_url_by_slug(slug) # TODO: Consider converting the response to a friendly object