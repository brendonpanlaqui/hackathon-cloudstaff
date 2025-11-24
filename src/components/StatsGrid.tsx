
import { Users, MapPin, CloudRain, Sun } from 'lucide-react';
import type { IAnswer } from '../types';
import { wmoCodeMap } from '../data/weathercode';

interface StatsGridProps {
    response: IAnswer | undefined
}

export default function StatsGrid({ response }: StatsGridProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Stat 1 */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex items-center justify-between">
                <div>
                    <p className="text-sm text-gray-500 mb-1">Weather</p>
                    <h3 className="text-2xl font-bold text-gray-800">{wmoCodeMap[response?.weather_code || 0]}</h3>
                </div>
                <div className="h-12 w-12 bg-blue-50 rounded-full flex items-center justify-center">
                    <Users className="h-6 w-6 text-blue-600" />
                </div>
            </div>

            {/* Stat 2 */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex items-center justify-between">
                <div>
                    <p className="text-sm text-gray-500 mb-1">Typhoon Status</p>
                    <h3 className={`${response?.typhoon_strength && response.typhoon_strength > 0 ? "text-2xl": "text-sm max-w-60"} font-bold text-gray-800`}>{response?.typhoon_status} {response?.typhoon_strength && response.typhoon_strength > 0 ?` (${response?.typhoon_strength})` : ""}</h3>
                </div>
                <div className="h-12 w-12 bg-indigo-50 rounded-full flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-indigo-600" />
                </div>
            </div>

            {/* Stat 3 */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex items-center justify-between relative overflow-hidden">
                <div className="relative z-10">
                    <p className="text-sm text-gray-500 mb-1">Precipitation</p>
                    <h3 className="text-2xl font-bold text-gray-800">{response?.precipitation}%</h3>
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
                    <h3 className="text-2xl font-bold text-gray-800">{response?.temperature_2m}</h3>
                    <p className="text-xs text-gray-400 mt-1">Average today</p>
                </div>
                <div className="h-12 w-12 bg-yellow-50 rounded-full flex items-center justify-center">
                    <Sun className="h-6 w-6 text-yellow-500" />
                </div>
            </div>
        </div>
    );
}
