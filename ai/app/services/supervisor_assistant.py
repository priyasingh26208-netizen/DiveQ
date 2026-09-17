from typing import Dict, List


def generate_supervisor_response(
    diver_id: str,
    risk_level: str,
    risk_score: float,
    warning: bool,
    severity: str,
    signals: List[str],
    recommendation: str
) -> Dict:

    # Critical situation
    if risk_level == "CRITICAL" or severity == "HIGH":

        message = (
            f"Diver {diver_id} requires immediate supervisor attention. "
            "Multiple high-risk indicators are present."
        )

        suggested_actions = [
            "Review current diver condition",
            "Review depth and ascent status",
            "Assess gas remaining",
            "Consider appropriate controlled response",
            "Continue close monitoring"
        ]

        priority = "CRITICAL"

    # High risk
    elif risk_level == "HIGH":

        message = (
            f"Diver {diver_id} is currently at high risk. "
            "The supervisor should increase monitoring."
        )

        suggested_actions = [
            "Increase monitoring frequency",
            "Review current telemetry",
            "Reassess mission conditions",
            "Prepare for escalation if risk increases"
        ]

        priority = "HIGH"

    # Medium risk
    elif risk_level == "MEDIUM" or warning:

        message = (
            f"Diver {diver_id} has detected risk indicators. "
            "Continue the mission with increased monitoring."
        )

        suggested_actions = [
            "Monitor telemetry closely",
            "Review detected warning signals",
            "Reassess the dive plan",
            "Watch for further risk escalation"
        ]

        priority = "MEDIUM"

    # Low risk
    else:

        message = (
            f"Diver {diver_id} is currently showing no significant "
            "risk escalation."
        )

        suggested_actions = [
            "Continue normal monitoring",
            "Continue tracking telemetry"
        ]

        priority = "LOW"

    return {
        "diver_id": diver_id,
        "priority": priority,
        "message": message,
        "risk_score": risk_score,
        "risk_level": risk_level,
        "warning": warning,
        "signals": signals,
        "recommendation": recommendation,
        "suggested_actions": suggested_actions
    }