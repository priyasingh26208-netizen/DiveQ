from typing import Dict, List

from app.schemas.telemetry import TelemetryPoint


def analyze_diver_performance(
    telemetry_history: List[TelemetryPoint]
) -> Dict:

    if not telemetry_history:
        return {
            "status": "NO_DATA",
            "message": "No telemetry data available.",
            "metrics": {},
            "events": {}
        }

    heart_rates = [
        point.heart_rate
        for point in telemetry_history
    ]

    depths = [
        point.depth
        for point in telemetry_history
    ]

    gas_values = [
        point.gas_remaining
        for point in telemetry_history
    ]

    ascent_rates = [
        point.ascent_rate
        for point in telemetry_history
    ]

    decompression_warnings = sum(
        point.decompression_status.upper() == "WARNING"
        for point in telemetry_history
    )

    high_ascent_events = sum(
        point.ascent_rate > 9
        for point in telemetry_history
    )

    return {
        "status": "ANALYZED",

        "metrics": {
            "average_heart_rate": round(
                sum(heart_rates) / len(heart_rates), 2
            ),

            "maximum_heart_rate": max(
                heart_rates
            ),

            "average_depth": round(
                sum(depths) / len(depths), 2
            ),

            "maximum_depth": max(
                depths
            ),

            "starting_gas": gas_values[0],

            "ending_gas": gas_values[-1],

            "gas_consumed": round(
                gas_values[0] - gas_values[-1], 2
            ),

            "maximum_ascent_rate": max(
                ascent_rates
            )
        },

        "events": {
            "high_ascent_events": high_ascent_events,
            "decompression_warnings": decompression_warnings
        }
    }