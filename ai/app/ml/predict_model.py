import joblib
import pandas as pd


MODEL_PATH = "models/risk_model.pkl"


def predict_risk(data):

    model = joblib.load(MODEL_PATH)

    input_data = pd.DataFrame([{
        "depth": data.depth,
        "planned_depth": data.planned_depth,
        "dive_time": data.dive_time,
        "planned_dive_time": data.planned_dive_time,
        "heart_rate": data.heart_rate,
        "ascent_rate": data.ascent_rate,
        "gas_remaining": data.gas_remaining,
        "decompression_status": (
            1 if data.decompression_status.upper() == "WARNING"
            else 0
        )
    }])

    prediction = model.predict(input_data)[0]

    probabilities = model.predict_proba(input_data)[0]

    probability_map = {
        class_name: round(probability * 100, 2)
        for class_name, probability
        in zip(model.classes_, probabilities)
    }

    confidence = max(probabilities) * 100

    return {
        "risk_level": prediction,
        "confidence": round(confidence, 2),
        "probabilities": probability_map
    }