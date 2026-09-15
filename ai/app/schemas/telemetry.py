from pydantic import BaseModel, Field


class TelemetryPoint(BaseModel):
    timestamp: str

    depth: float = Field(..., ge=0)
    dive_time: float = Field(..., ge=0)

    heart_rate: float = Field(..., ge=0)
    ascent_rate: float = Field(..., ge=0)

    gas_remaining: float = Field(..., ge=0, le=100)

    decompression_status: str