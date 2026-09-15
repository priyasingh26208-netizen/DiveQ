from typing import List, Dict
from app.schemas.telemetry import TelemetryPoint


def analyze_telemetry_trend(
    telemetry_history: List[TelemetryPoint]
) -> Dict:

    if len(telemetry_history) < 2:
        return {
            "warning": False,
            "trend": "INSUFFICIENT_DATA",
            "message": "Not enough telemetry data."
        }

    previous = telemetry_history[-2]
    current = telemetry_history[-1]

    signals = []

    # Heart rate trend
    if current.heart_rate > previous.heart_rate + 5:
        signals.append("Heart rate is increasing")

    # Depth trend
    if current.depth > previous.depth + 2:
        signals.append("Diver is moving deeper")

    # Dive duration
    if current.dive_time > previous.dive_time:
        signals.append("Dive duration is increasing")

    # Gas
    if current.gas_remaining < 30:
        signals.append("Gas remaining is low")

    # Decompression
    if current.decompression_status.upper() == "WARNING":
        signals.append("Decompression warning detected")

    # Ascent rate
    if current.ascent_rate > 9:
        signals.append("Ascent rate is high")

    if len(signals) >= 3:
        warning = True
        severity = "HIGH"
        trend = "RAPIDLY_INCREASING"

    elif len(signals) >= 1:
        warning = True
        severity = "MEDIUM"
        trend = "INCREASING"

    else:
        warning = False
        severity = "LOW"
        trend = "STABLE"

    return {
        "warning": warning,
        "severity": severity,
        "trend": trend,
        "signals": signals,
        "message": (
            "Multiple risk indicators detected."
            if warning
            else "No significant early warning indicators detected."
        )
    }