from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy import select, func
from typing import List
import json

from app.db.session import get_db
from app.models.features import SpatialFeature
from app.schemas.features import SpatialFeatureCreate, SpatialFeatureResponse
from app.api.deps import get_current_user
from app.models.user import User
from shapely.geometry import shape

router = APIRouter()

@router.get("/", response_model=List[SpatialFeatureResponse])
def get_features(db: Session = Depends(get_db)):
    """Mengambil semua data spasial. Geometri dikonversi ke GeoJSON."""
    stmt = select(
        SpatialFeature.id,
        SpatialFeature.name,
        SpatialFeature.type,
        SpatialFeature.attributes,
        SpatialFeature.created_at,
        func.ST_AsGeoJSON(SpatialFeature.geom).label("geom_json")
    )
    result = db.execute(stmt).all()
    
    features = []
    for row in result:
        geom_dict = json.loads(row.geom_json) if row.geom_json else None
        features.append({
            "id": row.id,
            "name": row.name,
            "type": row.type,
            "attributes": row.attributes,
            "created_at": row.created_at,
            "geom": geom_dict
        })
    return features

@router.post("/", response_model=SpatialFeatureResponse, status_code=status.HTTP_201_CREATED)
def create_feature(
    feature_in: SpatialFeatureCreate, 
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Membuat data spasial baru. Menerima GeoJSON untuk field geom. Memerlukan login."""
    try:
        # Konversi GeoJSON ke WKT menggunakan Shapely
        if isinstance(feature_in.geom, dict):
            shp = shape(feature_in.geom)
            wkt_geom = shp.wkt
        else:
            wkt_geom = feature_in.geom
            
        db_feature = SpatialFeature(
            name=feature_in.name,
            type=feature_in.type,
            attributes=feature_in.attributes,
            geom=wkt_geom
        )
        db.add(db_feature)
        db.commit()
        db.refresh(db_feature)
        
        return {
            "id": db_feature.id,
            "name": db_feature.name,
            "type": db_feature.type,
            "attributes": db_feature.attributes,
            "created_at": db_feature.created_at,
            "geom": feature_in.geom
        }
        
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Error creating feature: {str(e)}"
        )
