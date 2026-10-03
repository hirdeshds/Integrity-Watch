"""
PrahariAI — Pydantic Schemas
All request/response models for the API.
"""

from pydantic import BaseModel
from typing import Optional
from datetime import datetime


# ─── Dashboard ───────────────────────────────────────────

class DashboardStats(BaseModel):
    total_assets: int
    active_alerts: int
    avg_detection_time_min: float
    false_positive_rate: float
    exam_countdown_days: int
    exam_name: str
    monitoring_status: str


class TimelineEvent(BaseModel):
    id: str
    timestamp: str
    title: str
    subtitle: str
    channel: str  # "offline" | "online" | "cross_channel"
    source: str
    severity: str  # "critical" | "high" | "medium" | "low"
    related_alert_id: Optional[str] = None


# ─── Alerts ──────────────────────────────────────────────

class AlertSummary(BaseModel):
    id: str
    title: str
    description: str
    paper_name: str
    risk_score: int
    severity: str
    timestamp: str
    time_ago: str
    is_new: bool
    exam_countdown_days: int


class ScoreBreakdown(BaseModel):
    component: str
    points: int
    color: str
    reason: str


class RecommendedAction(BaseModel):
    id: str
    label: str
    description: str
    priority: str  # "critical" | "high" | "medium"
    is_checked: bool = False


class AlertDetail(BaseModel):
    id: str
    title: str
    paper_name: str
    risk_score: int
    severity: str
    timestamp: str
    exam_countdown_days: int
    ai_explanation: str
    timeline_events: list[TimelineEvent]
    score_breakdown: list[ScoreBreakdown]
    recommended_actions: list[RecommendedAction]
    dual_approval: dict


# ─── Custody / GPS ───────────────────────────────────────

class CustodyBox(BaseModel):
    id: str
    label: str
    status: str  # "sealed" | "en_route" | "tamper_detected" | "delivered" | "delayed"
    lat: float
    lng: float
    seal_state: str
    temperature: float
    last_update: str
    planned_route: list[dict]
    actual_route: list[dict]
    deviation_point: Optional[dict] = None
    employee_nearby: Optional[str] = None
    open_duration_min: Optional[int] = None


class SensorReading(BaseModel):
    box_id: str
    gps_lat: float
    gps_lng: float
    seal_status: str
    temperature: float
    accelerometer_min: float
    accelerometer_max: float
    battery_pct: int
    signal_strength: int
    timestamp: str


# ─── Collusion Graph ────────────────────────────────────

class GraphNode(BaseModel):
    id: str
    label: str
    type: str  # "employee" | "document" | "location"
    risk_score: int
    is_suspicious: bool
    department: Optional[str] = None


class GraphEdge(BaseModel):
    source: str
    target: str
    weight: float
    is_suspicious: bool
    label: str


class CollusionPattern(BaseModel):
    id: str
    description: str
    confidence: str  # "high" | "medium" | "low"
    related_nodes: list[str]


class CollusionGraph(BaseModel):
    nodes: list[GraphNode]
    edges: list[GraphEdge]
    patterns: list[CollusionPattern]
    clusters: list[dict]


# ─── Analytics ───────────────────────────────────────────

class RiskTrendPoint(BaseModel):
    hour: str
    score: float
    has_alert: bool


class ActivityHeatmapCell(BaseModel):
    day: str
    hour: int
    count: int
    is_anomalous: bool


class ModelPerformance(BaseModel):
    recall: float
    precision: float
    f1_score: float
    confusion_matrix: dict
    last_retrained: str
    model_version: str


class UpcomingExam(BaseModel):
    id: str
    name: str
    date: str
    countdown: str


class AnalyticsData(BaseModel):
    risk_trend: list[RiskTrendPoint]
    activity_heatmap: list[ActivityHeatmapCell]
    model_performance: ModelPerformance
    upcoming_exams: list[UpcomingExam]


# ─── Audit Log ───────────────────────────────────────────

class AuditEntry(BaseModel):
    id: str
    timestamp: str
    actor: str
    actor_type: str  # "system" | "investigator" | "admin"
    action_type: str  # "alert_generated" | "reviewed" | "action_taken" | "escalated" | "dismissed" | "login"
    description: str
    related_alert_id: Optional[str] = None
    severity: Optional[str] = None
    signature_hash: str
    is_verified: bool


class AuditSummary(BaseModel):
    total_events: int
    integrity_verified_pct: float
    automated_actions: int
    identity_reveals: int


# ─── Investigator Actions ───────────────────────────────

class ActionRequest(BaseModel):
    alert_id: str
    action_type: str  # "revoke_access" | "activate_backup" | "flag_review" | "dismiss"
    reviewer_id: str
    notes: Optional[str] = None


class ActionResponse(BaseModel):
    success: bool
    message: str
    requires_second_approval: bool
    audit_entry_id: str
