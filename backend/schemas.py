from pydantic import BaseModel

class FAQBase(BaseModel):
    question: str
    answer: str

class FAQCreate(FAQBase):
    pass

class FAQUpdate(FAQBase):
    pass

class FAQInDB(FAQBase):
    id: int

    class Config:
        orm_mode = True
