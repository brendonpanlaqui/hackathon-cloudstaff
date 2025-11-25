
import { Search } from 'lucide-react';
import type { Barangay } from '../types';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

interface BarangayTableProps {
    barangays: Barangay[];
    filteredBarangays: Barangay[];
    setSearchTerm: (term: string) => void;
    setSelectedBarangay: (barangay: Barangay) => void;
}
export default function AlertTable({ barangays, filteredBarangays, setSearchTerm, setSelectedBarangay }: BarangayTableProps) {
    const [data, setData] = useState<any>()
   useEffect(()=>{
    const fetch = async () => {
        const response = await axios.get("http://127.0.0.1:5000/alerts")
        setData(response.data)
    }
    fetch()
   },[])
   const sortedFilteredBaranger =  [...filteredBarangays].sort((a, b) => b.percentage - a.percentage);
    console.log(sortedFilteredBaranger)
    const getRiskBadge = (level: string) => {
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
                <h3 className="text-lg font-bold text-gray-800">User Report</h3>

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

            <div className="overflow-x-auto max-h-[30rem]">
                <table className="w-full">
                    <thead className="bg-gray-50 text-xs uppercase text-gray-500 font-semibold">
                        <tr>
                            <th className="px-6 py-4 text-center">Id</th>
                            <th className="px-6 py-4 text-center">User</th>
                            <th className="px-6 py-4 text-center">Description</th>
                              <th className="px-6 py-4 text-center">Created At</th>
                               <th className="px-6 py-4 text-center">Type</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {data  ? data.map((barangay: any) => (
                            
                            <tr onClick={()=>{  window.location.href = `?mapView=true&coords=${barangay.gpslocation}&user=${barangay.user}`}}
                            
                                className="hover:bg-blue-50/50 transition-colors group cursor-pointer"
                               
                            >
                               <td className="px-6 py-4">
                                    <div className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">{barangay.id}</div>
                                </td>
                                <td className="px-6 py-4 text-center text-gray-600 font-mono text-sm">
                                    {barangay.user}
                                </td>
                                <td className="px-6 py-4 text-center text-gray-600 font-mono text-sm">
                                    {barangay.description}
                                </td>
                                <td className="px-6 py-4 text-center text-gray-600 font-mono text-sm">
                                    {barangay.created_at}
                                </td>
                                <td className="px-6 py-4 text-center text-gray-600 font-mono text-sm">
                                    {barangay.type}
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
                <span>Showing {sortedFilteredBaranger.length} of {barangays.length} barangays</span>
                <div className="flex gap-2">
                    <button className="px-3 py-1 border rounded bg-white hover:bg-gray-100 disabled:opacity-50" disabled>Prev</button>
                    <button className="px-3 py-1 border rounded bg-white hover:bg-gray-100">Next</button>
                </div>
            </div>
        </div>
    );
}
