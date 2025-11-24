import { useState, useMemo } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import StatsGrid from './components/StatsGrid';

import BarangayTable from './components/BarangayTable';
import DetailModal from './components/DetailModal';
import { INITIAL_DATA } from './data/barangays';
import type { Barangay, Notification } from './types';

export default function App() {
  const [barangays] = useState<Barangay[]>(INITIAL_DATA);
  const [filter, setFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedBarangay, setSelectedBarangay] = useState<Barangay | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([
    { id: 1, msg: "Heavy rain expected in Balibago around 4 PM.", time: "10m ago", type: "alert" },
    { id: 2, msg: "Census data updated for Pulung Maragul.", time: "1h ago", type: "info" }
  ]);

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

  const totalPopulation = useMemo(() => barangays.reduce((acc, curr) => acc + curr.population, 0), [barangays]);
  const rainyCount = useMemo(() => barangays.filter(b => b.weather === 'Rainy').length, [barangays]);

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

      <DetailModal
        selectedBarangay={selectedBarangay}
        setSelectedBarangay={setSelectedBarangay}
        sendAlert={sendAlert}
      />

      <Sidebar
        filter={filter}
        setFilter={setFilter}
        rainyCount={rainyCount}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <Header
          setSidebarOpen={setSidebarOpen}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          notifications={notifications}
        />

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8">

          <StatsGrid
            totalPopulation={totalPopulation}
            monitoredCount={barangays.length}
            rainyCount={rainyCount}
          />

          <BarangayTable
            barangays={barangays}
            filteredBarangays={filteredBarangays}
            setSearchTerm={setSearchTerm}
            setSelectedBarangay={setSelectedBarangay}
          />



        </div>
      </main>
    </div>
  );
}