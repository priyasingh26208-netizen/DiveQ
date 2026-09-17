from typing import Dict


def generate_dive_report(
    diver_id: str,
    risk_analysis: Dict,
    ml_prediction: Dict,
    early_warning: Dict,
    mission_outcome: Dict,
    decision_support: Dict,
    supervisor_assistant: Dict,
    explainable_alerts: Dict
) -> Dict:

    report = {
        "report_title": "DiveQ AI Dive Report",

        "diver": {
            "diver_id": diver_id
        },

        "risk_summary": {
            "risk_score": risk_analysis.get("score"),
            "risk_level": risk_analysis.get("level"),
            "risk_reasons": risk_analysis.get("reasons", [])
        },

        "ml_assessment": {
            "predicted_risk": ml_prediction.get("risk_level"),
            "confidence": ml_prediction.get("confidence"),
            "probabilities": ml_prediction.get("probabilities", {})
        },

        "early_warning": {
            "warning": early_warning.get("warning"),
            "severity": early_warning.get("severity"),
            "trend": early_warning.get("trend"),
            "signals": early_warning.get("signals", [])
        },

        "mission_outcome": {
            "outcome": mission_outcome.get("outcome"),
            "confidence": mission_outcome.get("confidence"),
            "risk_points": mission_outcome.get("risk_points"),
            "risk_factors": mission_outcome.get(
                "risk_factors", []
            )
        },

        "decision_support": {
            "recommendation": decision_support.get(
                "recommendation"
            ),
            "priority": decision_support.get(
                "priority"
            ),
            "explanation": decision_support.get(
                "explanation"
            )
        },

        "supervisor_assistant": {
            "priority": supervisor_assistant.get(
                "priority"
            ),
            "message": supervisor_assistant.get(
                "message"
            ),
            "suggested_actions": supervisor_assistant.get(
                "suggested_actions", []
            )
        },

        "explainable_alerts": {
            "alert_status": explainable_alerts.get(
                "alert_status"
            ),
            "severity": explainable_alerts.get(
                "severity"
            ),
            "alerts": explainable_alerts.get(
                "alerts", []
            )
        }
    }

    return report