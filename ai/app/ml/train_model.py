import os

import joblib
import pandas as pd

from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report, accuracy_score


DATA_PATH = "data/dive_training_data.csv"
MODEL_PATH = "models/risk_model.pkl"


def train_model():

    # Load dataset
    df = pd.read_csv(DATA_PATH)

    # Convert decompression status to numeric
    df["decompression_status"] = (
        df["decompression_status"]
        .map({
            "NORMAL": 0,
            "WARNING": 1
        })
    )

    # Features
    features = [
        "depth",
        "planned_depth",
        "dive_time",
        "planned_dive_time",
        "heart_rate",
        "ascent_rate",
        "gas_remaining",
        "decompression_status"
    ]

    X = df[features]
    y = df["risk_level"]

    # Split data
    X_train, X_test, y_train, y_test = train_test_split(
        X,
        y,
        test_size=0.2,
        random_state=42,
        stratify=y
    )

    # Create model
    model = RandomForestClassifier(
        n_estimators=100,
        random_state=42
    )

    # Train
    model.fit(X_train, y_train)

    # Evaluate
    predictions = model.predict(X_test)

    accuracy = accuracy_score(
        y_test,
        predictions
    )

    print("\nModel trained successfully.")
    print(f"Accuracy: {accuracy:.2f}")

    print("\nClassification Report:")
    print(
        classification_report(
            y_test,
            predictions
        )
    )

    # Create models directory
    os.makedirs(
        "models",
        exist_ok=True
    )

    # Save model
    joblib.dump(
        model,
        MODEL_PATH
    )

    print(
        f"\nModel saved to: {MODEL_PATH}"
    )


if __name__ == "__main__":
    train_model()