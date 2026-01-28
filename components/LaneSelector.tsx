
import React from 'react';
import { Booking, BookingView } from '../types';

interface LaneSelectorProps {
  viewMode: BookingView;
  setViewMode: (mode: BookingView) => void;
  bookings: Booking[];
  selectedDate: string;
}

const LaneSelector: React.FC<LaneSelectorProps> = ({ viewMode, setViewMode, bookings, selectedDate }) => {
  const isIndividual = viewMode === BookingView.INDIVIDUAL;

  const getLaneStatus = (laneId: number) => {
    // Basic occupancy check for the current hour (simulated)
    const currentHour = new Date().getHours() + ':00';
    return bookings.some(b => b.laneId === laneId && b.startTime === currentHour && b.date === selectedDate);
  };

  return (
    <div className="space-y-8">
      {/* Toggle */}
      <div className="flex items-center justify-center">
        <div className="p-1 bg-white/5 border border-white/10 rounded-full flex">
          <button 
            onClick={() => setViewMode(BookingView.INDIVIDUAL)}
            className={`px-8 py-2 rounded-full text-xs font-black uppercase transition-all ${isIndividual ? 'bg-neon text-navy shadow-lg' : 'text-gray-500 hover:text-white'}`}
          >
            Individual Lanes
          </button>
          <button 
            onClick={() => setViewMode(BookingView.FULL_FACILITY)}
            className={`px-8 py-2 rounded-full text-xs font-black uppercase transition-all ${!isIndividual ? 'bg-neon text-navy shadow-lg' : 'text-gray-500 hover:text-white'}`}
          >
            Full Facility
          </button>
        </div>
      </div>

      {/* Cards Container */}
      <div className={`relative flex flex-col md:flex-row gap-6 transition-all duration-700 ${!isIndividual ? 'max-w-3xl mx-auto' : ''}`}>
        {[1, 2, 3].map((laneId) => {
          const isOccupied = getLaneStatus(laneId);
          
          return (
            <div 
              key={laneId}
              className={`
                flex-1 relative overflow-hidden rounded-xl border-2 p-8 transition-all duration-500
                ${isIndividual ? 'translate-x-0 opacity-100 scale-100' : 'translate-x-0 opacity-100 scale-105 z-10'}
                ${!isIndividual && laneId !== 2 ? 'hidden md:block pointer-events-none grayscale opacity-30 blur-[2px] scale-90' : ''}
                ${isIndividual ? (isOccupied ? 'border-red-500/50 bg-red-500/5' : 'border-turf/50 bg-turf/5') : 'border-neon/50 bg-neon/5'}
              `}
            >
              <div className="flex flex-col h-full space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-scoreboard text-4xl uppercase tracking-tighter">
                      {viewMode === BookingView.FULL_FACILITY ? 'Full Facility' : `Lane ${laneId}`}
                    </h3>
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mt-1">
                      {viewMode === BookingView.FULL_FACILITY ? 'All 3 Cages + Lounge' : 'Hit Away 70 Pro Series'}
                    </p>
                  </div>
                  {isIndividual && (
                    <div className="flex items-center space-x-2">
                      <div className={`w-3 h-3 rounded-full ${isOccupied ? 'bg-red-500' : 'bg-green-500'} animate-pulse-fast`}></div>
                      <span className={`text-[10px] font-black uppercase ${isOccupied ? 'text-red-500' : 'text-green-500'}`}>
                        {isOccupied ? 'Occupied' : 'Live'}
                      </span>
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-white/10 mt-auto">
                  <div className="flex justify-between items-end">
                    <div>
                      <span className="block text-[10px] uppercase font-bold text-gray-400">Rate</span>
                      <span className="text-2xl font-black">${viewMode === BookingView.FULL_FACILITY ? '150' : '30'}<span className="text-xs font-normal text-gray-500">/hr</span></span>
                    </div>
                    <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center opacity-30">
                       <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LaneSelector;
