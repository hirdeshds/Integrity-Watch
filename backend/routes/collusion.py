"""
PrahariAI — Collusion Graph Routes
"""

from fastapi import APIRouter
from services.data_generator import generate_collusion_graph

router = APIRouter(prefix="/api/collusion", tags=["Collusion Graph"])


@router.get("/graph")
def get_collusion_graph():
    """Get the full collusion network graph with nodes, edges, patterns, and clusters."""
    return generate_collusion_graph()


@router.get("/patterns")
def get_collusion_patterns():
    """Get detected collusion patterns only."""
    graph = generate_collusion_graph()
    return {"patterns": graph["patterns"], "clusters": graph["clusters"]}
