from fastapi import FastAPI, UploadFile, File
from mangum import Mangum
from slug_gen import generate_slug
from db_service import put_shortened_url, get_all_items, get_item_by_slug, put_file
from pydantic import BaseModel
from s3_service import upload_file as upload_file_to_s3


class Url(BaseModel):
    url: str

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
    return get_all_items() # TODO: Paginate, and consider converting the response to a list of friendly objects

@app.get("/url/{slug}")
async def get_url(slug: str):
    return get_item_by_slug(slug) # TODO: Consider converting the response to a friendly object

@app.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    result = await upload_file_to_s3(file)
    filename, url, key = result.values()
    slug = generate_slug()
    return put_file(slug, filename, url, key)
    