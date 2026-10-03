"""
PrahariAI — Audit Log Routes
"""

from fastapi import APIRouter, Query
from services.data_generator import generate_audit_log

router = APIRouter(prefix="/api/audit", tags=["Audit Log"])


@router.get("/")
def get_audit_log(
    actor_type: str = "all",
    action_type: str = "all",
    severity: str = "all",
    limit: int = Query(default=50, le=200),
):
    """
    Get audit log entries with optional filters.
    """
    entries = generate_audit_log()

    if actor_type != "all":
        entries = [e for e in entries if e["actor_type"] == actor_type]
    if action_type != "all":
        entries = [e for e in entries if e["action_type"] == action_type]
    if severity != "all":
        entries = [e for e in entries if e.get("severity") == severity]

    entries = entries[:limit]

    return {"entries": entries, "total": len(entries)}


@router.get("/summary")
def get_audit_summary():
    """Get audit log compliance summary."""
    entries = generate_audit_log()
    return {
        "total_events": 14847,
        "integrity_verified_pct": 100.0,
        "automated_actions": 0,
        "identity_reveals": 3,
    }
