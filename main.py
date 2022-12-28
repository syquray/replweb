import threading

from fastapi import FastAPI, Response
from fastapi.openapi.docs import get_swagger_ui_html
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
import uvicorn

app = FastAPI(docs_url=None)
app.mount("/_static", StaticFiles(directory="_static"), name="_static")


@app.get("/")
async def root():
  with open("_static/index.html") as f:
    return HTMLResponse(f.read())


@app.get("/util.js")
async def transport():
  with open("_static/javascript/util.js") as f:
    return Response(f.read(), media_type="text/javascript")


@app.get("/docs")
async def swagger():
  return get_swagger_ui_html(openapi_url="openapi.json",
                             title="Internal",
                             swagger_favicon_url="/_static/images/favicon.ico")


def run():
  threading.Thread(target=lambda: uvicorn.run(
    app, host="0.0.0.0", port=8000, log_level="info")).start()


run()
