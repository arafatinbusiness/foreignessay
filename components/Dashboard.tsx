
import React from 'react';
import { User, Booking } from '../types';

interface DashboardProps {
  user: User;
  bookings: Booking[];
  onCancel: (id: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, bookings, onCancel }) => {
  const userBookings = bookings.filter(b => b.userId === user.id && b.type === 'rental');
  const totalHours = (userBookings.length * 30) / 60;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 space-y-12">
      <div className="flex flex-col md:flex-row gap-12">
        {/* Profile Card */}
        <aside className="w-full md:w-96 space-y-8">
          <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-10 text-center space-y-6 backdrop-blur-xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-neon/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative inline-block">
              <img src={`https://picsum.photos/seed/${user.id}/200/200`} className="w-40 h-40 rounded-full border-4 border-neon shadow-[0_0_30px_-10px_#CCFF00] mx-auto object-cover" alt="Avatar" />
              <div className="absolute bottom-2 right-2 bg-navy text-neon rounded-full p-3 border-4 border-navy shadow-lg">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path></svg>
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-black font-heading uppercase tracking-tighter text-white italic">{user.name}</h2>
              <p className="text-gray-500 font-bold uppercase tracking-widest text-xs mt-1">{user.email}</p>
            </div>
            <div className="flex justify-center items-center space-x-3 bg-neon/10 text-neon px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.3em] border border-neon/20 mx-auto w-fit">
              <span className="w-2 h-2 bg-neon rounded-full animate-pulse shadow-[0_0_8px_#CCFF00]"></span>
              <span>Elite Prospect</span>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-10 space-y-6">
            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-gray-500 mb-2">Metrics Snapshot</h3>
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center p-6 bg-navy rounded-3xl border border-white/10 group hover:border-neon/40 transition-colors">
                <span className="block text-4xl font-scoreboard text-neon mb-1">{user.visitsThisMonth}</span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Attendance</span>
              </div>
              <div className="text-center p-6 bg-navy rounded-3xl border border-white/10 group hover:border-neon/40 transition-colors">
                <span className="block text-4xl font-scoreboard text-neon mb-1">{totalHours}h</span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Live Swings</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <section className="flex-grow space-y-10">
          <div className="bg-white/5 border border-white/10 rounded-[2.5rem] overflow-hidden backdrop-blur-md">
            <div className="p-10 border-b border-white/10 flex items-center justify-between bg-white/[0.01]">
              <div className="space-y-1">
                <h3 className="text-3xl font-heading font-black uppercase tracking-tighter text-white">Upcoming Session</h3>
                <p className="text-neon text-[10px] font-black uppercase tracking-[0.4em]">Real-Time Confirmation</p>
              </div>
            </div>

            <div className="divide-y divide-white/5">
              {userBookings.length > 0 ? userBookings.map((booking) => (
                <div key={booking.id} className="p-8 flex items-center justify-between hover:bg-white/[0.03] transition-all group">
                  <div className="flex items-center space-x-10">
                    <div className="w-16 h-16 bg-turf/10 rounded-2xl flex flex-col items-center justify-center border border-turf/30 group-hover:border-neon/50 transition-colors">
                       <span className="text-[10px] font-black uppercase text-turf tracking-widest mb-1 group-hover:text-neon">Slot</span>
                       <span className="text-2xl font-scoreboard font-bold text-white tracking-tighter leading-none">{booking.laneId === 'full' ? 'F' : booking.laneId}</span>
                    </div>
                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.3em] text-gray-500 mb-1">{booking.date}</p>
                      <p className="text-3xl font-scoreboard text-neon tracking-tighter leading-none">{booking.startTime} <span className="text-sm font-normal text-gray-500 tracking-normal font-sans ml-2">({booking.duration}m)</span></p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-6">
                    <span className="px-5 py-2 bg-turf/10 border border-turf/30 rounded-lg text-[10px] font-black uppercase tracking-widest text-turf">Verified</span>
                    <button 
                      onClick={() => onCancel(booking.id)}
                      className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-gray-500 hover:text-red-500 hover:bg-red-500/10 transition-all"
                    >
                       <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                    </button>
                  </div>
                </div>
              )) : (
                <div className="p-32 text-center space-y-6">
                  <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto ring-1 ring-white/10 ring-offset-4 ring-offset-navy">
                    <svg className="w-12 h-12 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  </div>
                  <div className="space-y-2">
                    <p className="text-gray-500 uppercase font-black text-xs tracking-[0.5em]">The field is empty</p>
                    <p className="text-gray-600 text-sm max-w-xs mx-auto">You have no scheduled batting practice sessions. The league waits for no one.</p>
                  </div>
                  <button className="bg-neon text-navy px-10 py-3 rounded-full uppercase font-black text-xs tracking-[0.2em] hover:scale-105 active:scale-95 transition-all shadow-xl">Secure A Lane</button>
                </div>
              )}
            </div>
          </div>

          {/* AI Tips */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-10 bg-gradient-to-br from-turf/20 to-transparent border border-turf/20 rounded-[2rem] relative overflow-hidden group">
               <div className="relative z-10 space-y-6">
                 <h4 className="text-xl font-black uppercase text-turf tracking-widest italic">Coach's Tape</h4>
                 <p className="text-lg text-gray-200 leading-relaxed font-light">"Your hand speed in Cage 1 is peaking at 0.12s. We noticed a slight drop in exit velocity during late-night sessions—hydration is key."</p>
                 <span className="inline-block text-[10px] font-black uppercase tracking-[0.4em] bg-turf px-4 py-2 rounded-full text-white shadow-lg">Scout Profile #882</span>
               </div>
               <div className="absolute -top-10 -right-10 p-4 opacity-[0.03] group-hover:rotate-45 transition-transform duration-1000">
                  <svg className="w-64 h-64" fill="currentColor" viewBox="0 0 24 24"><path d="M12,2L4.5,20.29L5.21,21L12,18L18.79,21L19.5,20.29L12,2Z"/></svg>
               </div>
            </div>
            <div className="p-10 bg-white/5 border border-white/10 rounded-[2rem] flex items-center space-x-8 hover:border-neon/30 transition-colors">
               <div className="w-24 h-24 bg-neon text-navy rounded-3xl flex items-center justify-center shrink-0 shadow-[0_0_30px_-5px_#CCFF00] rotate-3 group-hover:rotate-0 transition-transform">
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
               </div>
               <div className="space-y-1">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400">Monthly Target</h4>
                  <p className="text-4xl font-scoreboard text-neon leading-none tracking-tighter">5,000 Cuts</p>
                  <div className="w-48 h-2 bg-white/10 rounded-full mt-4 overflow-hidden">
                    <div className="w-[82%] h-full bg-gradient-to-r from-neon to-turf shadow-[0_0_10px_#CCFF00]"></div>
                  </div>
                  <p className="text-[10px] font-bold text-gray-600 pt-2">82% COMPLETE</p>
               </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
