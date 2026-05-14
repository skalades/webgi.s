from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy import select
from typing import List
from uuid import UUID

from app.db.session import get_db
from app.models.features import FeaturePhoto, SpatialFeature
from app.schemas.features import FeaturePhotoCreate, FeaturePhotoResponse

router = APIRouter()

@router.get("/{feature_id}", response_model=List[FeaturePhotoResponse])
def get_photos_by_feature(feature_id: UUID, db: Session = Depends(get_db)):
    """Mengambil riwayat foto untuk suatu objek spasial."""
    stmt = select(FeaturePhoto).where(FeaturePhoto.feature_id == feature_id).order_by(FeaturePhoto.taken_at.desc())
    result = db.scalars(stmt).all()
    return result

@router.post("/", response_model=FeaturePhotoResponse, status_code=status.HTTP_201_CREATED)
def create_photo(photo_in: FeaturePhotoCreate, db: Session = Depends(get_db)):
    """Menambahkan foto baru untuk suatu objek spasial."""
    # Pastikan feature_id valid
    stmt = select(SpatialFeature).where(SpatialFeature.id == photo_in.feature_id)
    feature = db.scalar(stmt)
    if not feature:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Feature with id {photo_in.feature_id} not found"
        )
        
    db_photo = FeaturePhoto(
        feature_id=photo_in.feature_id,
        photo_url=photo_in.photo_url,
        description=photo_in.description,
        taken_at=photo_in.taken_at
    )
    db.add(db_photo)
    db.commit()
    db.refresh(db_photo)
    return db_photo
