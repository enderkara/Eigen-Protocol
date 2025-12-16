import React from 'react';
import { FidelityResponse } from '../types';
import { ShieldCheck, ShieldAlert, ShieldX } from 'lucide-react';

interface FidelityCardProps {
  data: FidelityResponse;
}

const FidelityCard: React.FC<FidelityCardProps> = ({ data }) => {
  let color = "text-zinc-500";
  let bg = "bg-zinc-500";
  let Icon = ShieldX;

  if (data.classification === 'SIGNAL') {
    color = "text-emerald-400";
    bg = "bg-emerald-500";
    Icon = ShieldCheck;
  } else if (data.classification === 'MIMICRY') {
    color = "text-amber-400";
    bg = "bg-amber-500";
    Icon = ShieldAlert;
  } else {
    color = "text-red-400";
    bg = "bg-red-500";
    Icon = ShieldX;
  }

  return (
    <div className="w-full max-w-2xl mx-auto bg-zinc-900/80 backdrop-blur-md border border-zinc-800 rounded-xl overflow-hidden shadow-2xl animate-fade-in-up">
      <div className="p-8 space-y-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
           <div className="flex items-center gap-4">
              <div className={`p-4 rounded-full ${bg} bg-opacity-10 border border-${bg}/20`}>
                 <Icon className={`w-8 h-8 ${color}`} />
              </div>
              <div>
                 <h2 className="text-sm font-mono text-zinc-500 uppercase tracking-widest">Signal Classification</h2>
                 <div className={`text-3xl font-serif font-bold ${color} tracking-wide`}>
                    {data.classification}
                 </div>
              </div>
           </div>

           <div className="flex flex-col items-end">
              <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">Fidelity Index</span>
              <div className="font-mono text-4xl text-white font-bold">
                {data.fidelity_score.toFixed(2)}
              </div>
           </div>
        </div>

        {/* Meter Visual */}
        <div className="relative h-4 bg-zinc-900 rounded-full border border-zinc-800 overflow-hidden">
           <div className="absolute inset-0 flex">
              <div className="w-1/3 h-full border-r border-zinc-800/50 bg-red-900/10"></div>
              <div className="w-1/3 h-full border-r border-zinc-800/50 bg-amber-900/10"></div>
              <div className="w-1/3 h-full bg-emerald-900/10"></div>
           </div>
           <div 
             className={`absolute top-0 bottom-0 left-0 ${bg} transition-all duration-1000 ease-out shadow-[0_0_15px_rgba(0,0,0,0.5)]`}
             style={{ width: `${data.fidelity_score * 100}%` }}
           >
             <div className="absolute right-0 top-0 bottom-0 w-[2px] bg-white/50"></div>
           </div>
        </div>

        <div className="pt-6 border-t border-zinc-800/50">
           <h3 className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-3">Gatekeeper Critique</h3>
           <p className="text-lg text-zinc-300 font-light leading-relaxed italic">
             "{data.critique}"
           </p>
        </div>
      </div>
    </div>
  );
};

export default FidelityCard;
