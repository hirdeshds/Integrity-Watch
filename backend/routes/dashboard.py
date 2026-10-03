"""
PrahariAI — Dashboard Routes
"""

from fastapi import APIRouter
from services.data_generator import generate_dashboard_stats, generate_timeline_events

router = APIRouter(prefix="/api/dashboard", tags=["Dashboard"])


@router.get("/stats")
def get_dashboard_stats():
    """Get overview statistics for the command center dashboard."""
    return generate_dashboard_stats()


@router.get("/timeline")
def get_timeline_events(channel: str = "all"):
    """
    Get real-time threat timeline events.
    Filter by channel: all, offline, online
    """
    events = generate_timeline_events()
    if channel != "all":
        events = [e for e in events if e["channel"] == channel]
    return {"events": events, "total": len(events)}
