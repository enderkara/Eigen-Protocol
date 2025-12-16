import React from 'react';
import { PolymathResponse } from '../types';
import { Users, Sparkles, User } from 'lucide-react';

interface PolymathCardProps {
  data: PolymathResponse;
}

const PolymathCard: React.FC<PolymathCardProps> = ({ data }) => {
  const matchPercentage = Math.round(data.match_score * 100);
  
  // Dynamic styling
  const scoreColor = matchPercentage > 85 ? 'text-amber-400' : matchPercentage > 60 ? 'text-orange-400' : 'text-zinc-500';
  const barColor = matchPercentage > 85 ? 'bg-amber-500' : matchPercentage > 60 ? 'bg-orange-500' : 'bg-zinc-500';

  return (
    <div className="w-full max-w-4xl mx-auto bg-zinc-900/80 backdrop-blur-md border border-zinc-800 rounded-xl overflow-hidden shadow-2xl animate-fade-in-up">
      <div className="p-8 space-y-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-zinc-800 pb-6 gap-6">
           <div>
              <h2 className="text-sm font-mono text-amber-500/80 uppercase tracking-widest mb-1">Polymath Profile</h2>
              <h1 className="text-3xl font-serif text-white font-bold leading-tight">
                {data.shared_archetype}
              </h1>
           </div>
           
           <div className="flex flex-col items-end min-w-[120px]">
             <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-1">Synergy</span>
             <div className={`text-4xl font-mono font-bold ${scoreColor}`}>
               {matchPercentage}%
             </div>
           </div>
        </div>

        {/* Archetypes Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* User A */}
          <div className="bg-zinc-950/40 rounded-lg p-6 border border-zinc-800/50 flex flex-col items-center text-center space-y-3">
             <div className="p-3 bg-zinc-900 rounded-full">
               <User className="w-5 h-5 text-zinc-400" />
             </div>
             <div>
                <span className="text-xs font-mono text-zinc-500 uppercase">User A Persona</span>
                <h3 className="text-lg font-serif text-zinc-200 mt-1">{data.user_a_archetype}</h3>
             </div>
          </div>

          {/* Connection */}
          <div className="bg-gradient-to-b from-amber-900/10 to-zinc-900/10 rounded-lg p-6 border border-amber-500/20 flex flex-col items-center text-center space-y-3 relative overflow-hidden">
             <div className="absolute inset-0 bg-amber-500/5 blur-xl"></div>
             <div className="p-3 bg-amber-900/20 rounded-full border border-amber-500/30 relative z-10">
               <Sparkles className="w-6 h-6 text-amber-400" />
             </div>
             <div className="relative z-10">
                <span className="text-xs font-mono text-amber-500 uppercase">The Meta-Connection</span>
                <h3 className="text-xl font-serif text-white mt-1 font-bold">{data.shared_archetype}</h3>
             </div>
          </div>

           {/* User B */}
           <div className="bg-zinc-950/40 rounded-lg p-6 border border-zinc-800/50 flex flex-col items-center text-center space-y-3">
             <div className="p-3 bg-zinc-900 rounded-full">
               <User className="w-5 h-5 text-zinc-400" />
             </div>
             <div>
                <span className="text-xs font-mono text-zinc-500 uppercase">User B Persona</span>
                <h3 className="text-lg font-serif text-zinc-200 mt-1">{data.user_b_archetype}</h3>
             </div>
          </div>
        </div>

        {/* Deep Dive Section */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 pt-4">
           <div className="lg:col-span-3 space-y-4">
              <h3 className="text-xs font-mono text-zinc-500 uppercase tracking-widest">Psychological Synthesis</h3>
              <p className="text-lg text-zinc-300 font-light leading-relaxed">
                {data.insight}
              </p>
              
              <div className="pt-4 flex items-center gap-3">
                 <span className="text-xs font-mono text-zinc-600">ALIGNMENT</span>
                 <div className="flex-1 h-1 bg-zinc-800 rounded-full overflow-hidden">
                    <div className={`h-full ${barColor}`} style={{ width: `${matchPercentage}%` }}></div>
                 </div>
              </div>
           </div>

           <div className="lg:col-span-2 bg-zinc-950 rounded-xl p-6 border border-zinc-800 relative">
              <div className="absolute -top-3 -right-3">
                 <Users className="w-12 h-12 text-zinc-800/50" />
              </div>
              <h3 className="text-xs font-mono text-amber-500 uppercase tracking-widest mb-3">Icebreaker</h3>
              <p className="text-lg font-serif italic text-white leading-snug">
                 "{data.icebreaker}"
              </p>
           </div>
        </div>

      </div>
    </div>
  );
};

export default PolymathCard;
