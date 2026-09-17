from fastapi import FastAPI
from app.schemas.risk import RiskInput, RiskOutput
from app.services.risk_engine import calculate_risk
from app.services.early_warning import analyze_telemetry_trend
from app.schemas.telemetry import TelemetryPoint
from app.schemas.decision import DecisionInput
from app.services.decision_support import get_decision_support
from app.schemas.decision import DecisionInput
from app.services.decision_support import get_decision_support
from app.services.dive_analysis import analyze_dive
from app.services.mission_outcome import predict_mission_outcome
from app.ml.predict_model import predict_risk as predict_ml_risk
from app.services.ai_analysis import analyze_ai
from app.services.supervisor_assistant import generate_supervisor_response
from app.schemas.supervisor import SupervisorAssistantInput
from app.services.explainable_alerts import generate_explainable_alerts
from app.services.diver_analytics import analyze_diver_performance
from app.services.knowledge_recommendations import generate_recommendations

app = FastAPI(
    title="DiveQ AI Service",
    description="AI-powered risk prediction and decision support for DiveQ",
    version="1.0.0"
)


@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "service": "DiveQ AI"
    }


@app.post("/predict-risk", response_model=RiskOutput)
def predict_risk(data: RiskInput):
    return calculate_risk(data)


@app.post("/early-warning")
def early_warning(telemetry_history: list[TelemetryPoint]):
    return analyze_telemetry_trend(telemetry_history)

@app.post("/decision-support")
def decision_support(data: DecisionInput):

    return get_decision_support(
        risk_score=data.risk_score,
        risk_level=data.risk_level,
        warning=data.warning,
        severity=data.severity,
        signals=data.signals
    )

@app.post("/analyze-dive")
def analyze_dive_endpoint(
    risk_data: RiskInput,
    telemetry_history: list[TelemetryPoint]
):
    return analyze_dive(
        risk_data=risk_data,
        telemetry_history=telemetry_history
    )

@app.post("/mission-outcome")
def mission_outcome(
    telemetry_history: list[TelemetryPoint]
):
    return predict_mission_outcome(
        telemetry_history
    )

@app.post("/ml-predict-risk")
def ml_predict_risk(data: RiskInput):

    result = predict_ml_risk(data)

    return {
        "diver_id": data.diver_id,
        "prediction": result["risk_level"],
        "confidence": result["confidence"],
        "probabilities": result["probabilities"]
    }

@app.post("/ai-analysis")
def ai_analysis(
    risk_data: RiskInput,
    telemetry_history: list[TelemetryPoint]
):

    return analyze_ai(
        risk_data=risk_data,
        telemetry_history=telemetry_history
    )

@app.post("/supervisor-assistant")
def supervisor_assistant(
    data: SupervisorAssistantInput
):

    return generate_supervisor_response(
        diver_id=data.diver_id,
        risk_score=data.risk_score,
        risk_level=data.risk_level,
        warning=data.warning,
        severity=data.severity,
        signals=data.signals,
        recommendation=data.recommendation
    )

@app.post("/explainable-alerts")
def explainable_alerts(
    data: SupervisorAssistantInput
):

    return generate_explainable_alerts(
        diver_id=data.diver_id,
        risk_score=data.risk_score,
        risk_level=data.risk_level,
        warning=data.warning,
        severity=data.severity,
        signals=data.signals,
        recommendation=data.recommendation
    )

@app.post("/diver-performance")
def diver_performance(
    telemetry_history: list[TelemetryPoint]
):

    return analyze_diver_performance(
        telemetry_history
    )

@app.post("/knowledge-recommendations")
def knowledge_recommendations(
    risk_level: str,
    signals: list[str],
    mission_outcome: str
):

    return generate_recommendations(
        risk_level=risk_level,
        signals=signals,
        mission_outcome=mission_outcome
    )