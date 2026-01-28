
import React, { useState } from 'react';
import { Booking } from '../types';

interface AdminPanelProps {
  bookings: Booking[];
  onCancel: (id: string) => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ bookings, onCancel }) => {
  const [filterDate, setFilterDate] = useState(new Date().toISOString().split('T')[0]);

  const filtered = bookings.filter(b => b.date === filterDate);
  const rentalBookings = filtered.filter(b => b.type === 'rental');
  const maintenance = filtered.filter(b => b.type === 'maintenance');

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 space-y-12">
      <section className="flex flex-col md:flex-row items-end justify-between gap-8">
        <div className="space-y-2">
            <h2 className="text-5xl font-heading font-black uppercase tracking-tighter">Command Center</h2>
            <p className="text-red-500 text-xs font-black uppercase tracking-[0.3em]">Master Schedule Override</p>
        </div>
        <div className="bg-white/5 border border-white/10 p-6 rounded-2xl flex items-center space-x-6">
            <div className="space-y-1">
                <span className="block text-[10px] font-black uppercase text-gray-500">Master Filter</span>
                <input 
                    type="date" 
                    value={filterDate}
                    onChange={(e) => setFilterDate(e.target.value)}
                    className="bg-navy border border-white/10 rounded px-4 py-2 text-white outline-none focus:border-red-500 transition-all font-scoreboard text-lg"
                />
            </div>
            <div className="h-12 w-px bg-white/10"></div>
            <div className="flex space-x-6">
                <div className="text-center">
                    <span className="block text-2xl font-scoreboard text-white">{rentalBookings.length}</span>
                    <span className="text-[10px] font-bold uppercase text-gray-500">Rentals</span>
                </div>
                <div className="text-center">
                    <span className="block text-2xl font-scoreboard text-red-500">{maintenance.length}</span>
                    <span className="text-[10px] font-bold uppercase text-gray-500">Blocks</span>
                </div>
            </div>
        </div>
      </section>

      <div className="grid grid-cols-1 gap-8">
        <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden backdrop-blur-md">
            <div className="p-8 border-b border-white/10 flex items-center justify-between">
                <h3 className="text-xl font-heading font-black uppercase tracking-widest">Active Roster — {filterDate}</h3>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-white/[0.02] border-b border-white/10">
                        <tr>
                            <th className="p-6 text-[10px] font-black uppercase tracking-widest text-gray-500">Player / Purpose</th>
                            <th className="p-6 text-[10px] font-black uppercase tracking-widest text-gray-500">Lane</th>
                            <th className="p-6 text-[10px] font-black uppercase tracking-widest text-gray-500">Start Time</th>
                            <th className="p-6 text-[10px] font-black uppercase tracking-widest text-gray-500">Type</th>
                            <th className="p-6 text-[10px] font-black uppercase tracking-widest text-gray-500">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {filtered.length > 0 ? filtered.sort((a,b) => a.startTime.localeCompare(b.startTime)).map(booking => (
                            <tr key={booking.id} className="hover:bg-white/[0.02] transition-colors">
                                <td className="p-6">
                                    <div className="flex items-center space-x-4">
                                        <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center font-bold text-xs">
                                            {booking.userName.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="font-bold text-sm text-white">{booking.userName}</p>
                                            <p className="text-[10px] text-gray-500 uppercase tracking-widest">ID: {booking.id}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-6 font-scoreboard text-lg text-neon">{booking.laneId === 'full' ? 'FULL' : `LANE ${booking.laneId}`}</td>
                                <td className="p-6 font-scoreboard text-lg text-white">{booking.startTime}</td>
                                <td className="p-6">
                                    <span className={`px-3 py-1 rounded text-[10px] font-black uppercase tracking-widest border ${booking.type === 'maintenance' ? 'bg-red-500/10 border-red-500/30 text-red-500' : 'bg-turf/10 border-turf/30 text-turf'}`}>
                                        {booking.type}
                                    </span>
                                </td>
                                <td className="p-6">
                                    <button 
                                        onClick={() => onCancel(booking.id)}
                                        className="text-gray-500 hover:text-red-500 transition-colors uppercase font-black text-[10px] tracking-widest p-2 hover:bg-red-500/10 rounded"
                                    >
                                        Force Evict
                                    </button>
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan={5} className="p-20 text-center text-gray-500 uppercase font-bold text-xs tracking-[0.4em]">No activity detected on this date.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
