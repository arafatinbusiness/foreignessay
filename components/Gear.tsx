
import React from 'react';

const Gear: React.FC = () => {
  const items = [
    { name: 'Lights-Out Hoodie', price: '65', image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=400&auto=format&fit=crop' },
    { name: 'Pro-Curve Snapback', price: '35', image: 'https://images.unsplash.com/photo-1588850561447-417f33194208?q=80&w=400&auto=format&fit=crop' },
    { name: 'Midnight Cage Jersey', price: '85', image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=400&auto=format&fit=crop' },
    { name: 'Slugger Compression Leg', price: '45', image: 'https://images.unsplash.com/photo-1539185441755-769473a23570?q=80&w=400&auto=format&fit=crop' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 space-y-16">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="space-y-4">
          <h2 className="text-6xl font-heading font-black uppercase tracking-tighter italic">Locker Room</h2>
          <p className="text-neon font-bold uppercase tracking-[0.4em] text-xs">Official Foreign Essay Performance Gear.</p>
        </div>
        <div className="flex space-x-4">
           <button className="px-6 py-2 bg-white/10 text-white rounded-full text-xs font-black uppercase border border-white/10 hover:border-neon transition-colors">Apparel</button>
           <button className="px-6 py-2 bg-white/10 text-white rounded-full text-xs font-black uppercase border border-white/10 hover:border-neon transition-colors">Training Aids</button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {items.map((item) => (
          <div key={item.name} className="group cursor-pointer">
            <div className="aspect-[3/4] rounded-[2rem] overflow-hidden relative mb-6">
              <img src={item.image} alt={item.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700" />
              <div className="absolute inset-0 bg-navy/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                 <button className="bg-neon text-navy px-8 py-3 rounded-full font-black uppercase text-xs tracking-widest shadow-2xl scale-90 group-hover:scale-100 transition-transform">Add to Bag</button>
              </div>
            </div>
            <div className="flex justify-between items-start">
               <div>
                  <h4 className="font-heading font-black uppercase tracking-tighter text-lg">{item.name}</h4>
                  <p className="text-gray-500 font-bold uppercase text-[10px] tracking-widest">Performance Series</p>
               </div>
               <span className="text-2xl font-scoreboard text-neon">${item.price}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gear;
