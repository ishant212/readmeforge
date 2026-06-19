import React from 'react';
import type { Section } from '../../types/section';

interface Props {
  section: Section;
  onChange: (content: Record<string, unknown>) => void;
}

export const FeaturesSection: React.FC<Props> = ({ section, onChange }) => {
  const items: string[] = Array.isArray(section.content.items)
    ? (section.content.items as string[])
    : [''];

  const updateItem = (index: number, value: string) => {
    const updated = items.map((item, i) => (i === index ? value : item));
    onChange({ ...section.content, items: updated });
  };

  const addItem = () => {
    onChange({ ...section.content, items: [...items, ''] });
  };

  const removeItem = (index: number) => {
    const updated = items.filter((_, i) => i !== index);
    onChange({ ...section.content, items: updated.length ? updated : [''] });
  };

  return (
    <div className="space-y-3">
      <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider">
        Feature List
      </label>

      <div className="space-y-2">
        {items.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <span className="text-zinc-600 text-sm font-mono w-5 shrink-0 text-right">
              {index + 1}.
            </span>
            <input
              type="text"
              className="flex-1 bg-surface-page border border-warm-border rounded-lg px-3 py-2 text-sm
                         text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-accent
                         focus:ring-1 focus:ring-accent/40 transition-colors"
              placeholder={`Feature ${index + 1}…`}
              value={item}
              onChange={(e) => updateItem(index, e.target.value)}
            />
            <button
              type="button"
              onClick={() => removeItem(index)}
              disabled={items.length === 1}
              className="shrink-0 w-7 h-7 flex items-center justify-center rounded-md
                         text-zinc-600 hover:text-red-400 hover:bg-red-950/30
                         disabled:opacity-25 disabled:pointer-events-none transition-colors"
              aria-label="Remove feature"
            >
              ×
            </button>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={addItem}
        className="flex items-center gap-1.5 text-xs text-accent-light hover:text-accent-hover
                   transition-colors font-medium mt-1"
      >
        <span className="text-base leading-none">+</span> Add feature
      </button>
    </div>
  );
};
