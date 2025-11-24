
import { Menu, Search, Bell } from 'lucide-react';
import type { Notification } from '../types';

interface HeaderProps {
    setSidebarOpen: (open: boolean) => void;
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    notifications: Notification[];
}

export default function Header({ setSidebarOpen, searchTerm, setSearchTerm, notifications }: HeaderProps) {
    return (
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
                        value={searchTerm}
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
    );
}
