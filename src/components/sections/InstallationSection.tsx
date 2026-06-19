import React from 'react';
import type { Section } from '../../types/section';

interface Props {
  section: Section;
  onChange: (content: Record<string, unknown>) => void;
}

export const InstallationSection: React.FC<Props> = ({ section, onChange }) => {
  const lang: string = (section.content.lang as string) || 'bash';
  const code: string = (section.content.code as string) || '';

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
          Language / Package Manager
        </label>
        <select
          className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-sm text-zinc-200
                     focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600/40
                     transition-colors cursor-pointer"
          value={lang}
          onChange={(e) => onChange({ ...section.content, lang: e.target.value })}
        >
          <option value="bash">bash</option>
          <option value="npm">npm</option>
          <option value="yarn">yarn</option>
          <option value="pnpm">pnpm</option>
        </select>
      </div>

      <div>
        <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
          Installation Command / Script
        </label>
        <textarea
          className="w-full h-32 bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-sm text-zinc-200
                     placeholder-zinc-650 resize-none focus:outline-none focus:border-blue-600
                     focus:ring-1 focus:ring-blue-600/40 transition-colors font-mono"
          placeholder="npm install my-cool-project"
          value={code}
          onChange={(e) => onChange({ ...section.content, code: e.target.value })}
        />
      </div>
    </div>
  );
};
