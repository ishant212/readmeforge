import React from 'react';
import type { Section } from '../../types/section';

interface Props {
  section: Section;
  onChange: (content: Record<string, unknown>) => void;
}

interface ApiRow {
  endpoint: string;
  method: string;
  description: string;
}

export const ApiReferenceSection: React.FC<Props> = ({ section, onChange }) => {
  const rows: ApiRow[] = Array.isArray(section.content.rows)
    ? (section.content.rows as ApiRow[])
    : [{ endpoint: '', method: 'GET', description: '' }];

  const updateRow = (index: number, key: keyof ApiRow, value: string) => {
    const updated = rows.map((row, i) => (i === index ? { ...row, [key]: value } : row));
    onChange({ ...section.content, rows: updated });
  };

  const addRow = () => {
    onChange({ ...section.content, rows: [...rows, { endpoint: '', method: 'GET', description: '' }] });
  };

  const removeRow = (index: number) => {
    const updated = rows.filter((_, i) => i !== index);
    onChange({ ...section.content, rows: updated.length ? updated : [{ endpoint: '', method: 'GET', description: '' }] });
  };

  return (
    <div className="space-y-4">
      <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
        API Endpoints
      </label>

      <div className="space-y-3">
        {rows.map((row, index) => (
          <div key={index} className="flex flex-col sm:flex-row gap-2 items-start bg-surface-card/40 p-3 rounded-lg border border-warm-border">
            <div className="flex-1 flex gap-2 w-full">
              <select
                className="bg-surface-page border border-warm-border rounded-lg px-2.5 py-2 text-xs font-mono text-zinc-200
                           focus:outline-none focus:border-accent transition-colors w-24 shrink-0 cursor-pointer"
                value={row.method}
                onChange={(e) => updateRow(index, 'method', e.target.value)}
              >
                <option value="GET">GET</option>
                <option value="POST">POST</option>
                <option value="PUT">PUT</option>
                <option value="DELETE">DELETE</option>
                <option value="PATCH">PATCH</option>
              </select>
              <input
                type="text"
                className="flex-1 bg-surface-page border border-warm-border rounded-lg px-3 py-2 text-sm
                           text-zinc-200 placeholder-zinc-650 focus:outline-none focus:border-accent
                           transition-colors font-mono"
                placeholder="/api/v1/resource"
                value={row.endpoint}
                onChange={(e) => updateRow(index, 'endpoint', e.target.value)}
              />
            </div>
            <div className="flex-1 flex gap-2 w-full">
              <input
                type="text"
                className="flex-1 bg-surface-page border border-warm-border rounded-lg px-3 py-2 text-sm
                           text-zinc-200 placeholder-zinc-650 focus:outline-none focus:border-accent
                           transition-colors"
                placeholder="Description of the endpoint"
                value={row.description}
                onChange={(e) => updateRow(index, 'description', e.target.value)}
              />
              <button
                type="button"
                onClick={() => removeRow(index)}
                disabled={rows.length === 1}
                className="shrink-0 w-8 h-8 flex items-center justify-center rounded-md
                           text-zinc-600 hover:text-red-400 hover:bg-red-950/30
                           disabled:opacity-25 disabled:pointer-events-none transition-colors mt-0.5"
                aria-label="Remove row"
              >
                ×
              </button>
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={addRow}
        className="flex items-center gap-1.5 text-xs text-accent-light hover:text-accent-hover
                   transition-colors font-medium mt-1 cursor-pointer"
      >
        <span className="text-base leading-none">+</span> Add endpoint row
      </button>
    </div>
  );
};
