from pydantic import BaseModel


class SupervisorAssistantInput(BaseModel):
    diver_id: str

    risk_score: float
    risk_level: str

    warning: bool
    severity: str

    signals: list[str]

    recommendation: str