function toRadians(degrees: number) {
  return degrees * (Math.PI / 180);
}

function haversineDistance(coord1: [number, number], coord2: [number, number]) {
  const [lat1, lon1] = coord1;
  const [lat2, lon2] = coord2;

  const R = 6371000; // Earth's radius in meters
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * Math.sin(dLon / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in meters
}

export function isInsideRadius(mycoords: [number, number], centerCoords: [number, number], radius = 300) {
  const distance = haversineDistance(mycoords, centerCoords);
  return distance <= radius;
}

// Example usage:
const mycoords = [15.134, 120.591];
const center = [15.136, 120.591];


