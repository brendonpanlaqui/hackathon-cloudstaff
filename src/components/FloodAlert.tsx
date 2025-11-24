import { useState } from "react";
import { getWeather } from "../api/weather";
import { classifyRiskMock } from "../api/ai";
import { sendFloodAlert } from "../services/emailjs";

export default function FloodAlert() {
  const [location, setLocation] = useState("");
  const [risk, setRisk] = useState("");

  async function handleCheck() {
    const weather = await getWeather(location);

    const data = {
      precip: weather.current.precip,
      humidity: weather.current.humidity
    };

    const riskLevel = classifyRiskMock(data);
    setRisk(riskLevel);

    if (riskLevel === "HIGH") {
      await sendFloodAlert(location, riskLevel, weather.location.lat, weather.location.lon);
      alert("HIGH RISK! Email alert sent.");
    } else if (riskLevel === "LOW") {
      alert("LOW RISK! No email sent.");
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Flood Risk Alert System</h2>

      <input
        type="text"
        placeholder="Enter location..."
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />

      <button onClick={handleCheck}>Check Flood Risk</button>

      {risk && <p>Current Risk: {risk}</p>}
    </div>
  );
}
