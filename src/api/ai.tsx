export function classifyRiskMock(weather) {
  const { precip, humidity } = weather;
  if (precip > 50 || humidity > 88) return "HIGH";
  return "LOW";
}
