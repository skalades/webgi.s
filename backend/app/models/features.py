import uuid
from datetime import datetime
from sqlalchemy import Column, String, DateTime, ForeignKey, JSON
from sqlalchemy.dialects.postgresql import UUID
from geoalchemy2 import Geometry
from app.db.session import Base

class SpatialFeature(Base):
    __tablename__ = "spatial_features"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String, nullable=False)
    type = Column(String, nullable=False)  # POINT, LINESTRING, POLYGON
    geom = Column(Geometry(geometry_type='GEOMETRY', srid=4326))
    attributes = Column(JSON)
    created_at = Column(DateTime, default=datetime.utcnow)

class FeaturePhoto(Base):
    __tablename__ = "feature_photos"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    feature_id = Column(UUID(as_uuid=True), ForeignKey("spatial_features.id"))
    photo_url = Column(String, nullable=False)
    description = Column(String)
    taken_at = Column(DateTime)
    created_at = Column(DateTime, default=datetime.utcnow)
