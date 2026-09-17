import random
import pandas as pd


def generate_dataset(samples=1000):

    data = []

    for _ in range(samples):

        depth = random.uniform(5, 60)
        planned_depth = random.uniform(10, 50)

        dive_time = random.uniform(10, 120)
        planned_dive_time = random.uniform(20, 100)

        heart_rate = random.uniform(60, 130)

        ascent_rate = random.uniform(0, 15)

        gas_remaining = random.uniform(10, 100)

        decompression_status = random.choice(
            ["NORMAL", "NORMAL", "NORMAL", "WARNING"]
        )

        # Generate prototype training label
        risk_score = 0

        if depth > planned_depth:
            risk_score += 20

        if dive_time > planned_dive_time:
            risk_score += 20

        if heart_rate > 100:
            risk_score += 15

        if ascent_rate > 9:
            risk_score += 20

        if decompression_status == "WARNING":
            risk_score += 20

        if gas_remaining < 30:
            risk_score += 15

        if risk_score >= 80:
            risk_level = "CRITICAL"

        elif risk_score >= 60:
            risk_level = "HIGH"

        elif risk_score >= 30:
            risk_level = "MEDIUM"

        else:
            risk_level = "LOW"

        data.append({
            "depth": depth,
            "planned_depth": planned_depth,
            "dive_time": dive_time,
            "planned_dive_time": planned_dive_time,
            "heart_rate": heart_rate,
            "ascent_rate": ascent_rate,
            "gas_remaining": gas_remaining,
            "decompression_status": decompression_status,
            "risk_level": risk_level
        })

    return pd.DataFrame(data)


if __name__ == "__main__":

    df = generate_dataset(1000)

    df.to_csv(
        "data/dive_training_data.csv",
        index=False
    )

    print("Dataset generated successfully.")
    print(f"Samples: {len(df)}")
    print("\nRisk distribution:")
    print(df["risk_level"].value_counts())