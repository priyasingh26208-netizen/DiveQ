from pydantic import BaseModel


class DecisionInput(BaseModel):
    risk_score: float
    risk_level: str

    warning: bool
    severity: str

    signals: list[str]