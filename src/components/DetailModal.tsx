
import { X, MapPin, Baby, Briefcase, Activity, Bell } from 'lucide-react';
import type { Barangay } from '../types';
import { Link } from 'react-router-dom';

interface DetailModalProps {
    selectedBarangay: Barangay | null;
    setSelectedBarangay: (barangay: Barangay | null) => void;
    sendAlert: (barangayName: string) => void;
}

export default function DetailModal({ selectedBarangay, setSelectedBarangay, sendAlert }: DetailModalProps) {
    if (!selectedBarangay) return null;

    // const getWeatherIcon = (weather: WeatherType, size = "h-5 w-5") => {
    //     switch (weather) {
    //         case 'Rainy': return <CloudRain className={`${size} text-blue-500`} />;
    //         case 'Cloudy': return <Cloud className={`${size} text-gray-500`} />;
    //         case 'Sunny': return <Sun className={`${size} text-yellow-500`} />;
    //         default: return <Sun className={`${size} text-yellow-500`} />;
    //     }
    // };

    const getRiskBadge = (level: string) => {
        switch (level) {
            case 'High': return <span className="px-2 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-800 border border-red-200">High Risk</span>;
            case 'Medium': return <span className="px-2 py-1 rounded-full text-xs font-semibold bg-orange-100 text-orange-800 border border-orange-200">Medium</span>;
            case 'Low': return <span className="px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800 border border-green-200">Low</span>;
            default: return <span className="px-2 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-800 border border-gray-200">Safe</span>;
        }
    };

    return (
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
                    {/* <div className="mb-8">
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
                    </div> */}

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
                                {/* <div className="text-right">
                                    <p className="text-xl font-bold text-gray-900">{selectedBarangay.households.toLocaleString()}</p>
                                    <p className="text-sm text-gray-500">Total Households</p>
                                </div> */}
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
                                    <p className="text-xs text-blue-800 font-bold uppercase mb-1">PWD</p>
                                    <p className="text-2xl font-bold text-gray-900">{selectedBarangay.demographics.pwd.toLocaleString()}</p>
                                    <div className="w-full bg-blue-200 h-1.5 rounded-full mt-3 overflow-hidden">
                                        <div className="bg-blue-500 h-full" style={{ width: `${(selectedBarangay.demographics.pwd / selectedBarangay.population) * 100}%` }}></div>
                                    </div>
                                    <p className="text-[10px] text-gray-500 mt-1">{Math.round((selectedBarangay.demographics.pwd / selectedBarangay.population) * 100)}% of total</p>
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
                        <Link to={`?viewMap=true&lon=${selectedBarangay.lon}&lat=${selectedBarangay.lat}`} onClick={(()=>setSelectedBarangay(null))}
                            className="flex-1 py-3 text-center bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-xl font-bold transition-all"
                        >
                            View Map Location
                        </Link>
                    </div>

                </div>
            </div>
        </div>
    );
}
