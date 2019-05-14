from fastapi import FastAPI
from pydantic import BaseModel
from typing import List
from starlette.middleware.cors import CORSMiddleware
import json


app = FastAPI()
app.add_middleware(CORSMiddleware, allow_origins=['*'], allow_methods=['*'], allow_headers=['*'])


@app.get("/")
def read_root():
    return {"Hello": "World"}
