from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from pymongo import MongoClient
from bson import ObjectId
from typing import List, Optional

app = FastAPI()

# MongoDB Setup
client = MongoClient("mongodb://localhost:27017/")
db = client['fruit_db']  # Replace 'fruit_db' with your database name
faqs_collection = db['faqs']  # Replace 'faqs' with your collection name

# Pydantic model for FAQ
class FAQ(BaseModel):
    question: str
    answer: str

# CRUD Operations
@app.post("/faqs/", response_model=dict)
async def create_faq(faq: FAQ):
    result = faqs_collection.insert_one(faq.dict())
    return {"id": str(result.inserted_id)}

@app.get("/faqs/", response_model=List[dict])
async def read_faqs():
    faqs = list(faqs_collection.find())
    for faq in faqs:
        faq["_id"] = str(faq["_id"])
    return faqs

@app.get("/faqs/{faq_id}", response_model=dict)
async def read_faq(faq_id: str):
    faq = faqs_collection.find_one({"_id": ObjectId(faq_id)})
    if faq is None:
        raise HTTPException(status_code=404, detail="FAQ not found")
    faq["_id"] = str(faq["_id"])
    return faq

@app.put("/faqs/{faq_id}", response_model=dict)
async def update_faq(faq_id: str, faq: FAQ):
    result = faqs_collection.update_one({"_id": ObjectId(faq_id)}, {"$set": faq.dict()})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="FAQ not found")
    return {"id": faq_id}

@app.delete("/faqs/{faq_id}", response_model=dict)
async def delete_faq(faq_id: str):
    result = faqs_collection.delete_one({"_id": ObjectId(faq_id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="FAQ not found")
    return {"id": faq_id}
