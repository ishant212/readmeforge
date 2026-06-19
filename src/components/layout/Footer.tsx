import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-surface-panel border-t border-warm-border px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-zinc-400 select-none">
      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
        <div>
          <span className="font-semibold text-zinc-300">Name:</span> Ishant Shekhar Eeshu
        </div>
        <div>
          <span className="font-semibold text-zinc-300">Email:</span> ishantvats123@gmail.com
        </div>
      </div>
      <div>
        <a
          href="https://digitalheroesco.com"
          target="_blank"
          rel="noopener"
          className="inline-flex items-center px-4 py-2 bg-purple-650 hover:bg-purple-700 text-white font-medium rounded-md shadow-sm transition-all duration-200 text-xs"
        >
          Built for Digital Heroes
        </a>
      </div>
    </footer>
  );
};
