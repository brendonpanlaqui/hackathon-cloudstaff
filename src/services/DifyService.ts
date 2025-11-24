import axios from "axios";
import type { DifyPayload, DifyResponse } from "../types";


export async function getDifyResponse(
  payload: DifyPayload
): Promise<DifyResponse> {
  try {
    const response = await axios.post<DifyResponse>(
      "https://dify-hackaton.cloudstaff.io/v1/chat-messages",
      payload,
      {
        headers: {
          Authorization: `Bearer app-4LpAvUEQ4at3StGfCK08y6Fd`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching Dify response:", error);
    throw error;
  }
}

export function getFloodStrength(params: { rain_forecast: string; typhoon_strength: number }, barangay_risk: string) {
  const rain = params.rain_forecast.toLowerCase();
  const typhoon = params.typhoon_strength;
  const risk = barangay_risk.toLowerCase();

  const moderateRain = rain === "moderate";
  const heavyRain = rain === "heavy";
  const moderateRisk = risk === "moderate";
  const heavyRisk = risk === "heavy";

  if ((moderateRain || heavyRain) && (typhoon === 1 || typhoon === 0)) {
    if (moderateRisk || heavyRisk) {
      return "Medium";
    }
  }

  if (typhoon === 2) {
    if (moderateRain && moderateRisk) return "Medium";
    if ((moderateRain || heavyRain) && heavyRisk) return "Low";
  }

  if (typhoon > 2) {
    if ((moderateRain || heavyRain) && (moderateRisk || heavyRisk)) {
      return "High";
    }
  }

  return "Low";
}
