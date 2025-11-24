
import { AlertTriangle, CloudRain, Droplets } from 'lucide-react';
import type { Barangay } from '../types';

interface RainAlertsProps {
    rainyBarangays: Barangay[];
    setSelectedBarangay: (barangay: Barangay) => void;
    sendAlert: (barangayName: string) => void;
}

export default function RainAlerts({ rainyBarangays, setSelectedBarangay, sendAlert }: RainAlertsProps) {
    if (rainyBarangays.length === 0) return null;

    return (
        <div className="mb-8">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-500" />
                Immediate Rain Alerts
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {rainyBarangays.map(barangay => (
                    <div key={barangay.name} className="bg-gradient-to-br from-red-50 to-white border border-red-100 rounded-xl p-5 flex flex-col">
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
    );
}
