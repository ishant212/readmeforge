import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverEffect?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, hoverEffect = false, className = '', ...props }) => {
  return (
    <div
      className={`bg-surface-card border border-warm-border rounded-lg p-4 transition-all duration-200 ${
        hoverEffect ? 'hover:border-warm-border-light hover:shadow-md hover:shadow-accent/5' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
