import { useState } from 'react';
import type { Section } from './types/section';
import { TopBar } from './components/layout/TopBar';
import { Footer } from './components/layout/Footer';
import { BuilderPanel } from './components/layout/BuilderPanel';
import { PreviewPanel } from './components/layout/PreviewPanel';
import { generateMarkdown } from './utils/markdownGenerator';

const INITIAL_SECTIONS: Section[] = [
  { id: 'badges',          type: 'badges',          enabled: false, content: { selected: [] } },
  { id: 'about',           type: 'about',           enabled: true,  content: { projectName: '', tagline: '', description: '' } },
  { id: 'features',        type: 'features',        enabled: true,  content: { items: [''] } },
  { id: 'techstack',       type: 'techstack',       enabled: false, content: { rows: [
    { technology: 'React.js',             purpose: 'UI framework',           layer: 'Frontend'   },
    { technology: 'TypeScript',           purpose: 'Type safety (mandatory)', layer: 'Full Stack' },
    { technology: 'Node.js + Express.js', purpose: 'REST API server',         layer: 'Backend'    },
  ] } },
  { id: 'installation',    type: 'installation',    enabled: false, content: { lang: 'bash', code: '' } },
  { id: 'usage',           type: 'usage',           enabled: false, content: { description: '', exampleCode: '' } },
  { id: 'folderstructure', type: 'folderstructure', enabled: false, content: { tree: '' } },
  { id: 'apireference',    type: 'apireference',    enabled: false, content: { rows: [{ endpoint: '', method: 'GET', description: '' }] } },
  { id: 'screenshots',     type: 'screenshots',     enabled: false, content: { rows: [{ altText: '', imageUrl: '' }] } },
  { id: 'contributing',    type: 'contributing',    enabled: false, content: { text: 'Contributions are welcome! Please feel free to submit a Pull Request.' } },
  { id: 'license',         type: 'license',         enabled: false, content: { license: 'MIT' } },
  { id: 'contact',         type: 'contact',         enabled: true,  content: { name: '', email: '', githubUrl: '', linkedinUrl: '' } },
];

function App() {
  const [sections, setSections] = useState<Section[]>(INITIAL_SECTIONS);
  const [selectedSectionId, setSelectedSectionId] = useState<string | null>('about');

  const markdown = generateMarkdown(sections);

  const handleToggleSection = (id: string) => {
    setSections((prev) =>
      prev.map((s) => (s.id === id ? { ...s, enabled: !s.enabled } : s))
    );
  };

  const handleSelectSection = (id: string) => setSelectedSectionId(id);

  const handleUpdateSection = (id: string, content: Record<string, unknown>) => {
    setSections((prev) =>
      prev.map((s) => (s.id === id ? { ...s, content } : s))
    );
  };

  const handleReorderSections = (reordered: Section[]) => setSections(reordered);

  const selectedSection = sections.find((s) => s.id === selectedSectionId) ?? null;
  const isEmpty = sections.every((s) => !s.enabled);

  return (
    <div className="flex flex-col h-screen w-screen bg-zinc-950 text-zinc-100 overflow-hidden">
      <TopBar />

      <main className="flex-1 flex flex-col md:flex-row overflow-hidden">
        <BuilderPanel
          sections={sections}
          selectedSectionId={selectedSectionId}
          selectedSection={selectedSection}
          onToggleSection={handleToggleSection}
          onSelectSection={handleSelectSection}
          onUpdateSection={handleUpdateSection}
          onReorderSections={handleReorderSections}
          isEmpty={isEmpty}
        />
        <PreviewPanel markdown={markdown} isEmpty={isEmpty} />
      </main>

      <Footer />
    </div>
  );
}

export default App;
