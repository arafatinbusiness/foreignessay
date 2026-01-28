
import React, { useState } from 'react';
import { TIME_SLOTS, LANES } from '../constants';
import { Booking, User, BookingView, LaneId } from '../types';

interface BookingGridProps {
  user: User | null;
  bookings: Booking[];
  selectedDate: string;
  setSelectedDate: (date: string) => void;
  viewMode: BookingView;
  onSlotToggle: (laneId: LaneId, startTime: string) => void;
  onBlockSlot: (laneId: LaneId, startTime: string) => void;
}

const BookingGrid: React.FC<BookingGridProps> = ({ 
  user, 
  bookings, 
  selectedDate, 
  setSelectedDate, 
  viewMode, 
  onSlotToggle,
  onBlockSlot
}) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const isIndividual = viewMode === BookingView.INDIVIDUAL;

  const checkAvailability = (laneId: LaneId, time: string) => {
    if (laneId === 'full') {
        return bookings.find(b => b.startTime === time && b.date === selectedDate);
    }
    return bookings.find(b => (b.laneId === laneId || b.laneId === 'full') && b.startTime === time && b.date === selectedDate);
  };

  const myBookings = bookings.filter(b => b.userId === user?.id && b.date === selectedDate && b.type === 'rental');

  const handleFinalConfirm = () => {
    setShowConfirm(true);
    setTimeout(() => setShowConfirm(false), 3000);
  };

  return (
    <div className="space-y-6 pb-40">
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 bg-white/5 p-4 md:p-6 rounded-2xl border border-white/10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <span className="text-[10px] md:text-xs font-black uppercase tracking-widest text-gray-500">Target Date:</span>
            <input 
              type="date" 
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full sm:w-auto bg-navy border border-white/20 rounded-lg px-4 py-2 text-white font-scoreboard text-base md:text-lg outline-none focus:border-neon transition-all"
            />
        </div>
        <div className="grid grid-cols-2 sm:flex items-center gap-4 md:gap-6 text-[9px] md:text-[10px] font-black uppercase tracking-widest text-gray-400">
          <div className="flex items-center space-x-2"><div className="w-3 h-3 md:w-4 md:h-4 border border-white/20 rounded-sm"></div><span>Open</span></div>
          <div className="flex items-center space-x-2"><div className="w-3 h-3 md:w-4 md:h-4 bg-neon rounded-sm shadow-[0_0_10px_#CCFF00]"></div><span className="text-neon">Mine</span></div>
          <div className="flex items-center space-x-2"><div className="w-3 h-3 md:w-4 md:h-4 bg-white/10 rounded-sm overflow-hidden"><div className="w-full h-full bg-[linear-gradient(45deg,rgba(255,255,255,0.1)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.1)_50%,rgba(255,255,255,0.1)_75%,transparent_75%,transparent)] bg-[length:4px_4px]"></div></div><span>Full</span></div>
          <div className="flex items-center space-x-2"><div className="w-3 h-3 md:w-4 md:h-4 bg-red-500/20 border border-red-500/50 rounded-sm"></div><span>Block</span></div>
        </div>
      </div>

      <div className="relative overflow-x-auto rounded-2xl md:rounded-3xl border border-white/10 bg-black/40 backdrop-blur-sm shadow-2xl">
        <table className="w-full border-collapse min-w-[600px] md:min-w-0">
          <thead>
            <tr>
              <th className="sticky left-0 z-40 bg-navy/95 p-4 md:p-6 text-left border-b border-white/10 text-[10px] font-black uppercase text-gray-500 w-24 md:w-32 backdrop-blur-md">Timeline</th>
              {isIndividual ? LANES.map(lane => (
                <th key={lane} className="p-4 md:p-6 text-center border-b border-white/10 text-[10px] md:text-xs font-black uppercase tracking-[0.2em] md:tracking-[0.3em]">
                  Cage {lane}
                </th>
              )) : (
                <th className="p-4 md:p-6 text-center border-b border-white/10 text-[10px] md:text-xs font-black uppercase tracking-[0.3em]">
                  Full Facility Reservation
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {TIME_SLOTS.map(time => (
              <tr key={time} className="group hover:bg-white/[0.02] transition-colors">
                <td className="sticky left-0 z-40 bg-navy/95 p-4 md:p-6 border-r border-white/5 text-sm md:text-lg font-bold font-scoreboard text-gray-400 group-hover:text-white transition-colors">
                  {time}
                </td>
                {isIndividual ? LANES.map(lane => {
                  const booking = checkAvailability(lane, time);
                  const isMine = !!user && !!booking && booking.userId === user.id && booking.type === 'rental';
                  const isMaintenance = booking?.type === 'maintenance';
                  const isOccupied = !!booking && !isMine && !isMaintenance;
                  
                  return (
                    <td key={lane} className="p-1 md:p-1.5 border-r border-white/5 last:border-r-0">
                      <button
                        onContextMenu={(e) => {
                          e.preventDefault();
                          if (user?.isAdmin) onBlockSlot(lane, time);
                        }}
                        onClick={() => onSlotToggle(lane, time)}
                        className={`
                          w-full h-12 md:h-14 rounded-lg md:rounded-xl transition-all duration-300 flex flex-col items-center justify-center relative overflow-hidden group/btn
                          ${isMine ? 'bg-neon text-navy shadow-[0_0_20px_rgba(204,255,0,0.3)] scale-[0.98]' : ''}
                          ${isMaintenance ? 'bg-red-500/10 border border-red-500/30 cursor-not-allowed opacity-50' : ''}
                          ${isOccupied ? 'bg-white/[0.05] cursor-not-allowed' : ''}
                          ${!booking ? 'bg-white/[0.02] hover:bg-turf/20 hover:border-turf/40 border border-white/5' : ''}
                        `}
                      >
                        {isOccupied && (
                          <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.05)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.05)_50%,rgba(255,255,255,0.05)_75%,transparent_75%,transparent)] bg-[length:8px_8px] opacity-40"></div>
                        )}
                        
                        <div className="relative z-10 flex flex-col items-center">
                          {isMine ? (
                            <span className="text-[8px] md:text-[10px] font-black uppercase tracking-widest">Selected</span>
                          ) : isMaintenance ? (
                            <span className="text-[8px] md:text-[10px] font-black uppercase text-red-500">Maint</span>
                          ) : isOccupied ? (
                            <span className="text-[8px] md:text-[10px] font-bold text-gray-600 uppercase tracking-widest">Full</span>
                          ) : (
                            <div className="opacity-0 group-hover/btn:opacity-100 transition-opacity flex flex-col items-center">
                                <span className="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-neon">Book</span>
                            </div>
                          )}
                        </div>
                      </button>
                    </td>
                  );
                }) : (
                  <td className="p-1 md:p-1.5">
                    {(() => {
                      const booking = checkAvailability('full', time);
                      const isMine = !!user && !!booking && booking.userId === user.id && booking.type === 'rental';
                      const isBlocked = !!booking && !isMine;
                      return (
                        <button
                          onClick={() => onSlotToggle('full', time)}
                          className={`
                            w-full h-12 md:h-14 rounded-lg md:rounded-xl transition-all flex items-center justify-center relative overflow-hidden
                            ${isMine ? 'bg-neon text-navy shadow-neon shadow-lg' : isBlocked ? 'bg-white/10 cursor-not-allowed' : 'bg-white/[0.02] hover:bg-turf/30 border border-white/5'}
                          `}
                        >
                          {isBlocked && (
                             <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.05)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.05)_50%,rgba(255,255,255,0.05)_75%,transparent_75%,transparent)] bg-[length:8px_8px] opacity-40"></div>
                          )}
                          <span className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em] relative z-10">
                            {isMine ? 'FACILITY RESERVED' : isBlocked ? 'UNAVAILABLE' : 'RESERVE COMPLEX'}
                          </span>
                        </button>
                      );
                    })()}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Confirmation Animation Overlay */}
      {showConfirm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-navy/90 backdrop-blur-md animate-in fade-in duration-300">
          <div className="text-center space-y-4 scale-in-center animate-[bounce_1s_infinite]">
             <div className="w-32 h-32 bg-neon rounded-full flex items-center justify-center mx-auto shadow-[0_0_50px_#CCFF00]">
                <svg className="w-20 h-20 text-navy" fill="currentColor" viewBox="0 0 24 24"><path d="M12,2L4.5,20.29L5.21,21L12,18L18.79,21L19.5,20.29L12,2Z"/></svg>
             </div>
             <h2 className="text-5xl font-heading font-black uppercase tracking-tighter italic">LOCKED IN!</h2>
             <p className="text-neon uppercase font-bold tracking-[0.4em]">See you at the plate.</p>
          </div>
        </div>
      )}

      {/* Sticky Summary Bar */}
      {user && myBookings.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 flex justify-center animate-[slideUp_0.4s_ease-out]">
          <div className="max-w-4xl w-full bg-navy/95 backdrop-blur-2xl border border-white/20 p-4 md:p-6 rounded-2xl md:rounded-3xl shadow-2xl flex flex-col md:flex-row items-center justify-between gap-4 border-neon/30">
            <div className="flex items-center space-x-6 md:space-x-12">
               <div className="flex items-center space-x-3 md:space-x-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-neon rounded-full flex items-center justify-center text-navy shadow-[0_0_15px_#CCFF00]">
                    <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"></path></svg>
                  </div>
                  <div>
                    <p className="text-[8px] md:text-[10px] uppercase font-black text-gray-500 tracking-widest">Drafting</p>
                    <p className="text-base md:text-xl font-scoreboard text-white tracking-tighter">{myBookings.length} Active Slots</p>
                  </div>
               </div>
               <div className="hidden sm:block h-10 w-px bg-white/10"></div>
               <div className="hidden sm:block">
                 <p className="text-[8px] md:text-[10px] uppercase font-black text-gray-500 tracking-widest">Facility Total</p>
                 <p className="text-base md:text-xl font-scoreboard text-neon tracking-tighter">${viewMode === 'full_facility' ? myBookings.length * 75 : myBookings.length * 15}.00</p>
               </div>
            </div>
            <button 
              onClick={handleFinalConfirm}
              className="w-full md:w-auto bg-neon text-navy px-8 md:px-12 py-3 md:py-4 rounded-xl font-heading font-black uppercase text-xs md:text-sm tracking-[0.2em] hover:scale-105 active:scale-95 transition-all shadow-neon"
            >
              Confirm Squad Session
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes slideUp {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default BookingGrid;
