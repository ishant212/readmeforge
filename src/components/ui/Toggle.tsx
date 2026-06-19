import React from 'react';

interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
}

export const Toggle: React.FC<ToggleProps> = ({ checked, onChange, label }) => {
  return (
    <label className="flex items-center space-x-2 cursor-pointer select-none">
      <div className="relative">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="sr-only"
        />
        <div className={`w-10 h-6 rounded-full transition-colors duration-200 ${checked ? 'bg-blue-600' : 'bg-zinc-700'}`} />
        <div className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-200 ${checked ? 'translate-x-4' : 'translate-x-0'}`} />
      </div>
      {label && <span className="text-zinc-300 text-sm font-medium">{label}</span>}
    </label>
  );
};
