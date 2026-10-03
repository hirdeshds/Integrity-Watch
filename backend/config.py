"""
PrahariAI — Configuration
"""

# Risk score thresholds
RISK_THRESHOLDS = {
    "critical": 80,
    "high": 60,
    "medium": 40,
    "low": 0,
}

# Anomaly detection weights
WEIGHTS = {
    "offline_anomaly": 0.27,
    "online_anomaly": 0.30,
    "cross_channel": 0.25,
    "temporal_proximity": 0.10,
    "baseline": 0.08,
}

# API settings
API_TITLE = "PrahariAI API"
API_VERSION = "1.0.0"
API_DESCRIPTION = "AI-Powered Sentinel for Pre-Exam Paper Leak Detection"

# Exam countdown (days)
DEFAULT_EXAM_COUNTDOWN_DAYS = 3
