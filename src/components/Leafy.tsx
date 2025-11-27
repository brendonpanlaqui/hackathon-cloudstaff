import { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Circle, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import type { Barangay } from "../types";
import Spinner from "./Spinnet";
import { useSearchParams } from "react-router-dom";
import { getDifyResponse } from "../services/DifyService";
import { extractJson, extractTurf } from "../services/useExtractJson";
import axios from "axios";
import barko from "../assets/barko.svg"
import L from "leaflet";
interface ILeafy {
  response: Barangay[];
}



const barangayIcon = L.icon({
  iconUrl: barko,
  iconSize: [35, 35],
  iconAnchor: [17, 35],
  popupAnchor: [0, -35],
});

const NavIcon = L.icon({
  iconUrl: "/icons/marker.png",
  iconSize: [35, 35],
  iconAnchor: [17, 35],
  popupAnchor: [0, -35],
});


export default function Leafy({ response }: ILeafy) {
  const [error, setError] = useState<string | null>(null);
  const [center, setCenter] = useState<[number, number]>([15.1685, 120.5867]); // default center
  const [you, setYou] = useState<[number, number]>([15.1685, 120.5867]); // default center
  const didRun = useRef(false);
  const [searchParams] = useSearchParams();
  const [directions, setDirections] = useState([])
  const lon = searchParams.get("lon");
  const lat = searchParams.get("lat");

  useEffect(() => {
    if (didRun.current) return;
    didRun.current = true;

    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCenter([position.coords.latitude, position.coords.longitude]);
        setYou([position.coords.latitude, position.coords.longitude]);
      },
      (err) => setError(err.message)
    );
  }, []);

  const getColor = (risk: string) => {
    const level = risk.toLowerCase();
    if (level === "low") return "green";
    if (level === "moderate") return "orange"; // changed to orange for distinction
    if (level === "high") return "red";
    return "blue"; // default color
  };
  const getDirection = async () => {
    // Convert your flooded areas into avoid polygons
    const filteredData = response.map(item => ({
      center: [item.lon, item.lat] as [number, number], // ORS uses [lon, lat]
      radius: 0.4, // km
    }));

    console.log(filteredData);

    // MultiPolygon FeatureCollection from your function
    const requestBody = {
      coordinates: [
        [you[1], you[0]],              // ORS requires [lon, lat]
        [selectedLon, selectedLat],    // also [lon, lat]
      ],
    };


    const apiKey = "eyJvcmciOiI1YjNjZTM1OTc4NTExMTAwMDFjZjYyNDgiLCJpZCI6Ijc3NmNhYmI2MjcxZTQzY2U4NDdmZDE1NmI2ODlmZDlkIiwiaCI6Im11cm11cjY0In0="; // your key

    try {
      const response = await axios.post(
        "https://api.openrouteservice.org/v2/directions/driving-car",
        requestBody,
        {
          headers: {
            Authorization: apiKey,
            "Content-Type": "application/json",
          },
        }
      );

      // ORS returns [lon, lat]
      const routeCoords: [number, number][] =
        response.data.features[0].geometry.coordinates;

      // Convert to Leaflet format [lat, lon]
      const latLngs = routeCoords.map(
        ([lon, lat]): [number, number] => [lat, lon]
      );

      console.log(latLngs);
      return latLngs;
    } catch (error) {
      console.error("Failed to fetch route:", error);
      throw error;
    }
  };

  if (!response) {
    return <Spinner />;
  }

  // Validate lat/lon from searchParams
  const selectedLat = lat ? Number(lat) : null;
  const selectedLon = lon ? Number(lon) : null;
  const hasValidSelectedPosition =
    selectedLat !== null &&
    !isNaN(selectedLat) &&
    selectedLon !== null &&
    !isNaN(selectedLon);

  return (
    <>
      {error && (
        <div className="absolute top-0 left-0 right-0 bg-red-500 text-white p-2 z-50">
          {error}
        </div>
      )}
      <div className="w-full h-screen relative">
        <MapContainer center={center} zoom={13} className="w-full h-full ">
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* Markers */}
          <Marker position={you}>
            <Popup>You are here</Popup>
          </Marker>

         

          {/* Polyline from current location to selected */}
          {hasValidSelectedPosition && (
            <Polyline
              positions={directions}
              pathOptions={{ color: "blue", weight: 4, opacity: 0.7 }}
            />
          )}
          {/* Flooded Barangays as Circles */}
          {response.map((b, i) => (
            <Circle
              key={i}
              center={[b.lat, b.lon]}
              radius={400} // radius in meters
              pathOptions={{
                color: getColor(b.riskLevel),
                fillColor: getColor(b.riskLevel),
                fillOpacity: 0.3,
              }}
              >
            
             <Marker position={[b.lat, b.lon]}
            icon={barangayIcon}
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
                PWD: {b.demographics.pwd}
              </Popup>
            </Marker>
            </Circle>
          ))}
           {hasValidSelectedPosition && (
            <Marker position={[selectedLat!, selectedLon!]}>
              <Popup>Selected Barangay</Popup>
            </Marker>
          )}
        </MapContainer>

        {/* Button fixed at bottom center */}
       
      </div>
    </>
  );
}
