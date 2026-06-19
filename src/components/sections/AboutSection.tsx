import React from 'react';
import type { Section } from '../../types/section';

interface Props {
  section: Section;
  onChange: (content: Record<string, unknown>) => void;
}

export const AboutSection: React.FC<Props> = ({ section, onChange }) => {
  const projectName: string = (section.content.projectName as string) ?? '';
  const tagline: string    = (section.content.tagline as string)     ?? '';
  const description: string = (section.content.description as string) ?? '';

  const update = (patch: Record<string, string>) =>
    onChange({ ...section.content, ...patch });

  return (
    <div className="space-y-4">
      <div>
        <label
          htmlFor="about-project-name"
          className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2"
        >
          Project Name
        </label>
        <input
          id="about-project-name"
          type="text"
          className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm
                     text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-blue-600
                     focus:ring-1 focus:ring-blue-600/40 transition-colors"
          placeholder="My Awesome Project"
          value={projectName}
          onChange={(e) => update({ projectName: e.target.value })}
        />
      </div>

      <div>
        <label
          htmlFor="about-tagline"
          className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2"
        >
          Tagline <span className="text-zinc-600 normal-case font-normal">(optional)</span>
        </label>
        <input
          id="about-tagline"
          type="text"
          className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm
                     text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-blue-600
                     focus:ring-1 focus:ring-blue-600/40 transition-colors"
          placeholder="A one-line summary of what your project does"
          value={tagline}
          onChange={(e) => update({ tagline: e.target.value })}
        />
      </div>

      <div>
        <label
          htmlFor="about-description"
          className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2"
        >
          Description <span className="text-zinc-600 normal-case font-normal">(optional)</span>
        </label>
        <textarea
          id="about-description"
          className="w-full h-36 bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-sm
                     text-zinc-200 placeholder-zinc-600 resize-none focus:outline-none
                     focus:border-blue-600 focus:ring-1 focus:ring-blue-600/40 transition-colors"
          placeholder="A brief description of what your project does, why it exists, and who it's for..."
          value={description}
          onChange={(e) => update({ description: e.target.value })}
        />
        <p className="text-xs text-zinc-600 mt-1">{description.length} characters</p>
      </div>
    </div>
  );
};
