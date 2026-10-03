"""
PrahariAI — Analytics Routes
"""

from fastapi import APIRouter
from services.data_generator import generate_analytics

router = APIRouter(prefix="/api/analytics", tags=["Analytics"])


@router.get("/")
def get_analytics():
    """Get full analytics data — trends, heatmap, model performance, upcoming exams."""
    return generate_analytics()


@router.get("/risk-trend")
def get_risk_trend():
    """Get risk score trend over 24 hours."""
    data = generate_analytics()
    return {"risk_trend": data["risk_trend"]}


@router.get("/model-performance")
def get_model_performance():
    """Get ML model performance metrics."""
    data = generate_analytics()
    return data["model_performance"]


@router.get("/upcoming-exams")
def get_upcoming_exams():
    """Get list of upcoming exams with countdowns."""
    data = generate_analytics()
    return {"exams": data["upcoming_exams"]}
