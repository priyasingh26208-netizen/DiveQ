from typing import List, Dict

from app.schemas.risk import RiskInput
from app.schemas.telemetry import TelemetryPoint

from app.services.risk_engine import calculate_risk
from app.services.early_warning import analyze_telemetry_trend
from app.services.decision_support import get_decision_support
from app.services.mission_outcome import predict_mission_outcome

from app.ml.predict_model import predict_risk as predict_ml_risk
from app.services.supervisor_assistant import generate_supervisor_response
from app.services.explainable_alerts import generate_explainable_alerts
from app.services.dive_report import generate_dive_report
from app.services.knowledge_recommendations import generate_recommendations


def analyze_ai(
    risk_data: RiskInput,
    telemetry_history: List[TelemetryPoint]
) -> Dict:

    # 1. Rule-based risk
    rule_risk = calculate_risk(risk_data)

    # 2. Early warning
    early_warning = analyze_telemetry_trend(
        telemetry_history
    )

    # 3. ML prediction
    ml_prediction = predict_ml_risk(
        risk_data
    )

    # 4. Mission outcome
    mission_outcome = predict_mission_outcome(
        telemetry_history
    )

    # 5. Decision support
    decision = get_decision_support(
        risk_score=rule_risk.risk_score,
        risk_level=rule_risk.risk_level,
        warning=early_warning["warning"],
        severity=early_warning.get("severity", "LOW"),
        signals=early_warning.get("signals", [])
    )    

    # 6. Supervisor Assistant
    supervisor_response = generate_supervisor_response(
        diver_id=risk_data.diver_id,
        risk_score=rule_risk.risk_score,
        risk_level=rule_risk.risk_level,
        warning=early_warning["warning"],
        severity=early_warning.get("severity", "LOW"),
        signals=early_warning.get("signals", []),
        recommendation=decision["recommendation"]
    )

    # 7. Explainable AI Alerts
    explainable_alerts = generate_explainable_alerts(
        diver_id=risk_data.diver_id,
        risk_score=rule_risk.risk_score,
        risk_level=rule_risk.risk_level,
        warning=early_warning["warning"],
        severity=early_warning.get("severity", "LOW"),
        signals=early_warning.get("signals", []),
        recommendation=decision["recommendation"]
    )

    # 8. AI Dive Report
    dive_report = generate_dive_report(
        diver_id=risk_data.diver_id,
        risk_analysis={
            "score": rule_risk.risk_score,
            "level": rule_risk.risk_level,
            "reasons": rule_risk.reasons
        },
        ml_prediction=ml_prediction,
        early_warning=early_warning,
        mission_outcome=mission_outcome,
        decision_support=decision,
        supervisor_assistant=supervisor_response,
        explainable_alerts=explainable_alerts
    )

    # 8. Knowledge-Based Recommendations
    knowledge_recommendations = generate_recommendations(
        risk_level=rule_risk.risk_level,
        signals=early_warning.get("signals", []),
        mission_outcome=mission_outcome.get("outcome", "INSUFFICIENT_DATA")
    )

    return {
        "diver_id": risk_data.diver_id,

        "risk_analysis": {
            "score": rule_risk.risk_score,
            "level": rule_risk.risk_level,
            "reasons": rule_risk.reasons
        },

        "ml_prediction": {
            "risk_level": ml_prediction["risk_level"],
            "confidence": ml_prediction["confidence"],
            "probabilities": ml_prediction["probabilities"]
        },

        "early_warning": {
            "warning": early_warning["warning"],
            "severity": early_warning.get("severity"),
            "trend": early_warning.get("trend"),
            "signals": early_warning.get("signals", [])
        },

        "mission_outcome": mission_outcome,

        "decision_support": decision,

        "supervisor_assistant": supervisor_response,

        "explainable_alerts": explainable_alerts,

        "dive_report": dive_report,

        "knowledge_recommendations": knowledge_recommendations,
    }