import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { animate } from 'animejs';

interface Props {
  markdown: string;
  isEmpty?: boolean;
}

export const PreviewPanel: React.FC<Props> = ({ markdown, isEmpty }) => {
  const [activeTab, setActiveTab] = useState<'preview' | 'raw'>('preview');
  const [flashKey, setFlashKey] = useState(0);
  const prevMarkdownRef = useRef(markdown);
  const [copied, setCopied] = useState(false);
  const iconRef = useRef<SVGSVGElement>(null);
  const downloadIconRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (markdown !== prevMarkdownRef.current) {
      prevMarkdownRef.current = markdown;
      setFlashKey((k) => k + 1);
    }
  }, [markdown]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(markdown).then(() => {
      setCopied(true);
      if (iconRef.current) {
        animate(iconRef.current, {
          scale: [0.8, 1.2, 1],
          duration: 400,
          ease: 'outElastic(1, .8)',
        });
      }
      setTimeout(() => setCopied(false), 1500);
    }).catch(() => {/* silent */});
  };

  const handleDownload = () => {
    if (downloadIconRef.current) {
      animate(downloadIconRef.current, {
        scale: [1, 0.8, 1],
        duration: 300,
        ease: 'inOutQuad',
      });
    }
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'README.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full md:w-1/2 h-full flex flex-col bg-zinc-950 overflow-hidden border-t md:border-t-0 border-zinc-800">
      {/* Header */}
      <div className="shrink-0 px-4 py-3 border-b border-zinc-800 bg-zinc-900/60
                      flex items-center justify-between">
        <h2 className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Preview</h2>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={copyToClipboard}
            className="text-xs text-zinc-400 hover:text-zinc-200 px-2 py-1.5 rounded
                       border border-zinc-800 hover:border-zinc-600 transition-colors flex items-center gap-1.5"
            aria-label="Copy Markdown"
          >
            <svg ref={iconRef} className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {copied ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
              )}
            </svg>
            {copied ? 'Copied' : 'Copy'}
          </button>
          <button
            type="button"
            onClick={handleDownload}
            className="text-xs text-zinc-400 hover:text-zinc-200 px-2 py-1.5 rounded
                       border border-zinc-800 hover:border-zinc-600 transition-colors flex items-center gap-1.5"
            aria-label="Download README.md"
          >
            <svg ref={downloadIconRef} className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download
          </button>
          <div className="flex rounded-md overflow-hidden border border-zinc-800 ml-2">
            {(['preview', 'raw'] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1 text-xs font-medium capitalize transition-colors
                  ${activeTab === tab
                    ? 'bg-zinc-800 text-zinc-100'
                    : 'bg-zinc-900 text-zinc-400 hover:text-zinc-200'
                  }`}
              >
                {tab === 'preview' ? 'Visual' : 'Markdown'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto p-6 relative">
        <AnimatePresence>
          <motion.div
            key={flashKey}
            initial={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
            animate={{ backgroundColor: 'rgba(255, 255, 255, 0)' }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="absolute inset-0 pointer-events-none rounded-lg"
          />
        </AnimatePresence>

        {isEmpty ? (
          <AnimatePresence>
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 flex flex-col items-center justify-center text-center p-6"
            >
              <div className="w-16 h-16 rounded-full bg-zinc-900 flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-zinc-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-zinc-200 font-semibold mb-2">Your README is empty</h3>
              <p className="text-sm text-zinc-500 max-w-sm">
                Enable sections in the Builder Panel to begin building your documentation.
              </p>
            </motion.div>
          </AnimatePresence>
        ) : activeTab === 'preview' ? (
          <div
            className="max-w-3xl mx-auto text-zinc-300 space-y-4
                       [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:text-zinc-100 [&_h1]:mb-4 [&_h1]:mt-8 [&_h1]:border-b [&_h1]:border-zinc-800 [&_h1]:pb-2 [&_h1:first-child]:mt-0
                       [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-zinc-100 [&_h2]:mb-4 [&_h2]:mt-8 [&_h2]:border-b [&_h2]:border-zinc-800 [&_h2]:pb-2 [&_h2:first-child]:mt-0
                       [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-zinc-200 [&_h3]:mb-2 [&_h3]:mt-6
                       [&_p]:text-zinc-300 [&_p]:leading-7 [&_p]:mb-4
                       [&_ul]:space-y-1 [&_ul]:pl-5 [&_ul]:list-disc [&_ul]:mb-4
                       [&_ol]:space-y-1 [&_ol]:pl-5 [&_ol]:list-decimal [&_ol]:mb-4
                       [&_li]:text-zinc-300 [&_li]:leading-7
                       [&_a]:text-blue-400 [&_a]:underline [&_a]:underline-offset-2 [&_a]:hover:text-blue-300
                       [&_code]:bg-zinc-800 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded-md [&_code]:text-[13px] [&_code]:font-mono [&_code]:text-zinc-200
                       [&_pre]:bg-zinc-900 [&_pre]:border [&_pre]:border-zinc-800 [&_pre]:rounded-lg [&_pre]:p-4 [&_pre]:overflow-x-auto [&_pre]:mb-4
                       [&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_pre_code]:text-zinc-300
                       [&_blockquote]:border-l-4 [&_blockquote]:border-zinc-600 [&_blockquote]:pl-4 [&_blockquote]:text-zinc-400 [&_blockquote]:italic [&_blockquote]:mb-4
                       [&_table]:w-full [&_table]:border-collapse [&_table]:text-sm [&_table]:mb-4
                       [&_th]:border [&_th]:border-zinc-700 [&_th]:bg-zinc-800/50 [&_th]:px-3 [&_th]:py-2 [&_th]:text-left [&_th]:font-semibold [&_th]:text-zinc-200
                       [&_td]:border [&_td]:border-zinc-800 [&_td]:px-3 [&_td]:py-2 [&_td]:text-zinc-300
                       [&_hr]:border-t [&_hr]:border-zinc-800 [&_hr]:my-8
                       [&_img]:rounded-lg [&_img]:max-w-full [&_img]:border [&_img]:border-zinc-800"
          >
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
          </div>
        ) : (
          <pre className="font-mono text-[13px] text-zinc-300 leading-relaxed whitespace-pre-wrap break-words max-w-3xl mx-auto">
            <code>{markdown}</code>
          </pre>
        )}
      </div>
    </div>
  );
};
