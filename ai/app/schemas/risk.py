from pydantic import BaseModel, Field


class RiskInput(BaseModel):
    diver_id: str

    depth: float = Field(..., ge=0)
    planned_depth: float = Field(..., ge=0)

    dive_time: float = Field(..., ge=0)
    planned_dive_time: float = Field(..., ge=0)

    heart_rate: float = Field(..., ge=0)

    ascent_rate: float = Field(..., ge=0)

    decompression_status: str

    gas_remaining: float = Field(..., ge=0, le=100)

class RiskOutput(BaseModel):
    diver_id: str
    risk_score: float
    risk_level: str
    reasons: list[str]