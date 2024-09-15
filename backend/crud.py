from sqlalchemy.orm import Session
from models import FAQ
from schemas import FAQCreate, FAQUpdate

def get_faqs(db: Session, skip: int = 0, limit: int = 10):
    return db.query(FAQ).offset(skip).limit(limit).all()

def get_faq(db: Session, faq_id: int):
    return db.query(FAQ).filter(FAQ.id == faq_id).first()

def create_faq(db: Session, faq: FAQCreate):
    db_faq = FAQ(question=faq.question, answer=faq.answer)
    db.add(db_faq)
    db.commit()
    db.refresh(db_faq)
    return db_faq

def update_faq(db: Session, faq_id: int, faq: FAQUpdate):
    db_faq = db.query(FAQ).filter(FAQ.id == faq_id).first()
    if db_faq:
        db_faq.question = faq.question
        db_faq.answer = faq.answer
        db.commit()
        db.refresh(db_faq)
        return db_faq
    return None

def delete_faq(db: Session, faq_id: int):
    db_faq = db.query(FAQ).filter(FAQ.id == faq_id).first()
    if db_faq:
        db.delete(db_faq)
        db.commit()
        return db_faq
    return None
