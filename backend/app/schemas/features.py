from pydantic import BaseModel, Field
from typing import Optional, Dict, Any, List
from uuid import UUID
from datetime import datetime

# --- PHOTO SCHEMAS ---

class FeaturePhotoBase(BaseModel):
    photo_url: str
    description: Optional[str] = None
    taken_at: Optional[datetime] = None

class FeaturePhotoCreate(FeaturePhotoBase):
    feature_id: UUID

class FeaturePhotoResponse(FeaturePhotoBase):
    id: UUID
    feature_id: UUID
    created_at: datetime

    class Config:
        from_attributes = True


# --- FEATURE SCHEMAS ---

class SpatialFeatureBase(BaseModel):
    name: str
    type: str  # POINT, LINESTRING, POLYGON
    attributes: Optional[Dict[str, Any]] = None

class SpatialFeatureCreate(SpatialFeatureBase):
    # Untuk geom, kita terima sebagai GeoJSON dict atau WKT string
    geom: Any = Field(..., description="GeoJSON geometry or WKT string")

class SpatialFeatureResponse(SpatialFeatureBase):
    id: UUID
    geom: Any  # Kita akan kembalikan sebagai GeoJSON
    created_at: datetime

    class Config:
        from_attributes = True

# Skema untuk detail dengan foto
class SpatialFeatureDetailResponse(SpatialFeatureResponse):
    photos: List[FeaturePhotoResponse] = []
