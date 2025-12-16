import React from 'react';
import { EigenResponse } from '../types';

interface BridgeCardProps {
  result: EigenResponse;
}

const BridgeCard: React.FC<BridgeCardProps> = ({ result }) => {
  // Color mapping based on the new tiered scoring system
  let scoreColor = "text-red-400";
  let barColor = "bg-red-500";
  let tierName = "TRIVIAL CONNECTION";

  if (result.resonanceScore >= 0.9) {
    scoreColor = "text-emerald-400";
    barColor = "bg-emerald-500";
    tierName = "ISOMORPHIC MIRACLE";
  } else if (result.resonanceScore >= 0.7) {
    scoreColor = "text-violet-400";
    barColor = "bg-violet-500";
    tierName = "DEEP RESONANCE";
  } else if (result.resonanceScore >= 0.4) {
    scoreColor = "text-amber-400";
    barColor = "bg-amber-500";
    tierName = "COMMONPLACE LINK";
  } else {
    // Keep defaults for < 0.4
    tierName = "WEAK CORRELATION";
  }

  return (
    <div className="w-full bg-zinc-900/80 backdrop-blur-md border border-zinc-800 rounded-xl p-6 md:p-8 shadow-2xl animate-fade-in-up">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 border-b border-zinc-800 pb-6">
        <div>
          <h2 className={`text-sm font-mono tracking-wider mb-1 uppercase ${scoreColor.replace('text-', 'text-opacity-80 text-')}`}>
            {tierName}
          </h2>
          <h1 className="text-2xl md:text-4xl font-serif text-white leading-tight italic">
            "{result.bridgeTitle}"
          </h1>
        </div>
        <div className="mt-4 md:mt-0 flex flex-col items-end">
          <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">Resonance Score</span>
          <div className={`text-4xl md:text-5xl font-mono font-bold ${scoreColor}`}>
            {result.resonanceScore.toFixed(2)}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div>
            <h3 className="text-xs font-mono text-violet-400 uppercase tracking-widest mb-2">Underlying Mechanism</h3>
            <p className="text-xl text-white font-serif">{result.mechanism}</p>
          </div>
          
          <div>
            <h3 className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-2">Philosophical Treatise</h3>
            <p className="text-zinc-300 leading-relaxed font-light text-lg">
              {result.explanation}
            </p>
          </div>
        </div>

        <div className="bg-zinc-950/50 rounded-lg p-6 border border-zinc-800/50">
          <h3 className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-4">Structural Alignment</h3>
          
          <div className="space-y-4">
             <div className="flex items-center gap-3">
                 <div className="w-24 text-right text-xs text-sky-400 font-mono">Domain A</div>
                 <div className="flex-1 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                    <div className="h-full bg-sky-500/50 w-full animate-pulse"></div>
                 </div>
             </div>
             
             <div className="flex items-center gap-3">
                 <div className="w-24 text-right text-xs text-pink-400 font-mono">Domain B</div>
                 <div className="flex-1 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                    <div className="h-full bg-pink-500/50 w-full animate-pulse"></div>
                 </div>
             </div>
             
             <div className="flex items-center gap-3">
                 <div className="w-24 text-right text-xs text-violet-400 font-mono">Resonance</div>
                 <div className="flex-1 h-2 bg-zinc-800 rounded-full overflow-hidden">
                    <div className={`h-full ${barColor} transition-all duration-1000 ease-out`} style={{ width: `${result.resonanceScore * 100}%` }}></div>
                 </div>
             </div>
          </div>

          <div className="mt-8 pt-6 border-t border-zinc-800">
             <h4 className="text-xs font-mono text-zinc-600 mb-2">SHARED CONCEPTS</h4>
             <div className="flex flex-wrap gap-2">
                {result.sharedConcepts.map((c, i) => (
                    <span key={i} className="px-2 py-1 rounded bg-violet-500/10 text-violet-300 text-xs border border-violet-500/20">
                        {c}
                    </span>
                ))}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BridgeCard;
