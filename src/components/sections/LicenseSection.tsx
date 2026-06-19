import React from 'react';
import type { Section } from '../../types/section';

interface Props {
  section: Section;
  onChange: (content: Record<string, unknown>) => void;
}

export const LicenseSection: React.FC<Props> = ({ section, onChange }) => {
  const license: string = (section.content.license as string) || 'MIT';

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
          Select License
        </label>
        <select
          className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-sm text-zinc-200
                     focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600/40
                     transition-colors cursor-pointer"
          value={license}
          onChange={(e) => onChange({ ...section.content, license: e.target.value })}
        >
          <option value="MIT">MIT</option>
          <option value="Apache 2.0">Apache 2.0</option>
          <option value="GPL v3">GPL v3</option>
          <option value="BSD-3-Clause">BSD-3-Clause</option>
          <option value="Unlicense">Unlicense</option>
        </select>
      </div>
    </div>
  );
};
