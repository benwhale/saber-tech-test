from fastapi import FastAPI, UploadFile, File
from fastapi.responses import RedirectResponse, FileResponse
from mangum import Mangum
from slug_gen import generate_slug
from db_service import put_shortened_url, get_all_items, get_item_by_slug, put_file
from pydantic import BaseModel
from s3_service import upload_file as upload_file_to_s3, generate_presigned_url
from fastapi.exceptions import HTTPException

class UrlRequest(BaseModel):
    url: str

class UrlResponse(BaseModel):
    slug: str
    url: str



app = FastAPI()
handler = Mangum(app)

@app.get("/")
async def hello():
    slug = generate_slug()
    return {"slug": slug}

@app.post("/url")
async def shorten_url(url: UrlRequest) -> UrlResponse:
    slug = generate_slug()
    put_shortened_url(slug, url.url)
    return {
        "slug": slug,
        "url": url.url
    }

@app.get("/all")
async def list_urls():
    return get_all_items() # TODO: Paginate, and consider converting the response to a list of friendly objects

@app.get("/{slug}")
async def get_item(slug: str):
    response = get_item_by_slug(slug) # TODO: Consider converting the response to a friendly object
    if "Item" not in response:
        raise HTTPException(status_code=404, detail="Item not found")
    item = response["Item"]
    item_type = item["type"]["S"]

    
    if item_type == "url":
        return RedirectResponse(url=item["url"]["S"], status_code=307)
    elif item_type == "file":
        presigned_url = generate_presigned_url(
            key=item["file_key"]["S"],
            original_filename=item["filename"]["S"]
            )
        return RedirectResponse(url=presigned_url, status_code=307)

@app.get("/{slug}/detail")
async def get_item_detail(slug: str):
    return get_item_by_slug(slug) # TODO: Consider converting the response to a friendly object


@app.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    result = await upload_file_to_s3(file)
    filename, key = result.values()
    slug = generate_slug()
    return put_file(slug, filename, key)
    