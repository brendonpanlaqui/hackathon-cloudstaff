import * as turf from '@turf/turf';
type FloodZone = {
  center: [number, number];
  radius: number;
}
export const extractJson = (answer: string) => {
  // remove code fences
  let cleaned = answer.replace(/```json|```/g, "").trim();

  // keep only from first { to last }
  const first = cleaned.indexOf("{");
  const last = cleaned.lastIndexOf("}");

  cleaned = cleaned.substring(first, last + 1);

  return JSON.parse(cleaned);
};


export const extractTurf = (floodZones: FloodZone[]) => {
  // Create an array of polygons for each flood zone
  const polygons = floodZones.map(({ center, radius }) => {
    return turf.circle(center, radius, { steps: 64, units: "kilometers" as const });
  });

  // Extract coordinates from each polygon to form a MultiPolygon
  const multiPolygonCoords = polygons.map((polygon) => polygon.geometry.coordinates);

  // Build the MultiPolygon GeoJSON
  const avoidMultiPolygon = {
    type: "Feature",
    geometry: {
      type: "MultiPolygon",
      coordinates: multiPolygonCoords,
    },
    properties: {},
  };

  return avoidMultiPolygon;
};
