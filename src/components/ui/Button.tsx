import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
}

export const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseStyle = 'px-4 py-2 rounded-md font-medium transition-all duration-200 text-sm active:scale-95 disabled:opacity-50 disabled:pointer-events-none';
  const variants = {
    primary: 'bg-purple-600 hover:bg-purple-700 text-white shadow-sm shadow-purple-900/20',
    secondary: 'bg-surface-card hover:bg-warm-border-light text-zinc-200 border border-warm-border',
    danger: 'bg-red-600 hover:bg-red-700 text-white shadow-sm shadow-red-900/20',
  };

  return (
    <button
      className={`${baseStyle} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
