import React from 'react';
import type { Section } from '../../types/section';

interface Props {
  section: Section;
  onChange: (content: Record<string, unknown>) => void;
}

interface TechRow {
  technology: string;
  purpose: string;
  layer: string;
}

const LAYERS = ['Frontend', 'Backend', 'Full Stack', 'DevOps', 'Database', 'Other'];

const DEFAULT_ROWS: TechRow[] = [
  { technology: 'React.js',            purpose: 'UI framework',            layer: 'Frontend' },
  { technology: 'TypeScript',          purpose: 'Type safety (mandatory)',  layer: 'Full Stack' },
  { technology: 'Node.js + Express.js', purpose: 'REST API server',         layer: 'Backend' },
];

export const TechStackSection: React.FC<Props> = ({ section, onChange }) => {
  const rows: TechRow[] = Array.isArray(section.content.rows)
    ? (section.content.rows as TechRow[])
    : DEFAULT_ROWS;

  const updateRow = (index: number, key: keyof TechRow, value: string) => {
    const updated = rows.map((row, i) => (i === index ? { ...row, [key]: value } : row));
    onChange({ ...section.content, rows: updated });
  };

  const addRow = () => {
    onChange({ ...section.content, rows: [...rows, { technology: '', purpose: '', layer: 'Other' }] });
  };

  const removeRow = (index: number) => {
    const updated = rows.filter((_, i) => i !== index);
    onChange({ ...section.content, rows: updated.length ? updated : [{ technology: '', purpose: '', layer: 'Other' }] });
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-[1fr_1fr_auto_auto] gap-x-2 mb-1 px-0.5">
        <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Technology</span>
        <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Purpose</span>
        <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Layer</span>
        <span />
      </div>

      <div className="space-y-2">
        {rows.map((row, index) => (
          <div key={index} className="grid grid-cols-[1fr_1fr_auto_auto] gap-2 items-center">
            <input
              type="text"
              className="w-full bg-surface-page border border-warm-border rounded-lg px-3 py-2 text-sm
                         text-zinc-200 placeholder-zinc-650 focus:outline-none focus:border-accent
                         focus:ring-1 focus:ring-accent/40 transition-colors"
              placeholder="React.js"
              value={row.technology}
              onChange={(e) => updateRow(index, 'technology', e.target.value)}
            />
            <input
              type="text"
              className="w-full bg-surface-page border border-warm-border rounded-lg px-3 py-2 text-sm
                         text-zinc-200 placeholder-zinc-650 focus:outline-none focus:border-accent
                         focus:ring-1 focus:ring-accent/40 transition-colors"
              placeholder="UI framework"
              value={row.purpose}
              onChange={(e) => updateRow(index, 'purpose', e.target.value)}
            />
            <select
              className="bg-surface-page border border-warm-border rounded-lg px-2.5 py-2 text-xs text-zinc-200
                         focus:outline-none focus:border-accent transition-colors cursor-pointer w-28"
              value={row.layer}
              onChange={(e) => updateRow(index, 'layer', e.target.value)}
            >
              {LAYERS.map((l) => (
                <option key={l} value={l}>{l}</option>
              ))}
            </select>
            <button
              type="button"
              onClick={() => removeRow(index)}
              disabled={rows.length === 1}
              className="w-7 h-8 flex items-center justify-center rounded-md
                         text-zinc-600 hover:text-red-400 hover:bg-red-950/30
                         disabled:opacity-25 disabled:pointer-events-none transition-colors cursor-pointer"
              aria-label="Remove row"
            >
              ×
            </button>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={addRow}
        className="flex items-center gap-1.5 text-xs text-accent-light hover:text-accent-hover
                   transition-colors font-medium mt-1 cursor-pointer"
      >
        <span className="text-base leading-none">+</span> Add technology row
      </button>
    </div>
  );
};
