import { useState, useMemo, useEffect, useRef } from 'react';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import StatsGrid from '../../components/StatsGrid';

import BarangayTable from '../../components/BarangayTable';
import DetailModal from '../../components/DetailModal';
import type { Barangay, DifyPayload, IAnswer, Notification } from '../../types';
import { getDifyResponse, getFloodStrength } from '../../services/DifyService';
import axios from 'axios';
import { isInsideRadius } from '../../services/Radius';
import { extractJson } from '../../services/useExtractJson';
import { wmoCodeMap } from '../../data/weathercode';
import Spinner from '../../components/Spinnet';
import { useSearchParams } from 'react-router-dom';
import Leafy from '../Leafy';

export default function Admin() {
  const [barangays, setBarangayData] = useState<Barangay[]>([]);
  const [filter, setFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedBarangay, setSelectedBarangay] = useState<Barangay | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([
    { id: 1, msg: "Heavy rain expected in Balibago around 4 PM.", time: "10m ago", type: "alert" },
    { id: 2, msg: "Census data updated for Pulung Maragul.", time: "1h ago", type: "info" }
  ]);
  const [response, setResponse] = useState<IAnswer>();
  const [error, setError] = useState<string | null>(null);
  const [center, setCenter] = useState<[number, number]>([15.1685, 120.5867]); // default center
  const [you, setYou] = useState<[number, number]>([15.1685, 120.5867]); // default center
  const [payload, setPayload] = useState<DifyPayload>({
    inputs: {},
    query: "Angeles City pampanga",
    response_mode: "blocking",
    conversation_id: "",
    user: "abc-123",
  });
   const [searchParams] = useSearchParams();

  const myParam = searchParams.get("viewMap"); // get ?myParam=value

  
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
    const results: Barangay[] = [];

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
      if (coords) {
        console.log(isInsideRadius(coords, you)); // true or false
        results.push({
          name: b.name,
          population: b.total_population,
          demographics: { children: b.children, pwd: b.pwd, seniors: b.senior },
          weather: wmoCodeMap[response?.weather_code || 0],
          precipProb: response?.precipitation || 0,
          temp: response?.temperature_2m || 0,
          riskLevel: getFloodStrength({ rain_forecast: response?.rain_forecast || "", typhoon_strength: response?.typhoon_strength || 0 }, b.flood_risk),
          percentage:  ((b.children + b.pwd + b.senior) / b.total_population) * 100,
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
        const newQuery = `latitude=15.13396&longitude=120.5864`;
        setCenter([15.13396, 120.5864])
        setYou([position.coords.latitude, position.coords.longitude]);

        const updatedPayload = {
          ...payload,
          query: newQuery,
        };
        setPayload(updatedPayload);

        await request(updatedPayload);
      },
      (err) => setError(err.message)
    );
  }, []);

  // Modified request to geocode barangays after fetching response
  const request = async (p: DifyPayload) => {
    try {
      const data = await getDifyResponse(p);
      const json: IAnswer = extractJson(data.answer);
      console.log(json)
      setResponse(json);
      if (json?.flooded_barangays?.length) {
        const geocodedBarangays = await geocodeBarangays(json.flooded_barangays);
        setBarangayData(geocodedBarangays);

      }
    } catch (err) {
      console.error(err);
      setError("Error fetching Dify response");
    }
  };

  // Derived State
  const filteredBarangays = useMemo(() => {
    return barangays.filter(b => {
      const matchesSearch = b.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filter === 'All' ||
        (filter === 'Rainy' && b.weather === 'Rainy') ||
        (filter === 'High Risk' && b.riskLevel === 'High');
      return matchesSearch && matchesFilter;
    });
  }, [barangays, filter, searchTerm]);

  // const totalPopulation = useMemo(() => barangays.reduce((acc, curr) => acc + curr.population, 0), [barangays]);
  const highRiskCount = useMemo(() => barangays.filter(b => b.riskLevel === 'High').length, [barangays]);

  const sendAlert = (barangayName: string) => {
    const newNotif: Notification = {
      id: Date.now(),
      msg: `Manual Alert sent to residents of ${barangayName}`,
      time: "Just now",
      type: "success"
    };
    setNotifications([newNotif, ...notifications]);
  };
if(barangays.length < 1){
  return <Spinner/>
}
  return (
    <div className="flex h-screen bg-gray-50 font-sans overflow-hidden text-slate-900 relative">

      <DetailModal
        selectedBarangay={selectedBarangay}
        setSelectedBarangay={setSelectedBarangay}
        sendAlert={sendAlert}
      />

      <Sidebar
        filter={filter}
        setFilter={setFilter}
        highRiskCount={highRiskCount}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {myParam ? <><Leafy response = {barangays}/></>:<div>
        <Header
          setSidebarOpen={setSidebarOpen}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          notifications={notifications}
        />

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8">

          <StatsGrid
            response={response}
          />

          <BarangayTable
            barangays={barangays}
            filteredBarangays={filteredBarangays}
            setSearchTerm={setSearchTerm}
            setSelectedBarangay={setSelectedBarangay}
          />
        </div>
        </div>}
      </main>
    </div>
  );
}