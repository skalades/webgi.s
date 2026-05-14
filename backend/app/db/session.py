import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from dotenv import load_dotenv

# Memuat variabel lingkungan dari file .env
load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

# Membuat engine SQLAlchemy
engine = create_engine(DATABASE_URL)

# Membuat session factory
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base class untuk model database
Base = declarative_base()

# Dependency untuk mendapatkan session DB di endpoint FastAPI
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
