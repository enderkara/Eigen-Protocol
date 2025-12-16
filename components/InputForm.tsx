import React from 'react';

interface InputFormProps {
  inputA: string;
  setInputA: (val: string) => void;
  inputB: string;
  setInputB: (val: string) => void;
  onSubmit: () => void;
  loading: boolean;
}

const InputForm: React.FC<InputFormProps> = ({ inputA, setInputA, inputB, setInputB, onSubmit, loading }) => {
  return (
    <div className="flex flex-col gap-6 w-full max-w-2xl mx-auto z-10 relative">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="group relative">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-sky-500 to-blue-600 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
          <input
            type="text"
            value={inputA}
            onChange={(e) => setInputA(e.target.value)}
            placeholder="Domain A (e.g., Mycelium)"
            className="relative w-full bg-zinc-900 text-white placeholder-zinc-500 border border-zinc-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-500 font-mono"
            disabled={loading}
          />
        </div>
        
        <div className="flex items-center justify-center md:hidden">
            <span className="text-zinc-500 italic font-serif">connected to</span>
        </div>

        <div className="group relative">
           <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500 to-rose-600 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
          <input
            type="text"
            value={inputB}
            onChange={(e) => setInputB(e.target.value)}
            placeholder="Domain B (e.g., Urban Planning)"
            className="relative w-full bg-zinc-900 text-white placeholder-zinc-500 border border-zinc-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500 font-mono"
            disabled={loading}
          />
        </div>
      </div>

      <button
        onClick={onSubmit}
        disabled={loading || !inputA || !inputB}
        className={`
          group relative w-full py-4 rounded-lg font-serif tracking-widest text-lg transition-all overflow-hidden
          ${loading || !inputA || !inputB ? 'opacity-50 cursor-not-allowed' : 'hover:scale-[1.01] active:scale-[0.99] cursor-pointer'}
        `}
      >
        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-violet-600 to-indigo-600 opacity-80 group-hover:opacity-100 transition-opacity"></div>
        <span className="relative z-10 flex items-center justify-center gap-2">
           {loading ? "ARCHITECTING..." : "CONSTRUCT BRIDGE"}
        </span>
      </button>
    </div>
  );
};

export default InputForm;
