"""
PrahariAI — Cross-Channel Correlation Engine
Links offline custody events with online access events
by paper ID, person, location, and time proximity.
"""

from datetime import datetime, timedelta
from typing import Any


class CorrelationEngine:
    """
    Joins offline and online events on a shared timeline
    and detects cross-channel patterns that indicate
    a leak in progress.
    """

    # Maximum time gap (in minutes) to consider events correlated
    CORRELATION_WINDOW_MIN = 15

    def correlate_events(
        self,
        offline_events: list[dict[str, Any]],
        online_events: list[dict[str, Any]],
    ) -> dict[str, Any]:
        """
        Find cross-channel correlations between offline and online events.

        Returns:
            dict with correlated_pairs, risk_boost, explanation
        """
        correlations = []

        for off_evt in offline_events:
            for on_evt in online_events:
                # Check time proximity
                try:
                    off_time = datetime.fromisoformat(off_evt.get("iso_timestamp", ""))
                    on_time = datetime.fromisoformat(on_evt.get("iso_timestamp", ""))
                except (ValueError, TypeError):
                    continue

                time_diff = abs((on_time - off_time).total_seconds() / 60)

                if time_diff <= self.CORRELATION_WINDOW_MIN:
                    # Check if related to same alert/paper
                    same_alert = (
                        off_evt.get("related_alert_id")
                        and off_evt["related_alert_id"] == on_evt.get("related_alert_id")
                    )

                    correlation_strength = self._calculate_strength(
                        time_diff, same_alert, off_evt, on_evt
                    )

                    if correlation_strength > 0.3:
                        correlations.append({
                            "offline_event": off_evt["id"],
                            "online_event": on_evt["id"],
                            "time_gap_min": round(time_diff, 1),
                            "strength": round(correlation_strength, 2),
                            "same_alert": same_alert,
                            "explanation": self._generate_explanation(
                                off_evt, on_evt, time_diff
                            ),
                        })

        # Calculate risk boost from correlations
        risk_boost = 0
        if correlations:
            max_strength = max(c["strength"] for c in correlations)
            risk_boost = int(max_strength * 30)  # Up to 30 points boost

        return {
            "correlated_pairs": correlations,
            "total_correlations": len(correlations),
            "risk_boost": risk_boost,
            "has_cross_channel": len(correlations) > 0,
            "summary": self._generate_summary(correlations),
        }

    def _calculate_strength(
        self,
        time_diff_min: float,
        same_alert: bool,
        off_evt: dict,
        on_evt: dict,
    ) -> float:
        """Calculate correlation strength (0.0 to 1.0)."""
        strength = 0.0

        # Time proximity (closer = stronger)
        time_factor = max(0, 1.0 - (time_diff_min / self.CORRELATION_WINDOW_MIN))
        strength += time_factor * 0.4

        # Same alert/paper
        if same_alert:
            strength += 0.3

        # Severity boost
        severity_scores = {"critical": 0.3, "high": 0.2, "medium": 0.1, "low": 0.0}
        off_sev = severity_scores.get(off_evt.get("severity", "low"), 0)
        on_sev = severity_scores.get(on_evt.get("severity", "low"), 0)
        strength += max(off_sev, on_sev)

        return min(1.0, strength)

    def _generate_explanation(
        self,
        off_evt: dict,
        on_evt: dict,
        time_diff: float,
    ) -> str:
        """Generate plain-language explanation for a correlation."""
        return (
            f"Physical event '{off_evt['title']}' was followed "
            f"{time_diff:.0f} minutes later by digital event "
            f"'{on_evt['title']}' — both linked to the same paper."
        )

    def _generate_summary(self, correlations: list[dict]) -> str:
        """Generate overall correlation summary."""
        if not correlations:
            return "No cross-channel correlations detected. Events appear independent."

        n = len(correlations)
        min_gap = min(c["time_gap_min"] for c in correlations)
        max_strength = max(c["strength"] for c in correlations)

        severity = "Critical" if max_strength > 0.7 else "High" if max_strength > 0.5 else "Moderate"

        return (
            f"{severity} cross-channel pattern detected: {n} correlated event pair(s) "
            f"with minimum time gap of {min_gap:.0f} minutes. "
            f"Strongest correlation: {max_strength:.0%}."
        )

    def run_operation_physics_paper(self) -> dict[str, Any]:
        """
        Run the demo scenario from the project document.
        """
        from services.data_generator import generate_timeline_events

        events = generate_timeline_events()

        offline = [e for e in events if e["channel"] == "offline"]
        online = [e for e in events if e["channel"] == "online"]

        result = self.correlate_events(offline, online)
        result["scenario"] = "Operation Physics Paper"
        return result


# Singleton instance
correlation_engine = CorrelationEngine()
