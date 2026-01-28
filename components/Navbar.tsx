
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { User } from '../types';

interface NavbarProps {
  user: User | null;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ user, onLogout }) => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-[60] bg-navy/80 backdrop-blur-xl border-b border-white/5 px-6 py-4 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-3 group">
          <div className="w-10 h-10 bg-neon rounded-full flex items-center justify-center group-hover:rotate-12 group-hover:scale-110 transition-all shadow-[0_0_20px_-5px_rgba(204,255,0,0.5)]">
            <svg className="w-6 h-6 text-navy" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12,2L4.5,20.29L5.21,21L12,18L18.79,21L19.5,20.29L12,2Z"/>
            </svg>
          </div>
          <span className="font-scoreboard text-2xl tracking-tighter uppercase font-bold text-white italic">
            Under <span className="text-neon">The Lights</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center space-x-10 font-heading font-black text-xs uppercase tracking-[0.2em]">
          <Link to="/book" className={`relative py-2 transition-colors ${isActive('/book') ? 'text-neon' : 'text-white hover:text-neon'}`}>
            Lanes
            {isActive('/book') && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-neon shadow-[0_0_10px_#CCFF00]"></span>}
          </Link>
          <Link to="/membership" className="text-white hover:text-neon transition-colors">Academy</Link>
          {user?.isAdmin && (
            <Link to="/admin" className={`relative py-2 transition-colors ${isActive('/admin') ? 'text-red-500' : 'text-white hover:text-red-500'}`}>
              Admin
              {isActive('/admin') && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-red-500 shadow-[0_0_10px_red]"></span>}
            </Link>
          )}
        </div>

        <div className="flex items-center space-x-4">
          {user ? (
            <div className="flex items-center space-x-6">
              <Link to="/dashboard" className="hidden sm:flex items-center space-x-3 bg-white/5 border border-white/10 rounded-full px-5 py-2 hover:bg-white/10 transition-all">
                <img src={`https://picsum.photos/seed/${user.id}/32/32`} className="w-7 h-7 rounded-full ring-2 ring-turf" alt="profile" />
                <span className="text-[10px] font-black uppercase tracking-widest">{user.name}</span>
              </Link>
              <button onClick={onLogout} className="text-gray-500 hover:text-white transition-colors text-[10px] uppercase font-black tracking-widest">Sign Out</button>
            </div>
          ) : (
            <Link to="/auth" className="bg-neon text-navy font-heading font-black px-8 py-3 rounded-sm hover:scale-105 transition-all active:scale-95 text-xs uppercase tracking-widest shadow-[0_0_20px_-10px_rgba(204,255,0,0.8)]">
              Player Entry
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
