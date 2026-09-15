from fastapi import FastAPI
from app.schemas.risk import RiskInput, RiskOutput
from app.services.risk_engine import calculate_risk
from app.services.early_warning import analyze_telemetry_trend
from app.schemas.telemetry import TelemetryPoint

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