import React from 'react';
import type { Section } from '../../types/section';

interface Props {
  section: Section;
  onChange: (content: Record<string, unknown>) => void;
}

export const ContributingSection: React.FC<Props> = ({ section, onChange }) => {
  const text: string = (section.content.text as string) || '';

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
          Contributing Guidelines / Info
        </label>
        <textarea
          className="w-full h-40 bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-sm text-zinc-200
                     placeholder-zinc-650 resize-none focus:outline-none focus:border-blue-600
                     focus:ring-1 focus:ring-blue-600/40 transition-colors"
          placeholder="Contributions are welcome! Please feel free to submit a Pull Request..."
          value={text}
          onChange={(e) => onChange({ ...section.content, text: e.target.value })}
        />
      </div>
    </div>
  );
};
