
import React from 'react';
import { Link } from 'react-router-dom';

const Membership: React.FC = () => {
  const tiers = [
    { name: 'Rookie', price: '49', features: ['5 Monthly Sessions', '1 Guest Pass', 'Member Apparel Discount'] },
    { name: 'Prospect', price: '99', features: ['15 Monthly Sessions', 'Video Analysis (Basic)', 'Priority Booking', '3 Guest Passes'], recommended: true },
    { name: 'Hall of Fame', price: '199', features: ['Unlimited Access', 'Pro-Scout Video Review', 'Private Locker', 'Early Facility Access'] },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 space-y-16">
      <div className="text-center space-y-4">
        <h2 className="text-5xl font-heading font-black uppercase tracking-tighter italic">Player Tiers</h2>
        <p className="text-gray-500 font-bold uppercase tracking-[0.4em] text-xs">Commit to the grind. Level up your game.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {tiers.map((tier) => (
          <div key={tier.name} className={`relative p-8 md:p-12 rounded-[2.5rem] border transition-all hover:-translate-y-2 ${tier.recommended ? 'bg-neon text-navy border-neon shadow-[0_30px_60px_-15px_rgba(204,255,0,0.3)]' : 'bg-white/5 border-white/10 text-white'}`}>
            {tier.recommended && <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-navy text-white text-[10px] font-black px-6 py-2 rounded-full uppercase tracking-widest shadow-xl">Most Drafted</span>}
            <h3 className="text-3xl font-heading font-black uppercase tracking-tighter mb-2 italic">{tier.name}</h3>
            <div className="flex items-baseline mb-8">
              <span className="text-5xl font-scoreboard font-bold">${tier.price}</span>
              <span className={`text-sm font-bold ml-2 ${tier.recommended ? 'text-navy/60' : 'text-gray-500'}`}>/MO</span>
            </div>
            <ul className="space-y-4 mb-10">
              {tier.features.map(f => (
                <li key={f} className="flex items-center space-x-3 text-sm font-bold">
                  <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <button className={`w-full py-4 rounded-2xl font-black uppercase tracking-[0.2em] transition-all ${tier.recommended ? 'bg-navy text-white shadow-xl' : 'bg-neon text-navy'}`}>
              Draft Me
            </button>
          </div>
        ))}
      </div>

      <div className="bg-white/5 border border-white/10 p-12 rounded-[3rem] text-center space-y-6">
        <h3 className="text-2xl font-black uppercase tracking-widest italic">Team Rentals</h3>
        <p className="text-gray-400 max-w-2xl mx-auto">Need the whole facility for your travel team? We offer customized seasonal packages starting at $450/month.</p>
        <Link to="/book" className="inline-block text-neon border-b-2 border-neon font-black uppercase text-sm pb-1 hover:text-white hover:border-white transition-all">Contact Facility Manager</Link>
      </div>
    </div>
  );
};

export default Membership;
