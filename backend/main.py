"""
PrahariAI — Main FastAPI Application
AI-Powered Sentinel for Pre-Exam Paper Leak Detection

Run with: uvicorn main:app --reload --port 8000
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from config import API_TITLE, API_VERSION, API_DESCRIPTION
from routes import dashboard, alerts, custody, collusion, analytics, audit
from services.anomaly_detector import detector
from services.correlation_engine import correlation_engine


# ─── Application Setup ──────────────────────────────────

app = FastAPI(
    title=API_TITLE,
    version=API_VERSION,
    description=API_DESCRIPTION,
    docs_url="/docs",
    redoc_url="/redoc",
)

# CORS — allow all origins for development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ─── Register Route Modules ────────────────────────────

app.include_router(dashboard.router)
app.include_router(alerts.router)
app.include_router(custody.router)
app.include_router(collusion.router)
app.include_router(analytics.router)
app.include_router(audit.router)


# ─── Root & Health Endpoints ────────────────────────────

@app.get("/", tags=["Health"])
def root():
    """API root — returns service info."""
    return {
        "service": "PrahariAI",
        "version": API_VERSION,
        "status": "operational",
        "tagline": "Not just detecting leaks — buying authorities the time to stop them.",
        "docs": "/docs",
    }


@app.get("/api/health", tags=["Health"])
def health_check():
    """Health check endpoint."""
    return {
        "status": "healthy",
        "anomaly_model_trained": detector._is_trained,
        "api_version": API_VERSION,
    }


# ─── AI / ML Endpoints ─────────────────────────────────

@app.get("/api/ml/score-demo", tags=["AI / ML"])
def score_demo_scenario():
    """
    Run the 'Operation Physics Paper' anomaly detection demo.
    Returns scores for both the suspicious and normal test cases.
    """
    suspicious = detector.score_operation_physics_paper()
    normal = detector.score_negative_test()

    return {
        "scenario": "Operation Physics Paper",
        "suspicious_case": {
            "employee": "Employee_4521",
            "role": "Chemistry Reviewer",
            "action": "Accessed Physics paper at 11:53 PM after box breach",
            "score": suspicious,
        },
        "negative_test_case": {
            "employee": "Employee_3892",
            "role": "Physics Reviewer",
            "action": "Viewed Physics paper during work hours (assigned subject)",
            "score": normal,
        },
        "conclusion": (
            "The suspicious case scores significantly higher, demonstrating "
            "the model's ability to distinguish anomalous from normal behavior."
        ),
    }


@app.get("/api/ml/score-custom", tags=["AI / ML"])
def score_custom(
    login_hour_deviation: float = 0.5,
    subject_match: float = 1.0,
    download_count: int = 1,
    screenshot_flag: int = 0,
    access_frequency: int = 3,
    device_trust: float = 1.0,
):
    """
    Score custom user behavior features through the anomaly detection model.

    Parameters:
    - login_hour_deviation: 0 (normal hours) to 1 (very unusual hours)
    - subject_match: 1 (correct subject) to 0 (wrong subject)
    - download_count: number of downloads (0 = view only)
    - screenshot_flag: 0 (no screenshot) or 1 (screenshot detected)
    - access_frequency: number of accesses in session
    - device_trust: 1 (known device) to 0 (unknown device)
    """
    features = {
        "login_hour_deviation": login_hour_deviation,
        "subject_match": subject_match,
        "download_count": download_count,
        "screenshot_flag": screenshot_flag,
        "access_frequency": access_frequency,
        "device_trust": device_trust,
    }
    result = detector.score_behavior(features)
    result["features"] = features
    return result


@app.get("/api/ml/correlation-demo", tags=["AI / ML"])
def correlation_demo():
    """
    Run the cross-channel correlation demo for Operation Physics Paper.
    Shows how offline and online events are linked.
    """
    return correlation_engine.run_operation_physics_paper()


# ─── Startup Event ──────────────────────────────────────

@app.on_event("startup")
def startup():
    """Initialize services on startup."""
    print("=" * 60)
    print("  🛡️  PrahariAI API — Starting up")
    print("  AI-Powered Sentinel for Pre-Exam Paper Leak Detection")
    print("=" * 60)
    print(f"  ✅ Anomaly model trained: {detector._is_trained}")
    print(f"  ✅ API version: {API_VERSION}")
    print(f"  📖 Swagger docs: http://localhost:8000/docs")
    print(f"  📖 ReDoc: http://localhost:8000/redoc")
    print("=" * 60)
