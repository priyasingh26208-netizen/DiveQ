from typing import Dict, List


def generate_explainable_alerts(
    diver_id: str,
    risk_score: float,
    risk_level: str,
    warning: bool,
    severity: str,
    signals: List[str],
    recommendation: str
) -> Dict:

    alerts = []

    for signal in signals:

        if signal == "Heart rate is increasing":
            alerts.append({
                "type": "PHYSIOLOGICAL",
                "signal": signal,
                "severity": severity,
                "explanation": (
                    "The diver's heart rate is increasing compared "
                    "with the previous telemetry reading."
                )
            })

        elif signal == "Gas remaining is low":
            alerts.append({
                "type": "GAS",
                "signal": signal,
                "severity": severity,
                "explanation": (
                    "Remaining gas has reached a low level and "
                    "should be monitored closely."
                )
            })

        elif signal == "Decompression warning detected":
            alerts.append({
                "type": "DECOMPRESSION",
                "signal": signal,
                "severity": "HIGH",
                "explanation": (
                    "The telemetry indicates a decompression warning."
                )
            })

        elif signal == "Diver is moving deeper":
            alerts.append({
                "type": "DEPTH",
                "signal": signal,
                "severity": severity,
                "explanation": (
                    "The diver is moving deeper than the previous "
                    "telemetry reading."
                )
            })

        elif signal == "Ascent rate is high":
            alerts.append({
                "type": "ASCENT",
                "signal": signal,
                "severity": "HIGH",
                "explanation": (
                    "The detected ascent rate is above the configured "
                    "prototype monitoring threshold."
                )
            })

        else:
            alerts.append({
                "type": "GENERAL",
                "signal": signal,
                "severity": severity,
                "explanation": (
                    "This telemetry signal contributed to the "
                    "current risk assessment."
                )
            })

    if not alerts:
        alerts.append({
            "type": "STATUS",
            "signal": "No significant risk indicators",
            "severity": "LOW",
            "explanation": (
                "No significant monitored risk indicators "
                "were detected."
            )
        })

    return {
        "diver_id": diver_id,
        "overall_risk": {
            "score": risk_score,
            "level": risk_level
        },
        "alert_status": warning,
        "severity": severity,
        "alerts": alerts,
        "recommendation": recommendation
    }