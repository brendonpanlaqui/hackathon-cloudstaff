import { useState, useMemo, useEffect, useRef } from 'react';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import StatsGrid from '../../components/StatsGrid';

import BarangayTable from '../../components/BarangayTable';
import DetailModal from '../../components/DetailModal';
import type { Barangay, DifyPayload, IAnswer, Notification } from '../../types';
import { getDifyResponse, getFloodStrength } from '../../services/DifyService';
import axios from 'axios';
import { extractJson } from '../../services/useExtractJson';
import { wmoCodeMap } from '../../data/weathercode';
import Spinner from '../../components/Spinnet';
import { useSearchParams } from 'react-router-dom';
import Leafy from '../Leafy';
import AlertTable from '../Alert';
import UserMap from '../UserMap';

export default function Alert() {
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

  const myParam = searchParams.get("mapView"); // get ?myParam=value

  

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
  return (
    <div className="flex h-screen bg-gray-50 font-sans overflow-hidden text-slate-900 relative">

      <Sidebar
        filter={filter}
        setFilter={setFilter}
        highRiskCount={highRiskCount}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {myParam ? <><UserMap /></>:<div>
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

          <AlertTable
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