"""
PrahariAI — Anomaly Detection Service
Uses Isolation Forest for unsupervised anomaly scoring
on user behavior features.
"""

import numpy as np
from sklearn.ensemble import IsolationForest


class AnomalyDetector:
    """
    Wraps scikit-learn Isolation Forest to score user behavior.
    Trained on synthetic baseline data; scores new observations
    on a 0-100 risk scale.
    """

    def __init__(self, contamination: float = 0.05, random_state: int = 42):
        self.model = IsolationForest(
            n_estimators=100,
            contamination=contamination,
            random_state=random_state,
        )
        self._is_trained = False

    def train_on_baseline(self, n_samples: int = 500) -> None:
        """
        Generate synthetic 'normal' behavior and train the model.
        Features: [login_hour_deviation, subject_match, download_count,
                   screenshot_flag, access_frequency, device_trust]
        """
        rng = np.random.RandomState(42)

        # Normal behavior baseline
        X_normal = np.column_stack([
            rng.normal(0.5, 0.3, n_samples),   # login_hour_deviation (low = normal)
            rng.uniform(0.8, 1.0, n_samples),   # subject_match (high = correct subject)
            rng.poisson(1.5, n_samples),         # download_count (low is normal)
            rng.binomial(1, 0.02, n_samples),    # screenshot_flag (rare)
            rng.normal(3, 1.5, n_samples),       # access_frequency (moderate)
            rng.uniform(0.7, 1.0, n_samples),    # device_trust (high = known device)
        ])

        self.model.fit(X_normal)
        self._is_trained = True

    def score_behavior(self, features: dict) -> dict:
        """
        Score a single observation.

        Parameters:
            features: dict with keys matching training feature order:
                - login_hour_deviation (0=normal, 1=very unusual)
                - subject_match (1=correct, 0=wrong subject)
                - download_count (number of downloads)
                - screenshot_flag (0 or 1)
                - access_frequency (number of accesses)
                - device_trust (1=known, 0=unknown)

        Returns:
            dict with raw_score, normalized_score (0-100), is_anomaly
        """
        if not self._is_trained:
            self.train_on_baseline()

        X = np.array([[
            features.get("login_hour_deviation", 0.5),
            features.get("subject_match", 1.0),
            features.get("download_count", 1),
            features.get("screenshot_flag", 0),
            features.get("access_frequency", 3),
            features.get("device_trust", 1.0),
        ]])

        # Isolation Forest returns negative scores (more negative = more anomalous)
        raw_score = self.model.decision_function(X)[0]
        prediction = self.model.predict(X)[0]  # 1 = normal, -1 = anomaly

        # Normalize to 0-100 scale (higher = more anomalous)
        # decision_function returns values roughly in [-0.5, 0.5]
        # Map so that -0.5 → 100 and 0.5 → 0
        normalized = max(0, min(100, int((0.5 - raw_score) * 100)))

        return {
            "raw_score": round(float(raw_score), 4),
            "normalized_score": normalized,
            "is_anomaly": prediction == -1,
        }

    def score_operation_physics_paper(self) -> dict:
        """
        Score the specific 'Operation Physics Paper' scenario.
        Employee_4521: Chemistry reviewer accessing Physics paper at night.
        """
        suspicious_features = {
            "login_hour_deviation": 0.95,   # 11:53 PM — very unusual
            "subject_match": 0.0,            # Chemistry reviewer → Physics paper
            "download_count": 3,             # Downloaded (normally view-only)
            "screenshot_flag": 1,            # Screenshot detected
            "access_frequency": 8,           # Many accesses in short window
            "device_trust": 0.4,             # Somewhat unusual device
        }
        return self.score_behavior(suspicious_features)

    def score_negative_test(self) -> dict:
        """
        Score the negative test case: normal behavior that should NOT alert.
        Employee_3892: Physics reviewer viewing Physics paper during work hours.
        """
        normal_features = {
            "login_hour_deviation": 0.1,    # 10:30 PM (slightly late but normal)
            "subject_match": 1.0,            # Physics reviewer → Physics paper
            "download_count": 0,             # View only
            "screenshot_flag": 0,            # No screenshot
            "access_frequency": 2,           # Normal frequency
            "device_trust": 1.0,             # Known device
        }
        return self.score_behavior(normal_features)


# Singleton instance
detector = AnomalyDetector()
detector.train_on_baseline()
