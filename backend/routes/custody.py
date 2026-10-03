"""
PrahariAI — Custody / GPS Routes
"""

from fastapi import APIRouter, HTTPException
from services.data_generator import generate_custody_boxes, generate_sensor_readings

router = APIRouter(prefix="/api/custody", tags=["Custody & GPS"])


@router.get("/boxes")
def get_all_boxes(status: str = "all"):
    """Get all custody boxes with GPS positions and status."""
    boxes = generate_custody_boxes()
    if status != "all":
        boxes = [b for b in boxes if b["status"] == status]
    return {"boxes": boxes, "total": len(boxes)}


@router.get("/boxes/{box_id}")
def get_box_detail(box_id: str):
    """Get detailed information for a specific custody box."""
    boxes = generate_custody_boxes()
    box = next((b for b in boxes if b["id"] == box_id), None)
    if not box:
        raise HTTPException(status_code=404, detail=f"Box {box_id} not found")
    return box


@router.get("/boxes/{box_id}/sensors")
def get_sensor_readings(box_id: str):
    """Get live sensor readings for a custody box."""
    return generate_sensor_readings(box_id)
