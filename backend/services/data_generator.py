"""
PrahariAI — Synthetic Data Generator
Generates the "Operation Physics Paper" scenario and baseline data
for demonstration and testing purposes.
"""

import random
import hashlib
from datetime import datetime, timedelta
from typing import Any


def _hash(text: str) -> str:
    """Generate a short signature hash."""
    return hashlib.sha256(text.encode()).hexdigest()[:16]


def _time_ago(dt: datetime) -> str:
    """Return human-readable relative time."""
    diff = datetime.now() - dt
    mins = int(diff.total_seconds() / 60)
    if mins < 1:
        return "just now"
    if mins < 60:
        return f"{mins} min ago"
    hours = mins // 60
    if hours < 24:
        return f"{hours}h ago"
    return f"{diff.days}d ago"


# ─────────────────────────────────────────────────────────
# Employees
# ─────────────────────────────────────────────────────────

EMPLOYEES = [
    {"id": "EMP_4521", "name": "Employee_4521", "department": "Chemistry", "role": "Content Reviewer", "risk_score": 8},
    {"id": "EMP_3892", "name": "Employee_3892", "department": "Physics", "role": "Content Reviewer", "risk_score": 5},
    {"id": "EMP_1093", "name": "Employee_1093", "department": "Mathematics", "role": "Data Entry", "risk_score": 3},
    {"id": "EMP_7320", "name": "Employee_7320", "department": "Administration", "role": "Logistics", "risk_score": 4},
    {"id": "EMP_4393", "name": "Employee_4393", "department": "Physics", "role": "Senior Reviewer", "risk_score": 6},
    {"id": "EMP_1092", "name": "Employee_1092", "department": "Chemistry", "role": "Data Entry", "risk_score": 2},
    {"id": "EMP_4524", "name": "Employee_4524", "department": "Biology", "role": "Content Reviewer", "risk_score": 3},
    {"id": "EMP_8830", "name": "Analyst_8830", "department": "IT Security", "role": "SOC Analyst", "risk_score": 7},
    {"id": "MGR_1092", "name": "Manager_1092", "department": "Administration", "role": "Operations Manager", "risk_score": 5},
    {"id": "ANL_7732", "name": "Analyst_7732", "department": "IT Security", "role": "Junior Analyst", "risk_score": 4},
]


# ─────────────────────────────────────────────────────────
# Custody Boxes & Routes
# ─────────────────────────────────────────────────────────

def generate_custody_boxes() -> list[dict[str, Any]]:
    """Generate custody box data including the compromised BOX-7789."""

    planned_route_7789 = [
        {"lat": 26.9124, "lng": 75.7873, "label": "Printing Press, Jaipur"},
        {"lat": 26.8500, "lng": 75.8200, "label": "Checkpoint A"},
        {"lat": 26.7800, "lng": 75.9000, "label": "Checkpoint B"},
        {"lat": 26.6500, "lng": 76.0500, "label": "Warehouse, Tonk Rd"},
    ]

    actual_route_7789 = [
        {"lat": 26.9124, "lng": 75.7873, "label": "Printing Press, Jaipur"},
        {"lat": 26.8500, "lng": 75.8200, "label": "Checkpoint A"},
        {"lat": 26.7800, "lng": 75.9000, "label": "Checkpoint B"},
        # Deviation starts here
        {"lat": 26.7200, "lng": 75.6500, "label": "DEVIATION — Off-route stop"},
        {"lat": 26.6800, "lng": 75.7000, "label": "Returning to route"},
        {"lat": 26.6500, "lng": 76.0500, "label": "Warehouse, Tonk Rd"},
    ]

    boxes = [
        {
            "id": "BOX-7789",
            "label": "Physics Paper — State Board",
            "status": "tamper_detected",
            "lat": 26.7200,
            "lng": 75.6500,
            "seal_state": "BROKEN",
            "temperature": 23.0,
            "last_update": (datetime.now() - timedelta(minutes=14)).isoformat(),
            "planned_route": planned_route_7789,
            "actual_route": actual_route_7789,
            "deviation_point": {"lat": 26.7200, "lng": 75.6500, "km_off_route": 40},
            "employee_nearby": "Employee_4521",
            "open_duration_min": 6,
        },
        {
            "id": "BOX-5532",
            "label": "Chemistry Paper — State Board",
            "status": "en_route",
            "lat": 26.8800,
            "lng": 75.8400,
            "seal_state": "SEALED",
            "temperature": 22.5,
            "last_update": (datetime.now() - timedelta(minutes=2)).isoformat(),
            "planned_route": [
                {"lat": 26.9124, "lng": 75.7873, "label": "Printing Press"},
                {"lat": 26.8200, "lng": 75.9200, "label": "Warehouse"},
            ],
            "actual_route": [
                {"lat": 26.9124, "lng": 75.7873, "label": "Printing Press"},
                {"lat": 26.8800, "lng": 75.8400, "label": "In Transit"},
            ],
            "deviation_point": None,
            "employee_nearby": None,
            "open_duration_min": None,
        },
        {
            "id": "BOX-9104",
            "label": "Mathematics Paper — State Board",
            "status": "en_route",
            "lat": 26.9000,
            "lng": 75.7600,
            "seal_state": "SEALED",
            "temperature": 23.2,
            "last_update": (datetime.now() - timedelta(minutes=5)).isoformat(),
            "planned_route": [
                {"lat": 26.9124, "lng": 75.7873, "label": "Printing Press"},
                {"lat": 26.7500, "lng": 76.1000, "label": "Exam Center"},
            ],
            "actual_route": [
                {"lat": 26.9124, "lng": 75.7873, "label": "Printing Press"},
                {"lat": 26.9000, "lng": 75.7600, "label": "In Transit"},
            ],
            "deviation_point": None,
            "employee_nearby": None,
            "open_duration_min": None,
        },
        {
            "id": "BOX-3301",
            "label": "Biology Paper — State Board",
            "status": "delivered",
            "lat": 26.6500,
            "lng": 76.0500,
            "seal_state": "SEALED",
            "temperature": 22.8,
            "last_update": (datetime.now() - timedelta(hours=3)).isoformat(),
            "planned_route": [
                {"lat": 26.9124, "lng": 75.7873, "label": "Printing Press"},
                {"lat": 26.6500, "lng": 76.0500, "label": "Warehouse"},
            ],
            "actual_route": [
                {"lat": 26.9124, "lng": 75.7873, "label": "Printing Press"},
                {"lat": 26.6500, "lng": 76.0500, "label": "Warehouse"},
            ],
            "deviation_point": None,
            "employee_nearby": None,
            "open_duration_min": None,
        },
        {
            "id": "BOX-6612",
            "label": "English Paper — State Board",
            "status": "delayed",
            "lat": 26.8100,
            "lng": 75.8800,
            "seal_state": "SEALED",
            "temperature": 24.1,
            "last_update": (datetime.now() - timedelta(minutes=45)).isoformat(),
            "planned_route": [
                {"lat": 26.9124, "lng": 75.7873, "label": "Printing Press"},
                {"lat": 26.7000, "lng": 76.0000, "label": "Exam Center B"},
            ],
            "actual_route": [
                {"lat": 26.9124, "lng": 75.7873, "label": "Printing Press"},
                {"lat": 26.8100, "lng": 75.8800, "label": "Stopped — Traffic"},
            ],
            "deviation_point": None,
            "employee_nearby": None,
            "open_duration_min": None,
        },
    ]
    return boxes


# ─────────────────────────────────────────────────────────
# Timeline Events (Operation Physics Paper)
# ─────────────────────────────────────────────────────────

def generate_timeline_events() -> list[dict[str, Any]]:
    """Generate the Operation Physics Paper event chain."""
    base = datetime.now() - timedelta(minutes=14)

    events = [
        {
            "id": "EVT-001",
            "timestamp": (base).strftime("%I:%M %p"),
            "iso_timestamp": base.isoformat(),
            "title": "Badge Scan Near Route Point",
            "subtitle": "Employee_4521 badge detected near BOX-7789 transit route",
            "channel": "offline",
            "source": "Access-control log",
            "severity": "medium",
            "related_alert_id": "ALT-001",
        },
        {
            "id": "EVT-002",
            "timestamp": (base + timedelta(minutes=2)).strftime("%I:%M %p"),
            "iso_timestamp": (base + timedelta(minutes=2)).isoformat(),
            "title": "Box Opened Off-Route",
            "subtitle": "BOX-7789 opened 40km off planned route · Open for 6 min",
            "channel": "offline",
            "source": "Tamper sensor + GPS",
            "severity": "critical",
            "related_alert_id": "ALT-001",
        },
        {
            "id": "EVT-003",
            "timestamp": (base + timedelta(minutes=8)).strftime("%I:%M %p"),
            "iso_timestamp": (base + timedelta(minutes=8)).isoformat(),
            "title": "Off-Hours Login",
            "subtitle": "Employee_4521 first off-hours login this month",
            "channel": "online",
            "source": "Auth log",
            "severity": "high",
            "related_alert_id": "ALT-001",
        },
        {
            "id": "EVT-004",
            "timestamp": (base + timedelta(minutes=8, seconds=30)).strftime("%I:%M %p"),
            "iso_timestamp": (base + timedelta(minutes=8, seconds=30)).isoformat(),
            "title": "Wrong Subject Access",
            "subtitle": "Chemistry reviewer opened Physics_Paper_Final_v3.pdf",
            "channel": "online",
            "source": "Document log",
            "severity": "high",
            "related_alert_id": "ALT-001",
        },
        {
            "id": "EVT-005",
            "timestamp": (base + timedelta(minutes=9)).strftime("%I:%M %p"),
            "iso_timestamp": (base + timedelta(minutes=9)).isoformat(),
            "title": "File Downloaded",
            "subtitle": "Physics_Paper_Final_v3.pdf downloaded (normally view-only)",
            "channel": "online",
            "source": "Document log",
            "severity": "critical",
            "related_alert_id": "ALT-001",
        },
        {
            "id": "EVT-006",
            "timestamp": (base + timedelta(minutes=10)).strftime("%I:%M %p"),
            "iso_timestamp": (base + timedelta(minutes=10)).isoformat(),
            "title": "Screenshot Detected",
            "subtitle": "Screenshot activity on document view for Employee_4521",
            "channel": "online",
            "source": "Endpoint agent",
            "severity": "critical",
            "related_alert_id": "ALT-001",
        },
    ]

    # Add some normal baseline events (negative test cases)
    normal_base = datetime.now() - timedelta(hours=2)
    normal_events = [
        {
            "id": "EVT-N01",
            "timestamp": (normal_base).strftime("%I:%M %p"),
            "iso_timestamp": normal_base.isoformat(),
            "title": "Routine Login",
            "subtitle": "Employee_3892 logged in during work hours",
            "channel": "online",
            "source": "Auth log",
            "severity": "low",
            "related_alert_id": None,
        },
        {
            "id": "EVT-N02",
            "timestamp": (normal_base + timedelta(minutes=5)).strftime("%I:%M %p"),
            "iso_timestamp": (normal_base + timedelta(minutes=5)).isoformat(),
            "title": "Document Viewed",
            "subtitle": "Employee_3892 viewed Physics paper (assigned subject)",
            "channel": "online",
            "source": "Document log",
            "severity": "low",
            "related_alert_id": None,
        },
        {
            "id": "EVT-N03",
            "timestamp": (normal_base + timedelta(minutes=30)).strftime("%I:%M %p"),
            "iso_timestamp": (normal_base + timedelta(minutes=30)).isoformat(),
            "title": "BOX-5532 Checkpoint Scan",
            "subtitle": "BOX-5532 scanned at Checkpoint A — on schedule",
            "channel": "offline",
            "source": "RFID scanner",
            "severity": "low",
            "related_alert_id": None,
        },
    ]

    return events + normal_events


# ─────────────────────────────────────────────────────────
# Alerts
# ─────────────────────────────────────────────────────────

def generate_alerts() -> list[dict[str, Any]]:
    """Generate alert data including the critical Physics paper alert."""
    now = datetime.now()

    alerts = [
        {
            "id": "ALT-001",
            "title": "Cross-Channel Anomaly: Physics Paper",
            "description": "Physical custody breach followed by unauthorized digital access to the same paper within 6 minutes.",
            "paper_name": "Physics_Paper_Final_v3.pdf",
            "risk_score": 90,
            "severity": "critical",
            "timestamp": (now - timedelta(minutes=14)).isoformat(),
            "time_ago": "14 min ago",
            "is_new": True,
            "exam_countdown_days": 3,
            "ai_explanation": (
                "Physical custody breach of BOX-7789 at 11:47 PM was followed "
                "6 minutes later by off-hours access, download and screenshot of "
                "the same paper by Employee_4521, a Chemistry reviewer whose badge "
                "was scanned near the breach location at 11:45 PM."
            ),
            "score_breakdown": [
                {"component": "Online anomaly", "points": 30, "color": "#7C5CFC", "reason": "Off-hours login + wrong subject + download + screenshot"},
                {"component": "Offline anomaly", "points": 27, "color": "#00E5FF", "reason": "Off-route box opening, 6 minutes open duration"},
                {"component": "Cross-channel correlation", "points": 25, "color": "#FF4757", "reason": "Physical breach → digital access within 6 min, badge nearby"},
                {"component": "Baseline risk", "points": 8, "color": "#5A6478", "reason": "Normal starting level for this user profile"},
            ],
            "recommended_actions": [
                {"id": "ACT-01", "label": "Review Immediately", "description": "Open full evidence chain and sensor data", "priority": "high", "is_checked": False},
                {"id": "ACT-02", "label": "Activate Backup Paper Set", "description": "Switch to reserve Physics paper immediately", "priority": "critical", "is_checked": False},
                {"id": "ACT-03", "label": "Temporary Access Suspension", "description": "Revoke Employee_4521 document access pending review", "priority": "high", "is_checked": False},
            ],
            "dual_approval": {
                "required": True,
                "reviewer_1": {"id": "INV-001", "name": "Investigator A", "status": "approved", "timestamp": (now - timedelta(minutes=2)).isoformat()},
                "reviewer_2": {"id": None, "name": None, "status": "pending", "timestamp": None},
            },
        },
        {
            "id": "ALT-002",
            "title": "Unusual Access Pattern: Chemistry Paper",
            "description": "Employee_1092 accessed Chemistry paper 4 times in 20 minutes during off-hours.",
            "paper_name": "Chemistry_Paper_v2.pdf",
            "risk_score": 62,
            "severity": "high",
            "timestamp": (now - timedelta(hours=1, minutes=23)).isoformat(),
            "time_ago": "1h 23m ago",
            "is_new": True,
            "exam_countdown_days": 5,
            "ai_explanation": "Repeated access pattern detected outside normal work hours for a Data Entry role.",
            "score_breakdown": [
                {"component": "Online anomaly", "points": 35, "color": "#7C5CFC", "reason": "Repeated access in short window + off-hours"},
                {"component": "Baseline risk", "points": 12, "color": "#5A6478", "reason": "Role baseline for Data Entry"},
                {"component": "Temporal", "points": 15, "color": "#FFD93D", "reason": "Exam proximity escalation"},
            ],
            "recommended_actions": [
                {"id": "ACT-04", "label": "Flag for Review", "description": "Add to investigation queue", "priority": "medium", "is_checked": False},
            ],
            "dual_approval": {"required": False, "reviewer_1": None, "reviewer_2": None},
        },
        {
            "id": "ALT-003",
            "title": "Route Deviation: BOX-6612",
            "description": "English paper transport stopped for 45 minutes — possible traffic or unscheduled halt.",
            "paper_name": "English_Paper_v1.pdf",
            "risk_score": 45,
            "severity": "medium",
            "timestamp": (now - timedelta(minutes=45)).isoformat(),
            "time_ago": "45 min ago",
            "is_new": False,
            "exam_countdown_days": 7,
            "ai_explanation": "Transport vehicle stopped for extended period. No tamper event detected but duration exceeds threshold.",
            "score_breakdown": [
                {"component": "Offline anomaly", "points": 25, "color": "#00E5FF", "reason": "Extended stop outside planned schedule"},
                {"component": "Baseline risk", "points": 5, "color": "#5A6478", "reason": "Normal starting level"},
                {"component": "Temporal", "points": 15, "color": "#FFD93D", "reason": "Exam proximity factor"},
            ],
            "recommended_actions": [
                {"id": "ACT-05", "label": "Monitor", "description": "Continue tracking — escalate if tamper detected", "priority": "medium", "is_checked": False},
            ],
            "dual_approval": {"required": False, "reviewer_1": None, "reviewer_2": None},
        },
        {
            "id": "ALT-004",
            "title": "New Device Login",
            "description": "Employee_7320 logged in from unrecognized device.",
            "paper_name": "N/A",
            "risk_score": 28,
            "severity": "low",
            "timestamp": (now - timedelta(hours=4)).isoformat(),
            "time_ago": "4h ago",
            "is_new": False,
            "exam_countdown_days": 3,
            "ai_explanation": "New device detected for routine login. No document access anomaly found.",
            "score_breakdown": [
                {"component": "Online anomaly", "points": 15, "color": "#7C5CFC", "reason": "New device fingerprint"},
                {"component": "Baseline risk", "points": 4, "color": "#5A6478", "reason": "Normal starting level"},
                {"component": "Temporal", "points": 9, "color": "#FFD93D", "reason": "Exam proximity minor factor"},
            ],
            "recommended_actions": [],
            "dual_approval": {"required": False, "reviewer_1": None, "reviewer_2": None},
        },
    ]
    return alerts


# ─────────────────────────────────────────────────────────
# Collusion Graph Data
# ─────────────────────────────────────────────────────────

def generate_collusion_graph() -> dict[str, Any]:
    """Generate the collusion network graph data."""

    nodes = [
        {"id": "EMP_4521", "label": "Employee_4521", "type": "employee", "risk_score": 90, "is_suspicious": True, "department": "Chemistry"},
        {"id": "EMP_4393", "label": "Employee_4393", "type": "employee", "risk_score": 45, "is_suspicious": True, "department": "Physics"},
        {"id": "MGR_1092", "label": "Manager_1092", "type": "employee", "risk_score": 55, "is_suspicious": True, "department": "Administration"},
        {"id": "EMP_3892", "label": "Employee_3892", "type": "employee", "risk_score": 12, "is_suspicious": False, "department": "Physics"},
        {"id": "EMP_1093", "label": "Employee_1093", "type": "employee", "risk_score": 8, "is_suspicious": False, "department": "Mathematics"},
        {"id": "EMP_1092", "label": "Employee_1092", "type": "employee", "risk_score": 15, "is_suspicious": False, "department": "Chemistry"},
        {"id": "EMP_4524", "label": "Employee_4524", "type": "employee", "risk_score": 10, "is_suspicious": False, "department": "Biology"},
        {"id": "EMP_7320", "label": "Employee_7320", "type": "employee", "risk_score": 22, "is_suspicious": False, "department": "Administration"},
        {"id": "ANL_8830", "label": "Analyst_8830", "type": "employee", "risk_score": 18, "is_suspicious": False, "department": "IT Security"},
        {"id": "ANL_7732", "label": "Analyst_7732", "type": "employee", "risk_score": 9, "is_suspicious": False, "department": "IT Security"},
        # Document nodes
        {"id": "DOC_PHYS", "label": "Physics_Paper_Final_v3.pdf", "type": "document", "risk_score": 95, "is_suspicious": True, "department": None},
        {"id": "DOC_CHEM", "label": "Chemistry_Paper_v2.pdf", "type": "document", "risk_score": 40, "is_suspicious": False, "department": None},
        # Location nodes
        {"id": "LOC_ROUTE", "label": "Route Point (Off-Route)", "type": "location", "risk_score": 85, "is_suspicious": True, "department": None},
    ]

    edges = [
        # Suspicious cluster
        {"source": "EMP_4521", "target": "DOC_PHYS", "weight": 0.95, "is_suspicious": True, "label": "Downloaded + Screenshot"},
        {"source": "EMP_4393", "target": "DOC_PHYS", "weight": 0.6, "is_suspicious": True, "label": "Accessed within window"},
        {"source": "MGR_1092", "target": "DOC_PHYS", "weight": 0.5, "is_suspicious": True, "label": "Shared access link"},
        {"source": "EMP_4521", "target": "EMP_4393", "weight": 0.7, "is_suspicious": True, "label": "Badge proximity + shared access"},
        {"source": "EMP_4521", "target": "MGR_1092", "weight": 0.6, "is_suspicious": True, "label": "Sequential access pattern"},
        {"source": "EMP_4393", "target": "MGR_1092", "weight": 0.4, "is_suspicious": True, "label": "Co-located during off-hours"},
        {"source": "EMP_4521", "target": "LOC_ROUTE", "weight": 0.9, "is_suspicious": True, "label": "Badge detected at deviation point"},
        # Normal connections
        {"source": "EMP_3892", "target": "DOC_PHYS", "weight": 0.2, "is_suspicious": False, "label": "Assigned reviewer — normal access"},
        {"source": "EMP_1092", "target": "DOC_CHEM", "weight": 0.15, "is_suspicious": False, "label": "Data entry — normal access"},
        {"source": "EMP_1093", "target": "EMP_3892", "weight": 0.1, "is_suspicious": False, "label": "Same floor — routine interaction"},
        {"source": "EMP_4524", "target": "EMP_1093", "weight": 0.1, "is_suspicious": False, "label": "Team meeting attendees"},
        {"source": "EMP_7320", "target": "MGR_1092", "weight": 0.15, "is_suspicious": False, "label": "Reports to — normal"},
        {"source": "ANL_8830", "target": "ANL_7732", "weight": 0.1, "is_suspicious": False, "label": "SOC team — normal"},
        {"source": "ANL_8830", "target": "EMP_4521", "weight": 0.3, "is_suspicious": False, "label": "Investigating this alert"},
    ]

    patterns = [
        {"id": "PAT-01", "description": "3 users accessed Physics paper within 12-minute window", "confidence": "high", "related_nodes": ["EMP_4521", "EMP_4393", "MGR_1092"]},
        {"id": "PAT-02", "description": "2 users from non-Physics department accessed Physics paper", "confidence": "high", "related_nodes": ["EMP_4521", "MGR_1092"]},
        {"id": "PAT-03", "description": "Badge proximity detected at same off-route location", "confidence": "high", "related_nodes": ["EMP_4521", "LOC_ROUTE"]},
        {"id": "PAT-04", "description": "Coordinated document downloads with sequential timing", "confidence": "medium", "related_nodes": ["EMP_4521", "EMP_4393"]},
    ]

    clusters = [
        {
            "id": "CLU-01",
            "label": "Suspected Collusion Group",
            "nodes": ["EMP_4521", "EMP_4393", "MGR_1092"],
            "risk_score": 85,
        }
    ]

    return {"nodes": nodes, "edges": edges, "patterns": patterns, "clusters": clusters}


# ─────────────────────────────────────────────────────────
# Analytics Data
# ─────────────────────────────────────────────────────────

def generate_analytics() -> dict[str, Any]:
    """Generate analytics data — trends, heatmap, model performance."""

    # Risk trend over 24 hours
    random.seed(42)
    risk_trend = []
    for h in range(24):
        base_score = 2.0 + random.random() * 1.5
        # Spikes around alert times
        if h in [2, 3]:
            base_score = 6.0 + random.random() * 3
        if h == 23:
            base_score = 8.0 + random.random() * 2
        risk_trend.append({
            "hour": f"{h:02d}:00",
            "score": round(base_score, 1),
            "has_alert": h in [3, 23],
        })

    # Activity heatmap (day × hour)
    days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    heatmap = []
    for day in days:
        for hour in range(24):
            is_work = 9 <= hour <= 18 and day not in ["Sat", "Sun"]
            count = random.randint(15, 45) if is_work else random.randint(0, 8)
            is_anomalous = (
                (day == "Wed" and hour in [2, 3, 23])
                or (day == "Sat" and hour in [22, 23])
            )
            if is_anomalous:
                count = random.randint(20, 35)
            heatmap.append({
                "day": day,
                "hour": hour,
                "count": count,
                "is_anomalous": is_anomalous,
            })

    model_performance = {
        "recall": 96.8,
        "precision": 95.1,
        "f1_score": 95.9,
        "confusion_matrix": {"tp": 968, "fp": 32, "fn": 49, "tn": 195},
        "last_retrained": (datetime.now() - timedelta(hours=2)).isoformat(),
        "model_version": "v2.4",
    }

    upcoming_exams = [
        {"id": "EX-001", "name": "State Board Physics", "date": (datetime.now() + timedelta(days=3)).strftime("%b %d, %I:%M %p"), "countdown": "3 days 0 hrs"},
        {"id": "EX-002", "name": "State Board Chemistry", "date": (datetime.now() + timedelta(days=5)).strftime("%b %d, %I:%M %p"), "countdown": "5 days 2 hrs"},
        {"id": "EX-003", "name": "State Board Mathematics", "date": (datetime.now() + timedelta(days=8)).strftime("%b %d, %I:%M %p"), "countdown": "8 days 14 hrs"},
        {"id": "EX-004", "name": "State Board Biology", "date": (datetime.now() + timedelta(days=12)).strftime("%b %d, %I:%M %p"), "countdown": "12 days 6 hrs"},
    ]

    return {
        "risk_trend": risk_trend,
        "activity_heatmap": heatmap,
        "model_performance": model_performance,
        "upcoming_exams": upcoming_exams,
    }


# ─────────────────────────────────────────────────────────
# Audit Log
# ─────────────────────────────────────────────────────────

def generate_audit_log() -> list[dict[str, Any]]:
    """Generate audit trail entries."""
    now = datetime.now()

    entries = [
        {
            "id": "AUD-001",
            "timestamp": (now - timedelta(minutes=14)).isoformat(),
            "actor": "System",
            "actor_type": "system",
            "action_type": "alert_generated",
            "description": "Critical alert ALT-001 generated for Physics_Paper_Final_v3.pdf — Risk score 90/100",
            "related_alert_id": "ALT-001",
            "severity": "critical",
        },
        {
            "id": "AUD-002",
            "timestamp": (now - timedelta(minutes=12)).isoformat(),
            "actor": "System",
            "actor_type": "system",
            "action_type": "alert_generated",
            "description": "Push notification sent to 3 investigators for ALT-001",
            "related_alert_id": "ALT-001",
            "severity": "critical",
        },
        {
            "id": "AUD-003",
            "timestamp": (now - timedelta(minutes=10)).isoformat(),
            "actor": "Investigator_A",
            "actor_type": "investigator",
            "action_type": "reviewed",
            "description": "Investigator_A opened and reviewed alert ALT-001",
            "related_alert_id": "ALT-001",
            "severity": "critical",
        },
        {
            "id": "AUD-004",
            "timestamp": (now - timedelta(minutes=8)).isoformat(),
            "actor": "Investigator_A",
            "actor_type": "investigator",
            "action_type": "reviewed",
            "description": "Investigator_A approved actions for ALT-001 (1st approval)",
            "related_alert_id": "ALT-001",
            "severity": "critical",
        },
        {
            "id": "AUD-005",
            "timestamp": (now - timedelta(minutes=5)).isoformat(),
            "actor": "System",
            "actor_type": "system",
            "action_type": "alert_generated",
            "description": "Identity of Employee_4521 revealed to Investigator_A — threshold crossed",
            "related_alert_id": "ALT-001",
            "severity": "high",
        },
        {
            "id": "AUD-006",
            "timestamp": (now - timedelta(hours=1, minutes=23)).isoformat(),
            "actor": "System",
            "actor_type": "system",
            "action_type": "alert_generated",
            "description": "High alert ALT-002 generated for Chemistry_Paper_v2.pdf — Risk score 62/100",
            "related_alert_id": "ALT-002",
            "severity": "high",
        },
        {
            "id": "AUD-007",
            "timestamp": (now - timedelta(hours=2)).isoformat(),
            "actor": "System",
            "actor_type": "system",
            "action_type": "alert_generated",
            "description": "Model v2.4 automatic retraining completed — all metrics within threshold",
            "related_alert_id": None,
            "severity": "low",
        },
        {
            "id": "AUD-008",
            "timestamp": (now - timedelta(hours=4)).isoformat(),
            "actor": "Admin_001",
            "actor_type": "admin",
            "action_type": "login",
            "description": "Admin_001 logged in from authorized device",
            "related_alert_id": None,
            "severity": "low",
        },
        {
            "id": "AUD-009",
            "timestamp": (now - timedelta(hours=6)).isoformat(),
            "actor": "System",
            "actor_type": "system",
            "action_type": "alert_generated",
            "description": "Daily integrity verification completed — 14,847 events verified, 0 tampering detected",
            "related_alert_id": None,
            "severity": "low",
        },
        {
            "id": "AUD-010",
            "timestamp": (now - timedelta(hours=8)).isoformat(),
            "actor": "Investigator_B",
            "actor_type": "investigator",
            "action_type": "dismissed",
            "description": "Alert ALT-004 dismissed as benign — new device login was authorized laptop replacement",
            "related_alert_id": "ALT-004",
            "severity": "low",
        },
    ]

    # Add signature hashes
    for entry in entries:
        entry["signature_hash"] = _hash(f"{entry['id']}{entry['timestamp']}{entry['description']}")
        entry["is_verified"] = True

    return entries


# ─────────────────────────────────────────────────────────
# Sensor Readings
# ─────────────────────────────────────────────────────────

def generate_sensor_readings(box_id: str = "BOX-7789") -> dict[str, Any]:
    """Generate live sensor readings for a custody box."""
    return {
        "box_id": box_id,
        "gps_lat": 26.7200,
        "gps_lng": 75.6500,
        "seal_status": "BROKEN" if box_id == "BOX-7789" else "SEALED",
        "temperature": round(22.5 + random.random() * 2, 1),
        "accelerometer_min": round(-12.0 + random.random() * 2, 2),
        "accelerometer_max": round(-1.5 + random.random() * 0.5, 2),
        "battery_pct": random.randint(65, 95),
        "signal_strength": random.randint(70, 100),
        "timestamp": datetime.now().isoformat(),
    }


# ─────────────────────────────────────────────────────────
# Dashboard Stats
# ─────────────────────────────────────────────────────────

def generate_dashboard_stats() -> dict[str, Any]:
    """Generate dashboard overview statistics."""
    return {
        "total_assets": 1247,
        "active_alerts": 12,
        "avg_detection_time_min": 4.2,
        "false_positive_rate": 3.2,
        "exam_countdown_days": 3,
        "exam_name": "State Board Physics",
        "monitoring_status": "active",
    }
