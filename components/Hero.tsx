
import React from 'react';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
  return (
    <div className="relative h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Image with Heavy Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1544040161-0077c44e9950?q=80&w=2000&auto=format&fit=crop" 
          className="w-full h-full object-cover scale-105 animate-[pulse_10s_ease-in-out_infinite]" 
          alt="Stadium lights"
        />
        {/* Dark Vignettes */}
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/60 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-navy/40 to-transparent"></div>
        <div className="absolute inset-0 shadow-[inset_0_0_300px_rgba(11,19,43,1)]"></div>
      </div>

      <div className="relative z-10 text-center space-y-10 px-4 max-w-5xl">
        <div className="inline-block px-6 py-2 bg-turf/20 backdrop-blur-md border border-turf/40 text-neon rounded-full text-[10px] font-black uppercase tracking-[0.4em] mb-4 animate-bounce">
          Est. 2024 • Pro Performance Center
        </div>
        <h1 className="text-7xl md:text-9xl font-heading font-black uppercase leading-[0.85] tracking-tighter italic">
          Master <br /> 
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon via-snow to-neon shadow-neon-text">The Plate.</span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-400 font-light max-w-2xl mx-auto tracking-wide leading-relaxed">
          High-intensity batting cages. Real-time scheduling. <br />
          <span className="text-white font-bold italic">No upfront payment required.</span>
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-6">
          <Link to="/book" className="w-full sm:w-auto px-16 py-5 bg-neon text-navy font-heading font-black text-xl uppercase tracking-widest hover:bg-white hover:scale-110 transition-all transform shadow-[0_0_40px_-10px_rgba(204,255,0,0.6)]">
            Hit Away
          </Link>
          <Link to="/membership" className="w-full sm:w-auto px-16 py-5 border-2 border-white/10 hover:border-neon text-white font-heading font-black text-xl uppercase tracking-widest transition-all hover:bg-white/5">
            Academy
          </Link>
        </div>
      </div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-3 opacity-30">
        <span className="text-[10px] uppercase font-black tracking-[0.3em]">Scout Below</span>
        <div className="w-px h-16 bg-gradient-to-b from-neon to-transparent"></div>
      </div>
    </div>
  );
};

export default Hero;
