import { useEffect, useRef, useState } from "react";

import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";

import "leaflet/dist/leaflet.css";
import axios from "axios";
import { isInsideRadius } from "../services/Radius";
import type { IAnswer, FloodedBarangayWithCoords, Barangay } from "../types";
import Spinner from "./Spinnet";
 interface ILeafy {
  response : Barangay[]
}

export default function Leafy({response} : ILeafy) {
  
  const [error, setError] = useState<string | null>(null);
  const [center, setCenter] = useState<[number, number]>([15.1685, 120.5867]); // default center
   const [you, setYou] = useState<[number, number]>([15.1685, 120.5867]); // default center
  const didRun = useRef(false);

  // Helper to geocode a barangay name to lat/lon using Nominatim
  async function geocodeAddress(address: string): Promise<[number, number] | null> {
    try {
      const response = await axios.get("https://nominatim.openstreetmap.org/search", {
        params: {
          q: address,
          format: "json",
          limit: 3,
        },
      });
      const data = response.data;
      if (data && data.length > 0) {
        return [parseFloat(data[0].lat), parseFloat(data[0].lon)];
      }
      return null;
    } catch (err) {
      console.error("Geocoding error:", err);
      return null;
    }
  }

  // Function to geocode all flooded barangays from response
  async function geocodeBarangays(barangays: IAnswer["flooded_barangays"]) {
  const results: FloodedBarangayWithCoords[] = [];

  for (const b of barangays) {
    const attempts = [
      b.name,                                   // full name, e.g. "Barangay San Nicolas, San Fernando, Pampanga"
      b.name.replace(/^Barangay\s+/i, ""),     // remove "Barangay" prefix if present
      // Optionally, you can add more general attempts here, e.g. just city + province
      // "San Fernando, Pampanga" or similar if you have this info available
    ];

    let coords = null;
    for (const address of attempts) {
      coords = await geocodeAddress(address);
      if (coords) break;
    }

    if (!coords) {
      // Fallback: try geocoding just the city or province if available, or leave null
      console.warn("Could not geocode:", b.name);
    }
    if(coords){
    console.log(isInsideRadius(coords, you)); // true or false
    results.push({
      ...b,
      lat: coords ? coords[0] : 0,
      lon: coords ? coords[1] : 0,
    });
    }
  }

  return results;
}


  useEffect(() => {
  if (didRun.current) return;
  didRun.current = true;

  if (!navigator.geolocation) {
    setError("Geolocation is not supported by your browser");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    async (position) => { 
      setCenter([15.13396,120.5864])
      setYou([position.coords.latitude, position.coords.longitude]);
    },
    (err) => setError(err.message)
  );
}, []);
const getColor = (risk: string) =>{
  if(risk.toLocaleLowerCase() == "low"){
    return "green"
  }
if(risk.toLocaleLowerCase() == "moderate"){
    return "green"
  }
  if(risk.toLocaleLowerCase() == "high"){
    return "red"
  }  
}

if (!response){
  return <Spinner/>
}
  return (
    <>
    { response  &&
    <div>
     
      <div className="flex justify-center">
        <MapContainer
          center={center}
          zoom={13}
          className="w-full h-screen rounded-lg shadow-lg"
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* Current Location Marker */}
          <Marker position={you}>
            <Popup>You are here</Popup>
          </Marker>

          {/* Flooded Barangays as Circles */}
          {response.map((b, i) => (
            <Circle
              key={i}
              center={[b.lat, b.lon]}
              radius={400} // radius in meters, adjust as needed
              pathOptions={{ color: getColor(b.riskLevel), fillColor: getColor(b.riskLevel), fillOpacity: 0.3 }}
            >
              <Popup>
                <strong>{b.name}</strong>
                <br />
                Population: {b.population}
                <br />
                Children: {b.demographics.children}
                <br />
                Seniors: {b.demographics.seniors}
                <br />
                Seniors: {b.demographics.pwd}
              </Popup>
            </Circle>
          ))}
        </MapContainer>

      </div></div>}
    </>
  );
}
