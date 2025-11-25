
import { Search } from 'lucide-react';
import type { Barangay } from '../types';

interface BarangayTableProps {
    barangays: Barangay[];
    filteredBarangays: Barangay[];
    setSearchTerm: (term: string) => void;
    setSelectedBarangay: (barangay: Barangay) => void;
}
const data = [
  {
    "Type": "Resident",
    "Name": "Sam",
    "Age": 18,
    "Priority": 1,
    "GpsLocation": "Barangay Balibago",
    "DailyStatus": "Injured",
    "Notes": "Evacuated to Barangay Hall",
    "RescueTeamAssigned": "Team A",
    "TimeReported": "10:00"
  },
  {
    "Type": "Resident",
    "Name": "Maria Lopez",
    "Age": 32,
    "Priority": 2,
    "GpsLocation": "Barangay Sto. Rosario",
    "DailyStatus": "Safe",
    "Notes": "Staying at evacuation center",
    "RescueTeamAssigned": "Team B",
    "TimeReported": "10:15"
  },
  {
    "Type": "Senior",
    "Name": "Pedro Santos",
    "Age": 67,
    "Priority": 1,
    "GpsLocation": "Barangay Cutcut",
    "DailyStatus": "Injured",
    "Notes": "Needs medical assistance",
    "RescueTeamAssigned": "Team C",
    "TimeReported": "10:20"
  },
  {
    "Type": "Child",
    "Name": "Ana Dizon",
    "Age": 12,
    "Priority": 1,
    "GpsLocation": "Barangay Pandan",
    "DailyStatus": "Missing",
    "Notes": "Last seen near basketball court",
    "RescueTeamAssigned": "Team D",
    "TimeReported": "10:25"
  },
  {
    "Type": "Resident",
    "Name": "John Cruz",
    "Age": 45,
    "Priority": 3,
    "GpsLocation": "Barangay Pulung Maragul",
    "DailyStatus": "Safe",
    "Notes": "Assisting neighbors",
    "RescueTeamAssigned": "None",
    "TimeReported": "10:30"
  },
  {
    "Type": "Senior",
    "Name": "Luz Garcia",
    "Age": 72,
    "Priority": 1,
    "GpsLocation": "Barangay Malabanias",
    "DailyStatus": "Stranded",
    "Notes": "Upper floor of house",
    "RescueTeamAssigned": "Team A",
    "TimeReported": "10:35"
  },
  {
    "Type": "Resident",
    "Name": "Chris Ramos",
    "Age": 28,
    "Priority": 2,
    "GpsLocation": "Barangay Anunas",
    "DailyStatus": "Injured",
    "Notes": "Leg wound, needs transport",
    "RescueTeamAssigned": "Team C",
    "TimeReported": "10:40"
  },
  {
    "Type": "Child",
    "Name": "Mika Torres",
    "Age": 9,
    "Priority": 1,
    "GpsLocation": "Barangay Salapungan",
    "DailyStatus": "Safe",
    "Notes": "With parents",
    "RescueTeamAssigned": "Team B",
    "TimeReported": "10:45"
  },
  {
    "Type": "Resident",
    "Name": "Kevin Bello",
    "Age": 24,
    "Priority": 3,
    "GpsLocation": "Barangay Mining",
    "DailyStatus": "Safe",
    "Notes": "Helping distribute aid",
    "RescueTeamAssigned": "None",
    "TimeReported": "10:50"
  },
  {
    "Type": "Senior",
    "Name": "Dolores Pineda",
    "Age": 61,
    "Priority": 2,
    "GpsLocation": "Barangay Sto. Domingo",
    "DailyStatus": "Evacuated",
    "Notes": "Currently at evacuation center",
    "RescueTeamAssigned": "Team D",
    "TimeReported": "10:55"
  }
]
export default function UserTable({ barangays, filteredBarangays, setSearchTerm, setSelectedBarangay }: BarangayTableProps) {
   
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
                            <th className="px-6 py-4 text-center">Name</th>
                            <th className="px-6 py-4 text-center">Age</th>
                            <th className="px-6 py-4 text-center">priority</th>
                             <th className="px-6 py-4 text-center">Gps Location</th>
                              <th className="px-6 py-4 text-center">Daily Status</th>
                               <th className="px-6 py-4 text-center">Notes</th>
                                <th className="px-6 py-4 text-center">Rescue Team Assigned</th>
                                 <th className="px-6 py-4 text-center">Time Reported</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {data.length > 0 ? data.map((barangay) => (
                            <tr
                          
                                className="hover:bg-blue-50/50 transition-colors group cursor-pointer"
                               
                            >
                               <td className="px-6 py-4">
                                    <div className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">{barangay.Name}</div>
                                </td>
                                <td className="px-6 py-4 text-center text-gray-600 font-mono text-sm">
                                    {barangay.Age}
                                </td>
                                <td className="px-6 py-4 text-center text-gray-600 font-mono text-sm">
                                    {barangay.Priority}
                                </td>
                                <td className="px-6 py-4 text-center text-gray-600 font-mono text-sm">
                                    {barangay.GpsLocation}
                                </td>
                                <td className="px-6 py-4 text-center text-gray-600 font-mono text-sm">
                                    {barangay.DailyStatus}
                                </td>
                                <td className="px-6 py-4 text-center text-gray-600 font-mono text-sm">
                                    {barangay.Notes}
                                </td>
                                <td className="px-6 py-4 text-center text-gray-600 font-mono text-sm">
                                    {barangay.RescueTeamAssigned}
                                </td>
                                <td className="px-6 py-4 text-center text-gray-600 font-mono text-sm">
                                    {barangay.TimeReported}
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
