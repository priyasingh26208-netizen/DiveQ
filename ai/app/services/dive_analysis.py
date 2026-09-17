from typing import Dict, List

from app.schemas.risk import RiskInput
from app.schemas.telemetry import TelemetryPoint
from app.services.risk_engine import calculate_risk
from app.services.early_warning import analyze_telemetry_trend
from app.services.decision_support import get_decision_support


def analyze_dive(
    risk_data: RiskInput,
    telemetry_history: List[TelemetryPoint]
) -> Dict:

    # 1. Calculate current risk
    risk_result = calculate_risk(risk_data)

    # 2. Analyze telemetry trend
    warning_result = analyze_telemetry_trend(
        telemetry_history
    )

    # 3. Generate decision support
    decision_result = get_decision_support(
        risk_score=risk_result.risk_score,
        risk_level=risk_result.risk_level,
        warning=warning_result["warning"],
        severity=warning_result.get("severity", "LOW"),
        signals=warning_result.get("signals", [])
    )

    return {
        "diver_id": risk_result.diver_id,

        "risk": {
            "score": risk_result.risk_score,
            "level": risk_result.risk_level,
            "reasons": risk_result.reasons
        },

        "early_warning": {
            "warning": warning_result["warning"],
            "severity": warning_result.get("severity"),
            "trend": warning_result.get("trend"),
            "signals": warning_result.get("signals", [])
        },

        "decision_support": decision_result
    }