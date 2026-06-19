import React, { useState } from 'react';
import type { Section } from '../../types/section';
import { buildCombinedTree } from '../../utils/parseTreeOutput';

interface Props {
  section: Section;
  onChange: (content: Record<string, unknown>) => void;
}

const CMD_TOP = 'Get-ChildItem -Name';
const CMD_SRC = 'tree src /A /F';

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }).catch(() => {/* silent */});
  };
  return (
    <button
      type="button"
      onClick={handleCopy}
      className="shrink-0 flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium rounded
                 border border-warm-border text-zinc-300 hover:border-warm-border-light hover:text-zinc-100
                 transition-colors focus:outline-none focus:ring-1 focus:ring-accent"
    >
      {copied ? (
        <>
          <svg className="w-3 h-3 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          Copied
        </>
      ) : (
        <>
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          Copy
        </>
      )}
    </button>
  );
}

interface StepBoxProps {
  step: string;
  label: string;
  command: string;
  helper: string;
  textareaId: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
}

function StepBox({ step, label, command, helper, textareaId, placeholder, value, onChange }: StepBoxProps) {
  return (
    <div className="space-y-2">
      <div className="p-3 bg-surface-card border border-warm-border rounded-lg space-y-2">
        <p className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider">{step} — {label}</p>
        <div className="flex items-center gap-2">
          <code className="flex-1 text-xs font-mono text-zinc-200 bg-surface-page border border-warm-border rounded px-2.5 py-1.5 overflow-x-auto whitespace-nowrap">
            {command}
          </code>
          <CopyButton text={command} />
        </div>
        <p className="text-xs text-zinc-500 leading-relaxed">{helper}</p>
      </div>
      <label htmlFor={textareaId} className="block text-[11px] font-semibold text-zinc-500 uppercase tracking-wider">
        Paste output here
      </label>
      <textarea
        id={textareaId}
        className="w-full h-36 bg-surface-page border border-warm-border rounded-lg p-3 text-sm
                   text-zinc-200 placeholder-zinc-650 resize-none focus:outline-none
                   focus:border-accent focus:ring-1 focus:ring-accent/40
                   transition-colors font-mono"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

export const FolderStructureSection: React.FC<Props> = ({ section, onChange }) => {
  const parsedTree: string = (section.content.parsedTree as string) || '';
  const [rawTop, setRawTop] = useState('');
  const [rawSrc, setRawSrc] = useState('');
  const [rootName, setRootName] = useState('my-project');
  const [parseError, setParseError] = useState('');

  const handleParse = () => {
    setParseError('');
    if (!rawTop.trim()) {
      setParseError("Paste the output of Get-ChildItem -Name first.");
      return;
    }
    try {
      const result = buildCombinedTree(rawTop, rawSrc, rootName.trim() || 'my-project');
      onChange({ ...section.content, parsedTree: result });
    } catch {
      setParseError("Couldn't parse this — check you're pasting the exact output of the command above.");
    }
  };

  const handleClear = () => {
    setRawTop('');
    setRawSrc('');
    setParseError('');
    setRootName('my-project');
    onChange({ ...section.content, parsedTree: '' });
  };

  return (
    <div className="space-y-5">

      {/* Root name */}
      <div className="space-y-1.5">
        <label htmlFor="folder-root-name" className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider">
          Project / Root Folder Name
        </label>
        <input
          id="folder-root-name"
          type="text"
          className="w-full bg-surface-page border border-warm-border rounded-lg px-3 py-2 text-sm
                     text-zinc-200 placeholder-zinc-650 focus:outline-none focus:border-accent
                     focus:ring-1 focus:ring-accent/40 transition-colors font-mono"
          placeholder="my-project"
          value={rootName}
          onChange={(e) => setRootName(e.target.value)}
        />
      </div>

      {/* Step 1 */}
      <StepBox
        step="Step 1"
        label="Top-level listing (required)"
        command={CMD_TOP}
        helper="Run this in your project's root folder (PowerShell). Lists top-level files and folders only — fast, no clutter."
        textareaId="folder-top-paste"
        placeholder={`.gitignore\npublic\nREADME.md\npackage.json\nsrc\ntsconfig.json\nvite.config.ts`}
        value={rawTop}
        onChange={setRawTop}
      />

      {/* Step 2 */}
      <StepBox
        step="Step 2"
        label="Source folder detail (optional)"
        command={CMD_SRC}
        helper="Optional: run this inside your project root. Since it only scans src/ it stays short and skips node_modules automatically."
        textareaId="folder-src-paste"
        placeholder={`src\n|   App.tsx\n+---components\n|       Button.tsx\n\\---utils\n        helpers.ts`}
        value={rawSrc}
        onChange={setRawSrc}
      />

      {/* Actions */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={handleParse}
          className="px-3 py-1.5 text-xs font-semibold rounded bg-accent hover:bg-accent-hover
                     text-white transition-colors focus:outline-none focus:ring-2
                     focus:ring-accent focus:ring-offset-1 focus:ring-offset-surface-page"
        >
          Parse Structure
        </button>
        <button
          type="button"
          onClick={handleClear}
          className="px-3 py-1.5 text-xs font-medium rounded border border-warm-border
                     text-zinc-400 hover:border-warm-border-light hover:text-zinc-200
                     transition-colors focus:outline-none focus:ring-1 focus:ring-warm-border-light"
        >
          Clear
        </button>
      </div>

      {parseError && (
        <p className="text-xs text-red-400 flex items-start gap-1.5">
          <svg className="w-3.5 h-3.5 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {parseError}
        </p>
      )}

      {/* Result */}
      {parsedTree && (
        <div className="space-y-1.5">
          <label htmlFor="folder-parsed-tree" className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider">
            Result — edit if needed
          </label>
          <textarea
            id="folder-parsed-tree"
            className="w-full h-52 bg-surface-page border border-warm-border rounded-lg p-3 text-sm
                       text-zinc-200 resize-none focus:outline-none focus:border-accent
                       focus:ring-1 focus:ring-accent/40 transition-colors font-mono whitespace-pre"
            value={parsedTree}
            onChange={(e) => onChange({ ...section.content, parsedTree: e.target.value })}
          />
          <p className="text-xs text-zinc-650">Edit directly — preview updates immediately.</p>
        </div>
      )}
    </div>
  );
};
