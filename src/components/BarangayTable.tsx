
import { Search } from 'lucide-react';
import type { Barangay, RiskLevel } from '../types';

interface BarangayTableProps {
    barangays: Barangay[];
    filteredBarangays: Barangay[];
    setSearchTerm: (term: string) => void;
    setSelectedBarangay: (barangay: Barangay) => void;
}

export default function BarangayTable({ barangays, filteredBarangays, setSearchTerm, setSelectedBarangay }: BarangayTableProps) {



    const getRiskBadge = (level: RiskLevel) => {
        switch (level) {
            case 'High': return <span className="px-2 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-800 border border-red-200">High Risk</span>;
            case 'Medium': return <span className="px-2 py-1 rounded-full text-xs font-semibold bg-orange-100 text-orange-800 border border-orange-200">Medium</span>;
            case 'Low': return <span className="px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800 border border-green-200">Low</span>;
            default: return <span className="px-2 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-800 border border-gray-200">Safe</span>;
        }
    };

    return (
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
                            <th className="px-6 py-4 text-right">Children</th>
                            <th className="px-6 py-4 text-right">Person with Disabilities</th>
                            <th className="px-6 py-4 text-right">Senior Citizens</th>
                            <th className="px-6 py-4 text-right">Population</th>
                            <th className="px-6 py-4 text-center">Flood Risk</th>
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
                                    {barangay.demographics.children.toLocaleString()}
                                </td>
                                <td className="px-6 py-4 text-right text-gray-600 font-mono text-sm">
                                    {barangay.demographics.pwd.toLocaleString()}
                                </td>
                                <td className="px-6 py-4 text-right text-gray-600 font-mono text-sm">
                                    {barangay.demographics.seniors.toLocaleString()}
                                </td>
                                <td className="px-6 py-4 text-right text-gray-600 font-mono text-sm">
                                    {barangay.population.toLocaleString()}
                                </td>
                                <td className="px-6 py-4 text-center">
                                    {getRiskBadge(barangay.riskLevel)}
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan={5} className="px-6 py-12 text-center text-gray-400">
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
    );
}
