import React, { useState } from 'react';
import { generateBridge, evaluateFidelity } from './services/geminiService';
import { EigenResponse, FidelityResponse } from './types';
import InputForm from './components/InputForm';
import BridgeCard from './components/BridgeCard';
import EigenVisualizer from './components/EigenVisualizer';
import FidelityCard from './components/FidelityCard';
import { SAMPLE_INPUTS } from './constants';
import { BrainCircuit, ShieldCheck, Component } from 'lucide-react';

type AppMode = 'ARCHITECT' | 'GATEKEEPER';

const App: React.FC = () => {
  const [mode, setMode] = useState<AppMode>('ARCHITECT');
  
  // Architect State
  const [inputA, setInputA] = useState("");
  const [inputB, setInputB] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<EigenResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Gatekeeper State
  const [signalInput, setSignalInput] = useState("");
  const [fidelityResult, setFidelityResult] = useState<FidelityResponse | null>(null);

  const handleConstruct = async () => {
    if (!inputA || !inputB) return;
    
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = await generateBridge(inputA, inputB);
      setResult(data);
    } catch (err: any) {
      setError(err.message || "Failed to construct bridge.");
    } finally {
      setLoading(false);
    }
  };

  const handleSignalAnalysis = async () => {
    if (!signalInput) return;

    setLoading(true);
    setError(null);
    setFidelityResult(null);

    try {
      const data = await evaluateFidelity(signalInput);
      setFidelityResult(data);
    } catch (err: any) {
      setError(err.message || "Signal evaluation failed.");
    } finally {
      setLoading(false);
    }
  };

  const loadSample = (a: string, b: string) => {
    setInputA(a);
    setInputB(b);
  };

  return (
    <div className="min-h-screen w-full bg-[#09090b] text-zinc-200 selection:bg-violet-500/30">
      
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-zinc-800 bg-[#09090b]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setMode('ARCHITECT')}>
            <BrainCircuit className="text-violet-500 w-6 h-6" />
            <h1 className="font-serif font-bold text-xl tracking-wide text-white">EIGEN PROTOCOL</h1>
          </div>
          
          <div className="flex items-center gap-1 bg-zinc-900 p-1 rounded-lg border border-zinc-800">
             <button 
               onClick={() => setMode('ARCHITECT')}
               className={`px-4 py-1.5 rounded-md text-xs font-mono transition-all ${mode === 'ARCHITECT' ? 'bg-zinc-800 text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-300'}`}
             >
               ARCHITECT
             </button>
             <button 
               onClick={() => setMode('GATEKEEPER')}
               className={`px-4 py-1.5 rounded-md text-xs font-mono transition-all ${mode === 'GATEKEEPER' ? 'bg-zinc-800 text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-300'}`}
             >
               GATEKEEPER
             </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-24 pb-12 px-4 max-w-6xl mx-auto space-y-12">

        {mode === 'ARCHITECT' ? (
          <>
            {!result && !loading && (
                <div className="text-center space-y-4 max-w-2xl mx-auto py-12">
                    <h2 className="text-3xl md:text-5xl font-serif text-white leading-tight">
                        Find the Hidden Geometry<br/>Connecting All Things
                    </h2>
                    <p className="text-zinc-400 text-lg font-light">
                        Enter two disparate fields. The Architect will ignore surface noise and identify the isomorphic bridge that binds them.
                    </p>
                    <div className="flex flex-wrap justify-center gap-2 mt-4">
                        {SAMPLE_INPUTS.map((sample, idx) => (
                            <button 
                                key={idx}
                                onClick={() => loadSample(sample.a, sample.b)}
                                className="px-3 py-1 bg-zinc-900 border border-zinc-700 hover:border-violet-500 rounded-full text-xs text-zinc-400 transition-colors"
                            >
                                {sample.a} ↔ {sample.b}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            <section className="relative">
                 <InputForm 
                   inputA={inputA}
                   setInputA={setInputA}
                   inputB={inputB}
                   setInputB={setInputB}
                   onSubmit={handleConstruct}
                   loading={loading}
                 />
            </section>

            {(loading || result) && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-[500px] animate-fade-in">
                    <div className="h-[400px] lg:h-auto">
                        <EigenVisualizer data={result} loading={loading} />
                    </div>
                    <div className="flex flex-col justify-center">
                        {loading && (
                            <div className="space-y-4 p-8 opacity-50">
                                <div className="h-8 bg-zinc-800 rounded w-3/4 animate-pulse"></div>
                                <div className="h-4 bg-zinc-800 rounded w-1/2 animate-pulse"></div>
                                <div className="space-y-2 pt-8">
                                    <div className="h-2 bg-zinc-800 rounded w-full animate-pulse"></div>
                                    <div className="h-2 bg-zinc-800 rounded w-full animate-pulse"></div>
                                    <div className="h-2 bg-zinc-800 rounded w-5/6 animate-pulse"></div>
                                </div>
                            </div>
                        )}
                        
                        {result && !loading && (
                            <BridgeCard result={result} />
                        )}
                    </div>
                </div>
            )}
          </>
        ) : (
          <div className="max-w-3xl mx-auto animate-fade-in">
             <div className="text-center mb-12 space-y-4">
                <div className="inline-flex items-center justify-center p-3 rounded-full bg-zinc-900 border border-zinc-800 mb-4">
                   <ShieldCheck className="w-8 h-8 text-emerald-500" />
                </div>
                <h2 className="text-3xl md:text-5xl font-serif text-white leading-tight">
                    The Gatekeeper
                </h2>
                <p className="text-zinc-400 text-lg font-light max-w-lg mx-auto">
                    Evaluate the "Signal Fidelity" of a question or statement. Distinguish between Cheap Talk, Mimicry, and Costly Signals.
                </p>
             </div>

             <div className="space-y-6">
                <div className="group relative">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                  <textarea
                    value={signalInput}
                    onChange={(e) => setSignalInput(e.target.value)}
                    placeholder="Enter a question or statement to evaluate..."
                    className="relative w-full h-32 bg-zinc-900 text-white placeholder-zinc-500 border border-zinc-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono resize-none"
                    disabled={loading}
                  />
                </div>

                <button
                  onClick={handleSignalAnalysis}
                  disabled={loading || !signalInput}
                  className={`
                    group relative w-full py-4 rounded-lg font-serif tracking-widest text-lg transition-all overflow-hidden
                    ${loading || !signalInput ? 'opacity-50 cursor-not-allowed' : 'hover:scale-[1.01] active:scale-[0.99] cursor-pointer'}
                  `}
                >
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-emerald-600 to-teal-600 opacity-80 group-hover:opacity-100 transition-opacity"></div>
                  <span className="relative z-10 flex items-center justify-center gap-2">
                     {loading ? "ANALYZING SIGNAL..." : "EVALUATE FIDELITY"}
                  </span>
                </button>
             </div>

             <div className="mt-12">
               {loading && !fidelityResult && (
                  <div className="w-full h-64 flex items-center justify-center border border-zinc-800 rounded-xl bg-zinc-900/50">
                      <div className="flex flex-col items-center gap-3">
                         <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></div>
                         <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">Calibrating Signal...</span>
                      </div>
                  </div>
               )}
               {fidelityResult && !loading && (
                 <FidelityCard data={fidelityResult} />
               )}
             </div>
          </div>
        )}

        {/* Error State */}
        {error && (
            <div className="p-4 bg-red-900/20 border border-red-900/50 rounded text-red-300 text-center font-mono animate-fade-in-up">
                [SYSTEM ERROR]: {error}
            </div>
        )}

      </main>

      <footer className="py-8 text-center text-zinc-600 text-xs font-mono">
         <p>EIGEN PROTOCOL v2.0 // ARCHITECT & GATEKEEPER</p>
      </footer>
      
      <style>{`
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
            animation: fadeIn 0.5s ease-out forwards;
        }
        .animate-fade-in {
             animation: fadeIn 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default App;
