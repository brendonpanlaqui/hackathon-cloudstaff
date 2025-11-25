import { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Circle, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import type { Barangay } from "../types";
import Spinner from "./Spinnet";
import { useSearchParams } from "react-router-dom";
import ico from "../assets/red.svg"
import L from "leaflet";

import barko from "../assets/barko.svg";

const barangayIcon = L.icon({
  iconUrl: barko,
  iconSize: [35, 35],
  iconAnchor: [17, 35],
  popupAnchor: [0, -35],
});

const NavIcon = L.icon({
  iconUrl: ico,
  iconSize: [35, 35],
  iconAnchor: [17, 35],
  popupAnchor: [0, -35],
});

export default function UserMap() {
  const [error, setError] = useState<string | null>(null);
  const [center, setCenter] = useState<[number, number]>([15.1685, 120.5867]); // default center
  const [you, setYou] = useState<[number, number]>([15.1685, 120.5867]); // default center
  const didRun = useRef(false);
  const [searchParams] = useSearchParams();
  const [directions, setDirections] = useState<any[]>([]); // you can type better if you want

  // Parse coords from query param safely
  const data = searchParams.get("coords");
  const user = searchParams.get("user");
  const splited = data?.split(",") ?? [];

  // Parse lat/lon from split with fallback
  const selectedLat = splited.length === 2 ? Number(splited[0]) : undefined;
  const selectedLon = splited.length === 2 ? Number(splited[1]) : undefined;

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

  return (
    <>
      {error && (
        <div className="absolute top-0 left-0 right-0 bg-red-500 text-white p-2 z-50">
          {error}
        </div>
      )}
      <div className="w-full h-screen relative">
        <MapContainer
          center={
            selectedLat !== undefined && selectedLon !== undefined
              ? [selectedLat, selectedLon]
              : center
          }
          zoom={13}
          className="w-full h-full"
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* Current Location Marker */}
          <Marker position={you} >
            <Popup>You are here</Popup>
          </Marker>

          {/* Selected Barangay Marker */}
          {selectedLat !== undefined && selectedLon !== undefined && (
            <Marker position={[selectedLat, selectedLon]} icon={NavIcon}>
              <Popup>{user}</Popup>
            </Marker>
          )}

          {/* You can add Polyline or Circles here */}
        </MapContainer>
      </div>
    </>
  );
}
