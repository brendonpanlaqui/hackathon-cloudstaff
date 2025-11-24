
import { Users, MapPin, CloudRain, Sun } from 'lucide-react';

interface StatsGridProps {
    totalPopulation: number;
    monitoredCount: number;
    rainyCount: number;
}

export default function StatsGrid({ totalPopulation, monitoredCount, rainyCount }: StatsGridProps) {
    return (
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
                    <h3 className="text-2xl font-bold text-gray-800">{monitoredCount}</h3>
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
    );
}
