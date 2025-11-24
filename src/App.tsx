import React, { useState, useMemo } from 'react';
import { 
  CloudRain, 
  Sun, 
  Cloud, 
  Users, 
  Bell, 
  MapPin, 
  Search, 
  Menu, 
  X, 
  Umbrella,
  AlertTriangle,
  Droplets,
  ChevronRight,
  Baby,
  Briefcase,
  Activity
} from 'lucide-react';


const INITIAL_DATA = [
  { 
    id: 1, 
    name: 'Balibago', 
    population: 42500, 
    households: 10200, 
    weather: 'Rainy', 
    precipProb: 85, 
    temp: 28, 
    riskLevel: 'High',
    demographics: { children: 14875, adults: 23375, seniors: 4250 } // Approx 35% / 55% / 10%
  },
  { 
    id: 2, 
    name: 'Cutcut', 
    population: 29000, 
    households: 6800, 
    weather: 'Cloudy', 
    precipProb: 20, 
    temp: 30, 
    riskLevel: 'Low',
    demographics: { children: 8700, adults: 17400, seniors: 2900 }
  },
  { 
    id: 3, 
    name: 'Pulung Maragul', 
    population: 18500, 
    households: 4100, 
    weather: 'Rainy', 
    precipProb: 90, 
    temp: 27, 
    riskLevel: 'High',
    demographics: { children: 6475, adults: 10175, seniors: 1850 }
  },
  { 
    id: 4, 
    name: 'Santo Rosario', 
    population: 12000, 
    households: 3000, 
    weather: 'Sunny', 
    precipProb: 5, 
    temp: 33, 
    riskLevel: 'None',
    demographics: { children: 3000, adults: 7200, seniors: 1800 }
  },
  { 
    id: 5, 
    name: 'Sapang Bato', 
    population: 15200, 
    households: 3500, 
    weather: 'Rainy', 
    precipProb: 75, 
    temp: 26, 
    riskLevel: 'Medium',
    demographics: { children: 5320, adults: 8360, seniors: 1520 }
  },
  { 
    id: 6, 
    name: 'Pandan', 
    population: 21000, 
    households: 4800, 
    weather: 'Cloudy', 
    precipProb: 30, 
    temp: 29, 
    riskLevel: 'Low',
    demographics: { children: 7350, adults: 11550, seniors: 2100 }
  },
  { 
    id: 7, 
    name: 'Anunas', 
    population: 24500, 
    households: 5600, 
    weather: 'Sunny', 
    precipProb: 10, 
    temp: 32, 
    riskLevel: 'None',
    demographics: { children: 8575, adults: 13475, seniors: 2450 }
  },
  { 
    id: 8, 
    name: 'Malabanias', 
    population: 28000, 
    households: 6200, 
    weather: 'Rainy', 
    precipProb: 80, 
    temp: 28, 
    riskLevel: 'High',
    demographics: { children: 9800, adults: 15400, seniors: 2800 }
  },
  { 
    id: 9, 
    name: 'Margot', 
    population: 9500, 
    households: 2100, 
    weather: 'Sunny', 
    precipProb: 0, 
    temp: 34, 
    riskLevel: 'None',
    demographics: { children: 3325, adults: 5225, seniors: 950 }
  },
  { 
    id: 10, 
    name: 'Tabun', 
    population: 8000, 
    households: 1800, 
    weather: 'Cloudy', 
    precipProb: 15, 
    temp: 31, 
    riskLevel: 'Low',
    demographics: { children: 2800, adults: 4400, seniors: 800 }
  },
];

export default function App() {
  const [barangays, setBarangays] = useState(INITIAL_DATA);
  const [filter, setFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedBarangay, setSelectedBarangay] = useState(null); // New state for detail view
  const [notifications, setNotifications] = useState([
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

  const getWeatherIcon = (weather, size = "h-5 w-5") => {
    switch (weather) {
      case 'Rainy': return <CloudRain className={`${size} text-blue-500`} />;
      case 'Cloudy': return <Cloud className={`${size} text-gray-500`} />;
      case 'Sunny': return <Sun className={`${size} text-yellow-500`} />;
      default: return <Sun className={`${size} text-yellow-500`} />;
    }
  };

  const getRiskBadge = (level) => {
    switch (level) {
      case 'High': return <span className="px-2 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-800 border border-red-200">High Risk</span>;
      case 'Medium': return <span className="px-2 py-1 rounded-full text-xs font-semibold bg-orange-100 text-orange-800 border border-orange-200">Medium</span>;
      case 'Low': return <span className="px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800 border border-green-200">Low</span>;
      default: return <span className="px-2 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-800 border border-gray-200">Safe</span>;
    }
  };

  const sendAlert = (barangayName) => {
    const newNotif = {
      id: Date.now(),
      msg: `Manual Alert sent to residents of ${barangayName}`,
      time: "Just now",
      type: "success"
    };
    setNotifications([newNotif, ...notifications]);
  };

  return (
    <div className="flex h-screen bg-gray-50 font-sans overflow-hidden text-slate-900 relative">
      
      {/* Detail Modal Overlay */}
      {selectedBarangay && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
           <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
              {/* Modal Header */}
              <div className="bg-slate-900 p-6 flex justify-between items-start shrink-0">
                <div>
                   <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                     {selectedBarangay.name}
                     {getRiskBadge(selectedBarangay.riskLevel)}
                   </h2>
                   <div className="flex items-center gap-2 mt-2 text-slate-400 text-sm">
                      <MapPin className="h-4 w-4" />
                      Angeles City, Pampanga
                   </div>
                </div>
                <button 
                  onClick={() => setSelectedBarangay(null)} 
                  className="p-2 bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 rounded-full transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Modal Content - Scrollable */}
              <div className="p-6 overflow-y-auto">
                 {/* Weather Section */}
                 <div className="mb-8">
                    <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">Current Conditions</h3>
                    <div className="flex flex-col sm:flex-row gap-4">
                       <div className="flex-1 bg-blue-50 border border-blue-100 p-4 rounded-xl flex items-center gap-4">
                          <div className="bg-white p-3 rounded-full shadow-sm">
                             {getWeatherIcon(selectedBarangay.weather, "h-8 w-8")}
                          </div>
                          <div>
                             <p className="text-sm text-gray-500">Weather</p>
                             <p className="font-bold text-gray-900 text-lg">{selectedBarangay.weather}</p>
                          </div>
                       </div>
                       <div className="flex-1 bg-gray-50 border border-gray-100 p-4 rounded-xl flex items-center gap-4">
                          <div className="bg-white p-3 rounded-full shadow-sm">
                             <Droplets className="h-8 w-8 text-blue-400" />
                          </div>
                          <div>
                             <p className="text-sm text-gray-500">Precipitation</p>
                             <p className="font-bold text-gray-900 text-lg">{selectedBarangay.precipProb}%</p>
                          </div>
                       </div>
                       <div className="flex-1 bg-yellow-50 border border-yellow-100 p-4 rounded-xl flex items-center gap-4">
                          <div className="bg-white p-3 rounded-full shadow-sm">
                             <Sun className="h-8 w-8 text-orange-400" />
                          </div>
                          <div>
                             <p className="text-sm text-gray-500">Temperature</p>
                             <p className="font-bold text-gray-900 text-lg">{selectedBarangay.temp}°C</p>
                          </div>
                       </div>
                    </div>
                 </div>

                 {/* Demographics Section */}
                 <div className="mb-6">
                    <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                       Population Breakdown
                    </h3>
                    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                       <div className="flex items-center justify-between mb-6">
                          <div>
                             <p className="text-3xl font-bold text-gray-900">{selectedBarangay.population.toLocaleString()}</p>
                             <p className="text-sm text-gray-500">Total Residents</p>
                          </div>
                          <div className="text-right">
                             <p className="text-xl font-bold text-gray-900">{selectedBarangay.households.toLocaleString()}</p>
                             <p className="text-sm text-gray-500">Total Households</p>
                          </div>
                       </div>

                       {/* Detailed Grid */}
                       <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          {/* Children */}
                          <div className="bg-green-50 p-4 rounded-lg border border-green-100 text-center relative overflow-hidden group">
                             <div className="absolute top-2 right-2 opacity-10 group-hover:opacity-20 transition-opacity">
                                <Baby className="h-12 w-12 text-green-600" />
                             </div>
                             <p className="text-xs text-green-800 font-bold uppercase mb-1">Children (0-17)</p>
                             <p className="text-2xl font-bold text-gray-900">{selectedBarangay.demographics.children.toLocaleString()}</p>
                             <div className="w-full bg-green-200 h-1.5 rounded-full mt-3 overflow-hidden">
                                <div className="bg-green-500 h-full" style={{ width: `${(selectedBarangay.demographics.children / selectedBarangay.population) * 100}%` }}></div>
                             </div>
                             <p className="text-[10px] text-gray-500 mt-1">{Math.round((selectedBarangay.demographics.children / selectedBarangay.population) * 100)}% of total</p>
                          </div>

                          {/* Adults */}
                          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 text-center relative overflow-hidden group">
                             <div className="absolute top-2 right-2 opacity-10 group-hover:opacity-20 transition-opacity">
                                <Briefcase className="h-12 w-12 text-blue-600" />
                             </div>
                             <p className="text-xs text-blue-800 font-bold uppercase mb-1">Adults (18-59)</p>
                             <p className="text-2xl font-bold text-gray-900">{selectedBarangay.demographics.adults.toLocaleString()}</p>
                             <div className="w-full bg-blue-200 h-1.5 rounded-full mt-3 overflow-hidden">
                                <div className="bg-blue-500 h-full" style={{ width: `${(selectedBarangay.demographics.adults / selectedBarangay.population) * 100}%` }}></div>
                             </div>
                             <p className="text-[10px] text-gray-500 mt-1">{Math.round((selectedBarangay.demographics.adults / selectedBarangay.population) * 100)}% of total</p>
                          </div>

                          {/* Seniors */}
                          <div className="bg-purple-50 p-4 rounded-lg border border-purple-100 text-center relative overflow-hidden group">
                             <div className="absolute top-2 right-2 opacity-10 group-hover:opacity-20 transition-opacity">
                                <Activity className="h-12 w-12 text-purple-600" />
                             </div>
                             <p className="text-xs text-purple-800 font-bold uppercase mb-1">Seniors (60+)</p>
                             <p className="text-2xl font-bold text-gray-900">{selectedBarangay.demographics.seniors.toLocaleString()}</p>
                             <div className="w-full bg-purple-200 h-1.5 rounded-full mt-3 overflow-hidden">
                                <div className="bg-purple-500 h-full" style={{ width: `${(selectedBarangay.demographics.seniors / selectedBarangay.population) * 100}%` }}></div>
                             </div>
                             <p className="text-[10px] text-gray-500 mt-1">{Math.round((selectedBarangay.demographics.seniors / selectedBarangay.population) * 100)}% of total</p>
                          </div>
                       </div>
                    </div>
                 </div>

                 <div className="flex gap-3">
                    <button 
                       onClick={() => sendAlert(selectedBarangay.name)}
                       className="flex-1 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold shadow-lg shadow-red-200 transition-all flex items-center justify-center gap-2"
                    >
                       <Bell className="h-5 w-5" />
                       Send Emergency Alert
                    </button>
                    <button 
                       className="flex-1 py-3 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-xl font-bold transition-all"
                    >
                       View Map Location
                    </button>
                 </div>

              </div>
           </div>
        </div>
      )}

      <aside className="hidden md:flex flex-col w-64 bg-slate-900 text-white shadow-xl z-10">
        <div className="p-6 flex items-center gap-3 border-b border-slate-800">
          <div className="bg-blue-600 p-2 rounded-lg">
            <Umbrella className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-lg tracking-tight">AngelesWatch</h1>
            <p className="text-xs text-slate-400">LGU Dashboard</p>
          </div>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <button 
            onClick={() => setFilter('All')}
            className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg transition-all ${filter === 'All' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
          >
            <MapPin className="h-5 w-5" />
            Dashboard Overview
          </button>
          <button 
            onClick={() => setFilter('Rainy')}
            className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg transition-all ${filter === 'Rainy' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
          >
            <CloudRain className="h-5 w-5" />
            Rain Alerts
            {rainyCount > 0 && <span className="ml-auto bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">{rainyCount}</span>}
          </button>
          <button 
            onClick={() => setFilter('High Risk')}
            className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg transition-all ${filter === 'High Risk' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
          >
            <AlertTriangle className="h-5 w-5" />
            High Risk Areas
          </button>
        </nav>

        <div className="p-4 border-t border-slate-800">
          <div className="bg-slate-800 rounded-xl p-4">
            <p className="text-xs text-slate-400 mb-2">System Status</p>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
              <span className="text-sm font-medium text-white">Weather API Online</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden" onClick={() => setSidebarOpen(false)}>
          <div className="w-64 h-full bg-slate-900 text-white p-4" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-8">
              <h2 className="font-bold text-xl">Menu</h2>
              <button onClick={() => setSidebarOpen(false)}><X className="h-6 w-6" /></button>
            </div>
            <nav className="space-y-4">
              <button onClick={() => {setFilter('All'); setSidebarOpen(false)}} className="block w-full text-left p-2 hover:bg-slate-800 rounded">Overview</button>
              <button onClick={() => {setFilter('Rainy'); setSidebarOpen(false)}} className="block w-full text-left p-2 hover:bg-slate-800 rounded">Rain Alerts</button>
              <button onClick={() => {setFilter('High Risk'); setSidebarOpen(false)}} className="block w-full text-left p-2 hover:bg-slate-800 rounded">High Risk Areas</button>
            </nav>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-4 md:px-8 shrink-0">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(true)} className="md:hidden p-2 hover:bg-gray-100 rounded-lg">
              <Menu className="h-6 w-6 text-gray-600" />
            </button>
            <h2 className="text-xl font-bold text-gray-800 hidden sm:block">Angeles City Monitor</h2>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search barangay..." 
                className="pl-10 pr-4 py-2 bg-gray-100 border-none rounded-full text-sm focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all w-64"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button className="relative p-2 hover:bg-gray-100 rounded-full transition-colors group">
              <Bell className="h-6 w-6 text-gray-600" />
              <span className="absolute top-2 right-2 h-2 w-2 bg-red-500 rounded-full border border-white"></span>
              
              {/* Notification Dropdown Simulation */}
              <div className="absolute right-0 top-full mt-2 w-80 bg-white shadow-xl rounded-xl border border-gray-100 p-2 hidden group-hover:block z-50">
                 <div className="text-xs font-bold text-gray-400 px-2 py-1 uppercase">Recent Alerts</div>
                 {notifications.map(n => (
                   <div key={n.id} className="p-3 hover:bg-gray-50 rounded-lg border-b border-gray-50 last:border-0">
                     <p className="text-sm text-gray-800">{n.msg}</p>
                     <p className="text-xs text-gray-400 mt-1">{n.time}</p>
                   </div>
                 ))}
              </div>
            </button>
            <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-blue-600 to-blue-400 flex items-center justify-center text-white font-bold text-xs">
              AD
            </div>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Stat 1 */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Total Population</p>
                <h3 className="text-2xl font-bold text-gray-800">{totalPopulation.toLocaleString()}</h3>
              </div>
              <div className="h-12 w-12 bg-blue-50 rounded-full flex items-center justify-center">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>

            {/* Stat 2 */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Barangays Monitored</p>
                <h3 className="text-2xl font-bold text-gray-800">{barangays.length}</h3>
              </div>
              <div className="h-12 w-12 bg-indigo-50 rounded-full flex items-center justify-center">
                <MapPin className="h-6 w-6 text-indigo-600" />
              </div>
            </div>

            {/* Stat 3 */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex items-center justify-between relative overflow-hidden">
              <div className="relative z-10">
                <p className="text-sm text-gray-500 mb-1">Rain Forecast</p>
                <h3 className="text-2xl font-bold text-gray-800">{rainyCount} Areas</h3>
                <p className="text-xs text-red-500 mt-1 font-medium">Prepare Advisories</p>
              </div>
              <div className="h-12 w-12 bg-red-50 rounded-full flex items-center justify-center relative z-10">
                <CloudRain className="h-6 w-6 text-red-500" />
              </div>
              {/* Decorative bg */}
              <div className="absolute -bottom-4 -right-4 h-24 w-24 bg-red-50 rounded-full opacity-50"></div>
            </div>

             {/* Stat 4 */}
             <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Angeles Temp</p>
                <h3 className="text-2xl font-bold text-gray-800">29°C</h3>
                <p className="text-xs text-gray-400 mt-1">Average today</p>
              </div>
              <div className="h-12 w-12 bg-yellow-50 rounded-full flex items-center justify-center">
                <Sun className="h-6 w-6 text-yellow-500" />
              </div>
            </div>
          </div>

          {/* Rain Alerts Section (Specific Request) */}
          {rainyCount > 0 && (
             <div className="mb-8">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                   <AlertTriangle className="h-5 w-5 text-red-500" />
                   Immediate Rain Alerts
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                   {barangays.filter(b => b.weather === 'Rainy').map(barangay => (
                      <div key={barangay.id} className="bg-gradient-to-br from-red-50 to-white border border-red-100 rounded-xl p-5 flex flex-col">
                         <div className="flex justify-between items-start mb-4">
                            <div>
                              <h4 
                                className="font-bold text-gray-900 text-lg cursor-pointer hover:text-blue-600 hover:underline"
                                onClick={() => setSelectedBarangay(barangay)}
                              >
                                {barangay.name}
                              </h4>
                              <p className="text-sm text-red-600 font-medium flex items-center gap-1">
                                 <Droplets className="h-3 w-3" /> {barangay.precipProb}% Chance of Rain
                              </p>
                            </div>
                            <CloudRain className="h-8 w-8 text-blue-400" />
                         </div>
                         <div className="mt-auto">
                            <div className="flex justify-between text-sm text-gray-500 mb-3">
                               <span>Affected Pop:</span>
                               <span className="font-medium text-gray-900">{barangay.population.toLocaleString()}</span>
                            </div>
                            <div className="flex gap-2">
                              <button 
                                onClick={() => setSelectedBarangay(barangay)}
                                className="flex-1 py-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-lg text-sm font-medium transition-colors"
                              >
                                View
                              </button>
                              <button 
                                onClick={() => sendAlert(barangay.name)}
                                className="flex-1 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm font-medium transition-colors shadow-md shadow-red-200"
                              >
                                Alert
                              </button>
                            </div>
                         </div>
                      </div>
                   ))}
                </div>
             </div>
          )}

          {/* Main Data Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <h3 className="text-lg font-bold text-gray-800">Census & Weather Overview</h3>
              
              {/* Mobile Search inside table header */}
              <div className="relative sm:hidden w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search..." 
                  className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm w-full"
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 text-xs uppercase text-gray-500 font-semibold">
                  <tr>
                    <th className="px-6 py-4 text-left">Barangay</th>
                    <th className="px-6 py-4 text-right">Population</th>
                    <th className="px-6 py-4 text-right">Households</th>
                    <th className="px-6 py-4 text-center">Status</th>
                    <th className="px-6 py-4 text-center">Temp</th>
                    <th className="px-6 py-4 text-center">Rain Risk</th>
                    <th className="px-6 py-4 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredBarangays.length > 0 ? filteredBarangays.map((barangay) => (
                    <tr 
                      key={barangay.id} 
                      className="hover:bg-blue-50/50 transition-colors group cursor-pointer"
                      onClick={() => setSelectedBarangay(barangay)}
                    >
                      <td className="px-6 py-4">
                        <div className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">{barangay.name}</div>
                        <div className="text-xs text-gray-400">Angeles City</div>
                      </td>
                      <td className="px-6 py-4 text-right text-gray-600 font-mono text-sm">
                        {barangay.population.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-right text-gray-600 font-mono text-sm">
                        {barangay.households.toLocaleString()}
                      </td>
                      <td className="px-6 py-4">
                         <div className="flex items-center justify-center gap-2">
                            {getWeatherIcon(barangay.weather)}
                            <span className={`text-sm font-medium ${barangay.weather === 'Rainy' ? 'text-blue-600' : 'text-gray-600'}`}>
                               {barangay.weather}
                            </span>
                         </div>
                      </td>
                      <td className="px-6 py-4 text-center text-gray-600">
                        {barangay.temp}°C
                      </td>
                      <td className="px-6 py-4 text-center">
                        {getRiskBadge(barangay.riskLevel)}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button 
                          onClick={(e) => { e.stopPropagation(); setSelectedBarangay(barangay); }}
                          className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all" title="View Details"
                        >
                          <ChevronRight className="h-5 w-5" />
                        </button>
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan="7" className="px-6 py-12 text-center text-gray-400">
                        No barangays found matching your filters.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className="p-4 border-t border-gray-200 bg-gray-50 text-xs text-gray-500 flex justify-between items-center">
               <span>Showing {filteredBarangays.length} of {barangays.length} barangays</span>
               <div className="flex gap-2">
                  <button className="px-3 py-1 border rounded bg-white hover:bg-gray-100 disabled:opacity-50" disabled>Prev</button>
                  <button className="px-3 py-1 border rounded bg-white hover:bg-gray-100">Next</button>
               </div>
            </div>
          </div>
          
        </div>
      </main>
    </div>
  );
}