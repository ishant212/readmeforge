import React, { useEffect, useRef } from 'react';
import { animate } from 'animejs';
import logo from '../../assets/logo.png';

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
    <header className="bg-surface-panel border-b border-warm-border px-6 py-4 flex items-center justify-between select-none relative overflow-hidden shrink-0">
      <div 
        ref={glowRef}
        className="absolute left-10 top-1/2 w-64 h-32 bg-accent rounded-full blur-3xl opacity-10 pointer-events-none mix-blend-screen -translate-y-1/2"
      />
      <div className="flex items-center space-x-3 relative z-10">
        <div className="w-8 h-8 rounded-lg bg-surface-card border border-warm-border flex items-center justify-center shadow-sm overflow-hidden">
<img
  src={logo}
  alt="Logo"
  className="w-full h-full object-contain"
/>
</div>
        <div>
          <h1 className="text-lg font-bold text-zinc-50 tracking-tight leading-none font-display">ReadMeForge</h1>
          <p className="text-zinc-400 text-xs mt-1">Interactive README Generator</p>
        </div>
      </div>
      
      <div className="flex items-center space-x-4 relative z-10">
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-surface-card text-zinc-400 border border-warm-border font-mono">
          v1.0.0
        </span>
      </div>
    </header>
  );
};
