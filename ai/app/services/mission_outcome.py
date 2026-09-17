from typing import List, Dict

from app.schemas.telemetry import TelemetryPoint


def predict_mission_outcome(
    telemetry_history: List[TelemetryPoint]
) -> Dict:

    if len(telemetry_history) < 3:
        return {
            "outcome": "INSUFFICIENT_DATA",
            "confidence": 0,
            "risk_points": 0,
            "risk_factors": [],
            "trend_summary": {},
            "message": "At least 3 telemetry readings are recommended for trend analysis."
        }

    current = telemetry_history[-1]

    risk_points = 0
    risk_factors = []

    # -----------------------------
    # 1. Heart-rate trend
    # -----------------------------

    heart_rates = [
        point.heart_rate
        for point in telemetry_history
    ]

    heart_rate_increases = sum(
        heart_rates[i] > heart_rates[i - 1] + 5
        for i in range(1, len(heart_rates))
    )

    if heart_rate_increases >= 2:
        risk_points += 20
        risk_factors.append(
            "Heart rate has been consistently increasing"
        )

    elif heart_rates[-1] > 100:
        risk_points += 10
        risk_factors.append(
            "Heart rate is elevated"
        )

    # -----------------------------
    # 2. Gas trend
    # -----------------------------

    gas_values = [
        point.gas_remaining
        for point in telemetry_history
    ]

    gas_decreasing = all(
        gas_values[i] <= gas_values[i - 1]
        for i in range(1, len(gas_values))
    )

    if gas_decreasing and gas_values[-1] < 40:
        risk_points += 20
        risk_factors.append(
            "Gas level is consistently decreasing"
        )

    if current.gas_remaining < 30:
        risk_points += 15
        risk_factors.append(
            "Gas remaining is low"
        )

    # -----------------------------
    # 3. Depth trend
    # -----------------------------

    depths = [
        point.depth
        for point in telemetry_history
    ]

    depth_increases = sum(
        depths[i] > depths[i - 1] + 2
        for i in range(1, len(depths))
    )

    if depth_increases >= 2:
        risk_points += 15
        risk_factors.append(
            "Diver has been progressively moving deeper"
        )

    # -----------------------------
    # 4. Decompression warnings
    # -----------------------------

    decompression_warnings = sum(
        point.decompression_status.upper() == "WARNING"
        for point in telemetry_history
    )

    if decompression_warnings >= 2:
        risk_points += 30
        risk_factors.append(
            "Repeated decompression warnings detected"
        )

    elif decompression_warnings == 1:
        risk_points += 15
        risk_factors.append(
            "Decompression warning detected"
        )

    # -----------------------------
    # 5. Ascent-rate trend
    # -----------------------------

    high_ascent_readings = sum(
        point.ascent_rate > 9
        for point in telemetry_history
    )

    if high_ascent_readings >= 2:
        risk_points += 20
        risk_factors.append(
            "Repeated high ascent-rate readings detected"
        )

    elif current.ascent_rate > 9:
        risk_points += 10
        risk_factors.append(
            "Ascent rate is high"
        )

    # Limit score
    risk_points = min(risk_points, 100)

    # -----------------------------
    # 6. Overall trend
    # -----------------------------

    if risk_points >= 70:
        outcome = "INTERVENTION_REQUIRED"
        confidence = min(95, 70 + risk_points // 5)

        message = (
            "Telemetry history shows multiple sustained risk indicators. "
            "The supervisor should review the mission and consider intervention."
        )

    elif risk_points >= 35:
        outcome = "LIKELY_HIGH_RISK"
        confidence = min(90, 60 + risk_points // 4)

        message = (
            "Telemetry history indicates increasing or persistent risk. "
            "Increase monitoring and reassess mission conditions."
        )

    else:
        outcome = "LIKELY_SAFE"
        confidence = min(90, 70 + (35 - risk_points))

        message = (
            "Telemetry history does not show significant sustained "
            "escalation of the monitored risk indicators."
        )

    return {
        "outcome": outcome,
        "confidence": confidence,
        "risk_points": risk_points,
        "risk_factors": risk_factors,

        "trend_summary": {
            "heart_rate_readings": len(heart_rates),
            "heart_rate_increases": heart_rate_increases,
            "gas_decreasing": gas_decreasing,
            "depth_increases": depth_increases,
            "decompression_warnings": decompression_warnings,
            "high_ascent_readings": high_ascent_readings
        },

        "message": message
    }