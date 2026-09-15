from app.schemas.risk import RiskInput, RiskOutput


def calculate_risk(data: RiskInput) -> RiskOutput:
    score = 0
    reasons = []

    # 1. Depth risk
    if data.depth > data.planned_depth:
        score += 20
        reasons.append("Diver is below the planned depth")

    # 2. Dive duration risk
    if data.dive_time > data.planned_dive_time:
        score += 20
        reasons.append("Dive duration has exceeded the planned duration")

    # 3. Heart rate risk
    if data.heart_rate > 100:
        score += 15
        reasons.append("Heart rate is elevated")

    # 4. Ascent rate risk
    if data.ascent_rate > 9:
        score += 20
        reasons.append("Ascent rate is high")

    # 5. Decompression risk
    if data.decompression_status.upper() == "WARNING":
        score += 20
        reasons.append("Decompression warning detected")

    # 6. Gas risk
    if data.gas_remaining < 30:
        score += 15
        reasons.append("Gas remaining is low")

    # Make sure score never exceeds 100
    score = min(score, 100)

    # Determine risk level
    if score >= 80:
        risk_level = "CRITICAL"
    elif score >= 60:
        risk_level = "HIGH"
    elif score >= 30:
        risk_level = "MEDIUM"
    else:
        risk_level = "LOW"

    # If no risk factors were detected
    if not reasons:
        reasons.append("No significant risk factors detected")

    return RiskOutput(
        diver_id=data.diver_id,
        risk_score=score,
        risk_level=risk_level,
        reasons=reasons
    )