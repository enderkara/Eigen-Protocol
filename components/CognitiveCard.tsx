import React from 'react';
import { CognitiveResponse } from '../types';
import { Brain, MessageSquareQuote, Network } from 'lucide-react';

interface CognitiveCardProps {
  data: CognitiveResponse;
}

const CognitiveCard: React.FC<CognitiveCardProps> = ({ data }) => {
  const matchPercentage = Math.round(data.match_strength * 100);
  
  // Dynamic styling based on strength
  const highlightColor = matchPercentage > 80 ? 'text-cyan-400' : matchPercentage > 50 ? 'text-blue-400' : 'text-zinc-400';
  const barColor = matchPercentage > 80 ? 'bg-cyan-500' : matchPercentage > 50 ? 'bg-blue-500' : 'bg-zinc-500';

  return (
    <div className="w-full max-w-3xl mx-auto bg-zinc-900/80 backdrop-blur-md border border-zinc-800 rounded-xl overflow-hidden shadow-2xl animate-fade-in-up">
      <div className="p-8 space-y-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-zinc-800 pb-6 gap-4">
           <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-cyan-900/20 border border-cyan-500/30">
                 <Brain className="w-8 h-8 text-cyan-400" />
              </div>
              <div>
                 <h2 className="text-sm font-mono text-zinc-500 uppercase tracking-widest mb-1">Shared Psychological Trait</h2>
                 <h1 className="text-2xl font-serif text-white font-bold leading-tight">
                    {data.shared_trait}
                 </h1>
              </div>
           </div>
           
           <div className="flex flex-col items-end">
             <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-1">Compatibility</span>
             <div className={`text-4xl font-mono font-bold ${highlightColor}`}>
               {matchPercentage}%
             </div>
           </div>
        </div>

        {/* Content Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Analysis Column */}
            <div className="space-y-4">
                <div className="flex items-center gap-2 text-zinc-400">
                    <Network className="w-4 h-4" />
                    <span className="text-xs font-mono uppercase tracking-wider">The Psychological Link</span>
                </div>
                <p className="text-lg text-zinc-200 leading-relaxed font-light">
                   {data.analysis}
                </p>
                
                <div className="pt-4">
                    <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                       <div className={`h-full ${barColor} shadow-[0_0_10px_rgba(6,182,212,0.5)]`} style={{ width: `${matchPercentage}%` }}></div>
                    </div>
                    <div className="flex justify-between mt-2 text-xs font-mono text-zinc-600">
                        <span>Divergent</span>
                        <span>Convergent</span>
                    </div>
                </div>
            </div>

            {/* Icebreaker Column */}
            <div className="bg-zinc-950/50 rounded-lg p-6 border border-zinc-800/50 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                   <MessageSquareQuote className="w-24 h-24 text-white" />
                </div>
                
                <div className="relative z-10 space-y-4">
                    <span className="text-xs font-mono text-cyan-500 uppercase tracking-widest block">Conversation Starter</span>
                    <p className="text-xl text-white font-serif italic leading-relaxed">
                       "{data.icebreaker}"
                    </p>
                    <p className="text-xs text-zinc-500 font-mono mt-4">
                       Use this to bridge the gap immediately.
                    </p>
                </div>
            </div>
        </div>

      </div>
    </div>
  );
};

export default CognitiveCard;