import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverEffect?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, hoverEffect = false, className = '', ...props }) => {
  return (
    <div
      className={`bg-zinc-900 border border-zinc-800 rounded-lg p-4 transition-all duration-200 ${
        hoverEffect ? 'hover:border-zinc-700 hover:shadow-md hover:shadow-purple-950/10' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
