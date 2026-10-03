"""
PrahariAI — Alert Routes
"""

from fastapi import APIRouter, HTTPException
from services.data_generator import generate_alerts

router = APIRouter(prefix="/api/alerts", tags=["Alerts"])


@router.get("/")
def get_all_alerts(severity: str = "all"):
    """Get all alerts, optionally filtered by severity."""
    alerts = generate_alerts()
    if severity != "all":
        alerts = [a for a in alerts if a["severity"] == severity]
    # Return summary view (without full details)
    summaries = []
    for a in alerts:
        summaries.append({
            "id": a["id"],
            "title": a["title"],
            "description": a["description"],
            "paper_name": a["paper_name"],
            "risk_score": a["risk_score"],
            "severity": a["severity"],
            "timestamp": a["timestamp"],
            "time_ago": a["time_ago"],
            "is_new": a["is_new"],
            "exam_countdown_days": a["exam_countdown_days"],
        })
    return {"alerts": summaries, "total": len(summaries)}


@router.get("/{alert_id}")
def get_alert_detail(alert_id: str):
    """Get full alert details including timeline, score breakdown, and actions."""
    alerts = generate_alerts()
    from services.data_generator import generate_timeline_events

    alert = next((a for a in alerts if a["id"] == alert_id), None)
    if not alert:
        raise HTTPException(status_code=404, detail=f"Alert {alert_id} not found")

    # Attach relevant timeline events
    all_events = generate_timeline_events()
    alert["timeline_events"] = [
        e for e in all_events if e.get("related_alert_id") == alert_id
    ]

    return alert
