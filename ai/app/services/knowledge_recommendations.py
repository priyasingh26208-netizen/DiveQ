from typing import Dict, List


def generate_recommendations(
    risk_level: str,
    signals: List[str],
    mission_outcome: str
) -> Dict:

    recommendations = []

    # Heart rate
    if "Heart rate is increasing" in signals:
        recommendations.append({
            "topic": "Physiological Monitoring",
            "recommendation": (
                "Continue close monitoring of the diver's physiological "
                "telemetry and reassess mission conditions."
            ),
            "reason": "Increasing heart rate was detected."
        })

    # Gas
    if "Gas remaining is low" in signals:
        recommendations.append({
            "topic": "Gas Monitoring",
            "recommendation": (
                "Review remaining gas and assess whether the planned "
                "mission can safely continue."
            ),
            "reason": "Gas level is below the configured monitoring threshold."
        })

    # Decompression
    if "Decompression warning detected" in signals:
        recommendations.append({
            "topic": "Decompression",
            "recommendation": (
                "Review the diver's decompression status and applicable "
                "dive procedures."
            ),
            "reason": "A decompression warning was detected."
        })

    # Depth
    if "Diver is moving deeper" in signals:
        recommendations.append({
            "topic": "Depth",
            "recommendation": (
                "Review the current depth against the planned dive profile."
            ),
            "reason": "Depth is increasing."
        })

    # Ascent
    if "Ascent rate is high" in signals:
        recommendations.append({
            "topic": "Ascent Monitoring",
            "recommendation": (
                "Review the current ascent status and applicable ascent "
                "procedures."
            ),
            "reason": "A high ascent rate was detected."
        })

    # Overall mission condition
    if mission_outcome == "INTERVENTION_REQUIRED":
        overall = (
            "Multiple risk indicators require supervisor review "
            "before continuing the mission."
        )

    elif mission_outcome == "LIKELY_HIGH_RISK":
        overall = (
            "Current telemetry indicates elevated mission risk. "
            "Increase monitoring and reassess conditions."
        )

    else:
        overall = (
            "No significant sustained escalation was detected in the "
            "currently monitored indicators."
        )

    return {
        "risk_level": risk_level,
        "mission_outcome": mission_outcome,
        "overall_recommendation": overall,
        "recommendations": recommendations
    }