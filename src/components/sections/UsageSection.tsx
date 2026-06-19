import React from 'react';
import type { Section } from '../../types/section';

interface Props {
  section: Section;
  onChange: (content: Record<string, unknown>) => void;
}

export const UsageSection: React.FC<Props> = ({ section, onChange }) => {
  const description: string = (section.content.description as string) || '';
  const exampleCode: string = (section.content.exampleCode as string) || '';

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
          Usage Description
        </label>
        <textarea
          className="w-full h-24 bg-surface-page border border-warm-border rounded-lg p-3 text-sm text-zinc-200
                     placeholder-zinc-650 resize-none focus:outline-none focus:border-accent
                     focus:ring-1 focus:ring-accent/40 transition-colors"
          placeholder="Explain how to use your project after installation..."
          value={description}
          onChange={(e) => onChange({ ...section.content, description: e.target.value })}
        />
      </div>

      <div>
        <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
          Example Code
        </label>
        <textarea
          className="w-full h-40 bg-surface-page border border-warm-border rounded-lg p-3 text-sm text-zinc-200
                     placeholder-zinc-650 resize-none focus:outline-none focus:border-accent
                     focus:ring-1 focus:ring-accent/40 transition-colors font-mono"
          placeholder={`import myCoolLib from 'my-cool-project';\n\nmyCoolLib.doAwesomeThing();`}
          value={exampleCode}
          onChange={(e) => onChange({ ...section.content, exampleCode: e.target.value })}
        />
      </div>
    </div>
  );
};
