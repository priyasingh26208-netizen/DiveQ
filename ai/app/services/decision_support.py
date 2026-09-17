from typing import Dict


def get_decision_support(
    risk_score: float,
    risk_level: str,
    warning: bool,
    severity: str,
    signals: list[str]
) -> Dict:

    # Critical situation
    if risk_level == "CRITICAL" or severity == "HIGH":

        recommendation = "REVIEW_CONTROLLED_ASCENT"
        priority = "CRITICAL"

        explanation = (
            "Multiple high-risk indicators have been detected. "
            "The dive supervisor should immediately review the diver's condition "
            "and consider the appropriate controlled response."
        )

    # High risk
    elif risk_level == "HIGH":

        recommendation = "INCREASE_MONITORING"
        priority = "HIGH"

        explanation = (
            "The diver has a high risk score. "
            "Increase monitoring and reassess mission conditions."
        )

    # Medium risk
    elif risk_level == "MEDIUM" or warning:

        recommendation = "CONTINUE_WITH_CAUTION"
        priority = "MEDIUM"

        explanation = (
            "Risk indicators are present. "
            "Continue only with increased monitoring and reassessment."
        )

    # Low risk
    else:

        recommendation = "CONTINUE_MONITORING"
        priority = "LOW"

        explanation = (
            "No significant risk indicators currently require escalation. "
            "Continue normal monitoring."
        )

    return {
        "recommendation": recommendation,
        "priority": priority,
        "explanation": explanation,
        "contributing_signals": signals
    }