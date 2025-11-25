
import { Umbrella, MapPin, CloudRain, AlertTriangle, X, User } from 'lucide-react';
import { Link } from 'react-router-dom';

interface SidebarProps {
    filter: string;
    setFilter: (filter: string) => void;
    highRiskCount: number;
    sidebarOpen: boolean;
    setSidebarOpen: (open: boolean) => void;
}

export default function Sidebar({ filter, setFilter, highRiskCount, sidebarOpen, setSidebarOpen }: SidebarProps) {
    return (
        <>
            <aside className="hidden md:flex flex-col w-64 bg-slate-900 text-white shadow-xl z-10">
                <div className="p-6 flex items-center gap-3 border-b border-slate-800">
                    <div className="bg-blue-600 p-2 rounded-lg">
                        <Umbrella className="h-6 w-6 text-white" />
                    </div>
                    <div>
                        <h1 className="font-bold text-lg tracking-tight">Woomera</h1>
                        <p className="text-xs text-slate-400">Platform</p>
                    </div>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    <Link to={"/admin"}
                        onClick={() => setFilter('All')}
                        className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg transition-all ${filter === 'All' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
                    >
                        <MapPin className="h-5 w-5" />
                        Risk Radar
                    </Link>
                    <Link to={"/admin"}
                        onClick={() => setFilter('High Risk')}
                        className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg transition-all ${filter === 'High Risk' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
                    >
                        <AlertTriangle className="h-5 w-5" />
                        High Risk Areas
                        {highRiskCount > 0 && <span className="ml-auto bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">{highRiskCount}</span>}
                    </Link>
                    <Link to={"/"}
                        onClick={() => setFilter('Resident')}
                        className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg transition-all ${filter === 'Resident' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
                    >
                        <User className="h-5 w-5" />
                        Track Safe
                    </Link>
                    <Link to={"/alert"}
                        onClick={() => setFilter('Alert')}
                        className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg transition-all ${filter === 'Alert' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
                    >
                        <MapPin className="h-5 w-5" />
                        Alert Hub
                    </Link>
                </nav>

                <div className="p-4 border-t border-slate-800">
                    <div className="bg-slate-800 rounded-xl p-4">
                        <p className="text-xs text-slate-400 mb-2">System Status</p>
                        <div className="flex items-center gap-2">
                            <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
                            <span className="text-sm font-medium text-white">Woomera</span>
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
                            <button onClick={() => { setFilter('All'); setSidebarOpen(false) }} className="block w-full text-left p-2 hover:bg-slate-800 rounded">Risk Radar</button>
                        
                            <button onClick={() => { setFilter('High Risk'); setSidebarOpen(false) }} className="block w-full text-left p-2 hover:bg-slate-800 rounded">High Risk Areas</button>
                        </nav>
                    </div>
                </div>
            )}
        </>
    );
}
