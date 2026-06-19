import React from 'react';
import type { Section } from '../../types/section';

interface Props {
  section: Section;
  onChange: (content: Record<string, unknown>) => void;
}

interface ContactContent {
  name?: string;
  email?: string;
  githubUrl?: string;
  linkedinUrl?: string;
}

const Field: React.FC<{
  label: string;
  placeholder: string;
  value: string;
  type?: string;
  onChange: (v: string) => void;
}> = ({ label, placeholder, value, type = 'text', onChange }) => (
  <div>
    <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1.5">
      {label}
    </label>
    <input
      type={type}
      className="w-full bg-surface-page border border-warm-border rounded-lg px-3 py-2 text-sm
                 text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-accent
                 focus:ring-1 focus:ring-accent/40 transition-colors"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
);

export const ContactSection: React.FC<Props> = ({ section, onChange }) => {
  const c = section.content as ContactContent;

  const patch = (key: keyof ContactContent) => (value: string) =>
    onChange({ ...section.content, [key]: value });

  return (
    <div className="space-y-4">
      <Field
        label="Name"
        placeholder="Jane Doe"
        value={c.name ?? ''}
        onChange={patch('name')}
      />
      <Field
        label="Email"
        placeholder="jane@example.com"
        type="email"
        value={c.email ?? ''}
        onChange={patch('email')}
      />
      <Field
        label="GitHub URL"
        placeholder="https://github.com/janedoe"
        value={c.githubUrl ?? ''}
        onChange={patch('githubUrl')}
      />
      <Field
        label="LinkedIn URL"
        placeholder="https://linkedin.com/in/janedoe"
        value={c.linkedinUrl ?? ''}
        onChange={patch('linkedinUrl')}
      />
    </div>
  );
};
