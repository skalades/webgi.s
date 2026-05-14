from fastapi import APIRouter
from app.api.endpoints import features, photos, auth

api_router = APIRouter()

@api_router.get("/health")
def health_check():
    return {"status": "healthy", "service": "api"}

# Include routers
api_router.include_router(features.router, prefix="/features", tags=["Features"])
api_router.include_router(photos.router, prefix="/photos", tags=["Photos"])
api_router.include_router(auth.router, prefix="/auth", tags=["Auth"])
