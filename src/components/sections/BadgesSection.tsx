import React, { useState } from 'react';
import type { Section } from '../../types/section';

interface Props {
  section: Section;
  onChange: (content: Record<string, unknown>) => void;
}

const PRESET_BADGES: { label: string; color: string; logo: string; logoColor: string }[] = [
  { label: 'React',           color: '20232A', logo: 'react',            logoColor: '61DAFB' },
  { label: 'Next.js',         color: '000000', logo: 'nextdotjs',        logoColor: 'white' },
  { label: 'TypeScript',      color: '007ACC', logo: 'typescript',       logoColor: 'white' },
  { label: 'JavaScript',      color: 'F7DF1E', logo: 'javascript',       logoColor: '000000' },
  { label: 'HTML5',           color: 'E34F26', logo: 'html5',            logoColor: 'white' },
  { label: 'CSS3',            color: '1572B6', logo: 'css3',             logoColor: 'white' },
  { label: 'Tailwind CSS',    color: '06B6D4', logo: 'tailwindcss',      logoColor: 'white' },
  { label: 'Vue.js',          color: '4FC08D', logo: 'vuedotjs',         logoColor: 'white' },
  { label: 'Angular',         color: 'DD0031', logo: 'angular',          logoColor: 'white' },
  { label: 'Svelte',          color: 'FF3E00', logo: 'svelte',           logoColor: 'white' },
  { label: 'Node.js',         color: '43853D', logo: 'nodedotjs',        logoColor: 'white' },
  { label: 'Express',         color: '000000', logo: 'express',          logoColor: 'white' },
  { label: 'NestJS',          color: 'E0234E', logo: 'nestjs',           logoColor: 'white' },
  { label: 'Python',          color: '3776AB', logo: 'python',           logoColor: 'white' },
  { label: 'Django',          color: '092E20', logo: 'django',           logoColor: 'white' },
  { label: 'FastAPI',         color: '009688', logo: 'fastapi',          logoColor: 'white' },
  { label: 'GraphQL',         color: 'E10098', logo: 'graphql',          logoColor: 'white' },
  { label: 'PostgreSQL',      color: '316192', logo: 'postgresql',       logoColor: 'white' },
  { label: 'MySQL',           color: '4479A1', logo: 'mysql',            logoColor: 'white' },
  { label: 'MongoDB',         color: '47A248', logo: 'mongodb',          logoColor: 'white' },
  { label: 'Redis',           color: 'DC382D', logo: 'redis',            logoColor: 'white' },
  { label: 'Firebase',        color: 'FFCA28', logo: 'firebase',         logoColor: '000000' },
  { label: 'Docker',          color: '2CA5E0', logo: 'docker',           logoColor: 'white' },
  { label: 'AWS',             color: '232F3E', logo: 'amazon-aws',       logoColor: 'white' },
  { label: 'Vercel',          color: '000000', logo: 'vercel',           logoColor: 'white' },
  { label: 'Netlify',         color: '00C7B7', logo: 'netlify',          logoColor: 'white' },
  { label: 'GitHub Actions',  color: '2088FF', logo: 'githubactions',    logoColor: 'white' },
  { label: 'Jest',            color: 'C21325', logo: 'jest',             logoColor: 'white' },
  { label: 'Figma',           color: 'F24E1E', logo: 'figma',            logoColor: 'white' },
  { label: 'Linux',           color: 'FCC624', logo: 'linux',            logoColor: '000000' },
];


export const BadgesSection: React.FC<Props> = ({ section, onChange }) => {
  const selected: string[] = Array.isArray(section.content.selected)
    ? (section.content.selected as string[])
    : [];

  const [showCustom, setShowCustom] = useState(false);
  const [customLabel, setCustomLabel] = useState('');
  const [customColor, setCustomColor] = useState('555555');
  const [customLogo, setCustomLogo] = useState('');

  const togglePreset = (label: string) => {
    const updated = selected.includes(label)
      ? selected.filter((t) => t !== label)
      : [...selected, label];
    onChange({ ...section.content, selected: updated });
  };

  const addCustom = () => {
    const trimmed = customLabel.trim();
    if (!trimmed) return;
    const color = customColor.replace('#', '') || '555555';
    const logo = customLogo.trim() || '';
    const customKey = `__custom__${trimmed}|${color}|${logo}`;
    if (!selected.includes(customKey)) {
      onChange({ ...section.content, selected: [...selected, customKey] });
    }
    setCustomLabel('');
    setCustomColor('555555');
    setCustomLogo('');
    setShowCustom(false);
  };

  return (
    <div className="space-y-5">
      <div>
        <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-3">
          Preset Badges
        </label>
        <div className="flex flex-wrap gap-2">
          {PRESET_BADGES.map(({ label }) => {
            const isSelected = selected.includes(label);
            return (
              <button
                key={label}
                type="button"
                onClick={() => togglePreset(label)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 cursor-pointer
                  ${isSelected
                    ? 'bg-blue-600/20 border-blue-500 text-blue-300'
                    : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-zinc-300'
                  }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {selected.filter((s) => s.startsWith('__custom__')).length > 0 && (
        <div>
          <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">
            Custom Badges
          </label>
          <div className="flex flex-wrap gap-2">
            {selected
              .filter((s) => s.startsWith('__custom__'))
              .map((key) => {
                const rest = key.slice('__custom__'.length);
                const [label] = rest.split('|');
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => onChange({ ...section.content, selected: selected.filter((s) => s !== key) })}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium border bg-emerald-900/20 border-emerald-700 text-emerald-400 hover:bg-red-900/20 hover:border-red-700 hover:text-red-400 transition-all duration-150 cursor-pointer"
                    title="Click to remove"
                  >
                    {label} ×
                  </button>
                );
              })}
          </div>
        </div>
      )}

      <div>
        {!showCustom ? (
          <button
            type="button"
            onClick={() => setShowCustom(true)}
            className="flex items-center gap-1.5 text-xs text-blue-400 hover:text-blue-300 transition-colors font-medium cursor-pointer"
          >
            <span className="text-base leading-none">+</span> Custom Badge
          </button>
        ) : (
          <div className="border border-zinc-800 rounded-lg p-4 space-y-3 bg-zinc-900/30">
            <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Add Custom Badge</p>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[10px] text-zinc-500 mb-1 uppercase tracking-wider">Label *</label>
                <input
                  type="text"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-200
                             placeholder-zinc-650 focus:outline-none focus:border-blue-600 transition-colors"
                  placeholder="My Library"
                  value={customLabel}
                  onChange={(e) => setCustomLabel(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-[10px] text-zinc-500 mb-1 uppercase tracking-wider">Color (hex)</label>
                <input
                  type="text"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-200
                             placeholder-zinc-650 focus:outline-none focus:border-blue-600 transition-colors font-mono"
                  placeholder="555555"
                  value={customColor}
                  onChange={(e) => setCustomColor(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label className="block text-[10px] text-zinc-500 mb-1 uppercase tracking-wider">Logo slug (optional, from simple-icons)</label>
              <input
                type="text"
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-200
                           placeholder-zinc-650 focus:outline-none focus:border-blue-600 transition-colors font-mono"
                placeholder="react, docker, etc."
                value={customLogo}
                onChange={(e) => setCustomLogo(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={addCustom}
                disabled={!customLabel.trim()}
                className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded-lg
                           transition-colors disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
              >
                Add
              </button>
              <button
                type="button"
                onClick={() => { setShowCustom(false); setCustomLabel(''); setCustomColor('555555'); setCustomLogo(''); }}
                className="px-4 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-medium rounded-lg transition-colors cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
