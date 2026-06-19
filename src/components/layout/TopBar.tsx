import React, { useEffect, useRef } from 'react';
import { animate } from 'animejs';

export const TopBar: React.FC = () => {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (glowRef.current) {
      animate(glowRef.current, {
        opacity: [0.05, 0.15],
        scale: [1, 1.1],
        translateX: [-10, 10],
        translateY: [-5, 5],
        alternate: true,
        loop: true,
        duration: 4000,
        ease: 'inOutSine',
      });
    }
  }, []);

  return (
    <header className="bg-zinc-950 border-b border-zinc-800 px-6 py-4 flex items-center justify-between select-none relative overflow-hidden shrink-0">
      <div 
        ref={glowRef}
        className="absolute left-10 top-1/2 w-64 h-32 bg-blue-400 rounded-full blur-3xl opacity-10 pointer-events-none mix-blend-screen -translate-y-1/2"
      />
      <div className="flex items-center space-x-3 relative z-10">
        <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-700 flex items-center justify-center font-bold text-zinc-100 shadow-sm">
          R
        </div>
        <div>
          <h1 className="text-lg font-bold text-zinc-50 tracking-tight leading-none">ReadMeForge</h1>
          <p className="text-zinc-400 text-xs mt-1">Interactive README Generator</p>
        </div>
      </div>
      
      <div className="flex items-center space-x-4 relative z-10">
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-zinc-900 text-zinc-400 border border-zinc-800 font-mono">
          v1.0.0
        </span>
      </div>
    </header>
  );
};
