import React from 'react';
import type { Section } from '../../types/section';

interface Props {
  section: Section;
  onChange: (content: Record<string, unknown>) => void;
}

interface ScreenshotRow {
  altText: string;
  imageUrl: string;
}

export const ScreenshotsSection: React.FC<Props> = ({ section, onChange }) => {
  const rows: ScreenshotRow[] = Array.isArray(section.content.rows)
    ? (section.content.rows as ScreenshotRow[])
    : [{ altText: '', imageUrl: '' }];

  const updateRow = (index: number, key: keyof ScreenshotRow, value: string) => {
    const updated = rows.map((row, i) => (i === index ? { ...row, [key]: value } : row));
    onChange({ ...section.content, rows: updated });
  };

  const addRow = () => {
    onChange({ ...section.content, rows: [...rows, { altText: '', imageUrl: '' }] });
  };

  const removeRow = (index: number) => {
    const updated = rows.filter((_, i) => i !== index);
    onChange({ ...section.content, rows: updated.length ? updated : [{ altText: '', imageUrl: '' }] });
  };

  return (
    <div className="space-y-4">
      <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
        Screenshots
      </label>

      <div className="space-y-3">
        {rows.map((row, index) => (
          <div key={index} className="flex flex-col sm:flex-row gap-2 items-start bg-zinc-900/40 p-3 rounded-lg border border-zinc-900 w-full">
            <div className="flex-1 flex flex-col gap-2 w-full">
              <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Alt Text</label>
              <input
                type="text"
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm
                           text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-blue-600
                           transition-colors"
                placeholder="App Screenshot"
                value={row.altText}
                onChange={(e) => updateRow(index, 'altText', e.target.value)}
              />
            </div>
            <div className="flex-1 flex flex-col gap-2 w-full">
              <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Image URL</label>
              <div className="flex gap-2 w-full">
                <input
                  type="text"
                  className="flex-1 bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm
                             text-zinc-200 placeholder-zinc-650 focus:outline-none focus:border-blue-600
                             transition-colors"
                  placeholder="https://example.com/screenshot.png"
                  value={row.imageUrl}
                  onChange={(e) => updateRow(index, 'imageUrl', e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => removeRow(index)}
                  disabled={rows.length === 1}
                  className="shrink-0 w-8 h-8 flex items-center justify-center rounded-md
                             text-zinc-600 hover:text-red-400 hover:bg-red-950/30
                             disabled:opacity-25 disabled:pointer-events-none transition-colors mt-0.5"
                  aria-label="Remove screenshot"
                >
                  ×
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={addRow}
        className="flex items-center gap-1.5 text-xs text-blue-400 hover:text-blue-300
                   transition-colors font-medium mt-1 cursor-pointer"
      >
        <span className="text-base leading-none">+</span> Add screenshot row
      </button>
    </div>
  );
};
