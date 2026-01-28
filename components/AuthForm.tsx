
import React, { useState } from 'react';
import { User } from '../types';

interface AuthFormProps {
  onLogin: (user: User) => void;
}

const AuthForm: React.FC<AuthFormProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const user: User = {
      id: Math.random().toString(36).substr(2, 9),
      name: isLogin ? (formData.email.split('@')[0] || 'Player') : formData.name,
      email: formData.email,
      visitsThisMonth: 4,
      isAdmin: isAdmin
    };
    onLogin(user);
  };

  return (
    <div className="max-w-xl mx-auto my-16 px-6">
      <div className="bg-white/5 border border-white/10 p-12 rounded-[3rem] space-y-10 backdrop-blur-2xl shadow-2xl relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-tr from-neon/5 to-transparent pointer-events-none"></div>
        <div className="text-center space-y-4 relative z-10">
          <h2 className="text-5xl font-heading font-black uppercase tracking-tighter italic">
            {isLogin ? 'Player Entry' : 'Draft Entry'}
          </h2>
          <p className="text-gray-500 text-xs font-black uppercase tracking-[0.4em] max-w-xs mx-auto">
            {isLogin ? 'Enter the facility' : 'Create your pro player profile'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
          {!isLogin && (
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 px-2">Player Handle</label>
              <input 
                required
                type="text" 
                placeholder="ELITE_SLUGGER"
                className="w-full bg-navy border border-white/10 p-5 rounded-2xl text-white outline-none focus:border-neon focus:ring-4 focus:ring-neon/10 transition-all font-scoreboard text-xl tracking-wider placeholder:text-gray-700"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
          )}
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 px-2">Comms Address</label>
            <input 
              required
              type="email" 
              placeholder="PLAYER@THELIGHTS.COM"
              className="w-full bg-navy border border-white/10 p-5 rounded-2xl text-white outline-none focus:border-neon focus:ring-4 focus:ring-neon/10 transition-all font-scoreboard text-xl tracking-wider placeholder:text-gray-700"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 px-2">Secure Key</label>
            <input 
              required
              type="password" 
              placeholder="••••••••"
              className="w-full bg-navy border border-white/10 p-5 rounded-2xl text-white outline-none focus:border-neon focus:ring-4 focus:ring-neon/10 transition-all font-scoreboard text-xl tracking-wider"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
          </div>

          <div className="flex items-center space-x-3 px-2">
            <input 
              type="checkbox" 
              id="admin-check"
              checked={isAdmin}
              onChange={(e) => setIsAdmin(e.target.checked)}
              className="w-5 h-5 accent-neon bg-navy border-white/10 rounded"
            />
            <label htmlFor="admin-check" className="text-[10px] font-black uppercase tracking-widest text-gray-400 cursor-pointer">Register as Facility Admin</label>
          </div>

          <button type="submit" className="w-full bg-neon text-navy py-6 rounded-2xl font-heading font-black text-xl uppercase tracking-[0.2em] hover:scale-[1.03] active:scale-[0.98] transition-all shadow-[0_15px_40px_-15px_rgba(204,255,0,0.6)] group/btn">
            {isLogin ? 'Authorize Entry' : 'Finalize Draft'}
          </button>
        </form>

        <div className="text-center pt-8 border-t border-white/10 relative z-10">
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 hover:text-neon transition-colors"
          >
            {isLogin ? "New to the league? Draft Now" : "Already registered? Login"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
