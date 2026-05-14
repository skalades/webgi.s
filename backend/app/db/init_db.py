import sys
import os
from sqlalchemy import text, select

# Pastikan path backend terdaftar
sys.path.append(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))

from app.db.session import Base, engine, SessionLocal
from app.models.features import SpatialFeature, FeaturePhoto
from app.models.user import User
from app.core.security import get_password_hash

def init_db():
    print("Inisialisasi database...")
    try:
        with engine.connect() as conn:
            # Aktifkan PostGIS
            conn.execute(text("CREATE EXTENSION IF NOT EXISTS postgis;"))
            conn.commit()
            print("Ekstensi PostGIS diaktifkan.")
            
            # Buat tabel
            Base.metadata.create_all(bind=engine)
            print("Tabel-tabel berhasil dibuat.")
            
        # Seed user default
        db = SessionLocal()
        try:
            stmt = select(User).where(User.username == "admin")
            user = db.scalar(stmt)
            if not user:
                default_user = User(
                    username="admin",
                    hashed_password=get_password_hash("Petrov@@13"),
                    is_active=True
                )
                db.add(default_user)
                db.commit()
                print("User default 'admin' berhasil dibuat.")
            else:
                print("User 'admin' sudah ada.")
        except Exception as e:
            db.rollback()
            print(f"Error seeding user: {e}")
        finally:
            db.close()
            
    except Exception as e:
        print(f"Error: {e}")
        print("\nPastikan:")
        print("1. Server PostgreSQL berjalan.")
        print("2. Database 'forestguard_db' sudah dibuat.")
        print("3. Kredensial di backend/.env sudah benar.")

if __name__ == "__main__":
    init_db()
