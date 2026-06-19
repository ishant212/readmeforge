import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  TouchSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import type { DragEndEvent } from '@dnd-kit/core';
import {
  SortableContext,
  horizontalListSortingStrategy,
  useSortable,
  arrayMove,
  sortableKeyboardCoordinates,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { Section } from '../../types/section';
import { Card } from '../ui/Card';
import { Toggle } from '../ui/Toggle';
import { scoreReadme } from '../../utils/scoreReadme';
import { AboutSection } from '../sections/AboutSection';
import { FeaturesSection } from '../sections/FeaturesSection';
import { ContactSection } from '../sections/ContactSection';
import { BadgesSection } from '../sections/BadgesSection';
import { TechStackSection } from '../sections/TechStackSection';
import { InstallationSection } from '../sections/InstallationSection';
import { UsageSection } from '../sections/UsageSection';
import { FolderStructureSection } from '../sections/FolderStructureSection';
import { ApiReferenceSection } from '../sections/ApiReferenceSection';
import { ScreenshotsSection } from '../sections/ScreenshotsSection';
import { ContributingSection } from '../sections/ContributingSection';
import { LicenseSection } from '../sections/LicenseSection';

interface Props {
  sections: Section[];
  selectedSectionId: string | null;
  selectedSection: Section | null;
  onToggleSection: (id: string) => void;
  onSelectSection: (id: string) => void;
  onUpdateSection: (id: string, content: Record<string, unknown>) => void;
  onReorderSections: (reordered: Section[]) => void;
  isEmpty?: boolean;
}

const SECTION_LABELS: Record<string, string> = {
  badges:          'Badges',
  about:           'About',
  features:        'Features',
  techstack:       'Tech Stack',
  installation:    'Installation',
  usage:           'Usage',
  folderstructure: 'Folder Structure',
  apireference:    'API Reference',
  screenshots:     'Screenshots',
  contributing:    'Contributing',
  license:         'License',
  contact:         'Contact',
};

function SectionEditor({
  section,
  onUpdate,
}: {
  section: Section;
  onUpdate: (content: Record<string, unknown>) => void;
}) {
  switch (section.type) {
    case 'about':           return <AboutSection           section={section} onChange={onUpdate} />;
    case 'features':        return <FeaturesSection        section={section} onChange={onUpdate} />;
    case 'contact':         return <ContactSection         section={section} onChange={onUpdate} />;
    case 'badges':          return <BadgesSection          section={section} onChange={onUpdate} />;
    case 'techstack':       return <TechStackSection       section={section} onChange={onUpdate} />;
    case 'installation':    return <InstallationSection    section={section} onChange={onUpdate} />;
    case 'usage':           return <UsageSection           section={section} onChange={onUpdate} />;
    case 'folderstructure': return <FolderStructureSection section={section} onChange={onUpdate} />;
    case 'apireference':    return <ApiReferenceSection    section={section} onChange={onUpdate} />;
    case 'screenshots':     return <ScreenshotsSection     section={section} onChange={onUpdate} />;
    case 'contributing':    return <ContributingSection    section={section} onChange={onUpdate} />;
    case 'license':         return <LicenseSection         section={section} onChange={onUpdate} />;
    default:
      return (
        <p className="text-sm text-zinc-500 italic">
          Editor for "{section.type}" coming soon.
        </p>
      );
  }
}

// ── Score Card ───────────────────────────────────────────────────────────────

function ScoreCard({ sections }: { sections: Section[] }) {
  const { score, suggestions } = scoreReadme(sections);

  const barColor =
    score >= 80 ? 'bg-emerald-500' :
    score >= 50 ? 'bg-amber-500'   :
                  'bg-red-500';

  return (
    <div className="px-4 py-3 bg-zinc-900/40 border-b border-zinc-800 space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest">
          README Score
        </span>
        <span className={`text-sm font-bold ${score >= 80 ? 'text-emerald-400' : score >= 50 ? 'text-amber-400' : 'text-red-400'}`}>
          {score}/100
        </span>
      </div>
      <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${barColor}`}
          initial={false}
          animate={{ width: `${score}%` }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        />
      </div>
      {suggestions.length > 0 && (
        <div className="space-y-0.5 pt-1">
          {suggestions.map((s) => (
            <p key={s.label} className="text-[11px] text-zinc-500">
              <span className="text-blue-400 font-medium">+{s.points}</span>{' '}
              {s.label}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Sortable pill card ───────────────────────────────────────────────────────

function SortableCard({
  section,
  isSelected,
  onSelect,
}: {
  section: Section;
  isSelected: boolean;
  onSelect: () => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: section.id });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 50 : undefined,
  };

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      layout
      layoutId={section.id}
      className="shrink-0 flex items-center"
    >
      {/* Drag handle */}
      <button
        type="button"
        {...attributes}
        {...listeners}
        className="flex items-center justify-center w-5 h-full pr-0.5 text-zinc-600
                   hover:text-zinc-400 cursor-grab active:cursor-grabbing touch-none
                   focus:outline-none"
        tabIndex={-1}
        aria-label="Drag to reorder"
      >
        <svg width="8" height="12" viewBox="0 0 8 12" fill="currentColor">
          <circle cx="2" cy="2"  r="1.2" />
          <circle cx="6" cy="2"  r="1.2" />
          <circle cx="2" cy="6"  r="1.2" />
          <circle cx="6" cy="6"  r="1.2" />
          <circle cx="2" cy="10" r="1.2" />
          <circle cx="6" cy="10" r="1.2" />
        </svg>
      </button>

      {/* Pill button (click to select) */}
      <button
        type="button"
        onClick={onSelect}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium
                    border transition-all duration-150 cursor-pointer
                    ${isSelected
                      ? 'bg-blue-600/20 border-blue-500 text-blue-300'
                      : 'bg-zinc-900 border-zinc-700 text-zinc-400 hover:border-zinc-500 hover:text-zinc-300'
                    }`}
      >
        <span
          className={`w-1.5 h-1.5 rounded-full ${section.enabled ? 'bg-emerald-400' : 'bg-zinc-600'}`}
        />
        {SECTION_LABELS[section.type] ?? section.type}
      </button>
    </motion.div>
  );
}

// ── Main panel ───────────────────────────────────────────────────────────────

export const BuilderPanel: React.FC<Props> = ({
  sections,
  selectedSectionId,
  selectedSection,
  onToggleSection,
  onSelectSection,
  onUpdateSection,
  onReorderSections,
  isEmpty,
}) => {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor,   { activationConstraint: { delay: 150, tolerance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = sections.findIndex((s) => s.id === active.id);
    const newIndex = sections.findIndex((s) => s.id === over.id);
    if (oldIndex === -1 || newIndex === -1) return;
    onReorderSections(arrayMove(sections, oldIndex, newIndex));
  };

  return (
    <div className="w-full md:w-1/2 h-full flex flex-col border-r border-zinc-800 overflow-hidden">
      {/* ── Score Card ──────────────────────────────────────────── */}
      <ScoreCard sections={sections} />

      {/* ── Section pill list ──────────────────────────────────── */}
      <div className="shrink-0 border-b border-zinc-800">
        <div className="px-4 py-3 flex items-center justify-between bg-zinc-900/60">
          <h2 className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Sections</h2>
          <span className="text-[10px] text-zinc-600 select-none">drag to reorder</span>
        </div>

        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={sections.map((s) => s.id)}
            strategy={horizontalListSortingStrategy}
          >
            <div className="flex gap-1.5 overflow-x-auto px-4 py-3 bg-zinc-900/30">
              <AnimatePresence mode="popLayout">
                {sections.map((section) => (
                  <SortableCard
                    key={section.id}
                    section={section}
                    isSelected={selectedSectionId === section.id}
                    onSelect={() => onSelectSection(section.id)}
                  />
                ))}
              </AnimatePresence>
            </div>
          </SortableContext>
        </DndContext>
      </div>

      {isEmpty && (
        <div className="mx-5 mt-5 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg flex items-center gap-3">
          <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-sm text-blue-400 font-medium">
            Your README is currently empty. Toggle a section on to start building documentation.
          </p>
        </div>
      )}

      {/* ── Editor area ───────────────────────────────────────── */}
      {selectedSection ? (
        <div className="flex-1 overflow-y-auto">
          {/* Editor header */}
          <div className="sticky top-0 z-10 px-5 py-3 border-b border-zinc-800 bg-zinc-950
                          flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-zinc-100">
                {SECTION_LABELS[selectedSection.type] ?? selectedSection.type}
              </h3>
              <p className="text-xs text-zinc-500 mt-0.5">
                {selectedSection.enabled ? 'Included in output' : 'Hidden — toggle to include'}
              </p>
            </div>
            <Toggle
              checked={selectedSection.enabled}
              onChange={() => onToggleSection(selectedSection.id)}
              label={selectedSection.enabled ? 'On' : 'Off'}
            />
          </div>

          {/* Fields */}
          <div className="p-5">
            {selectedSection.enabled ? (
              <SectionEditor
                section={selectedSection}
                onUpdate={(content) => onUpdateSection(selectedSection.id, content)}
              />
            ) : (
              <Card className="text-center py-6">
                <p className="text-sm text-zinc-500">
                  This section is disabled. Toggle it on to edit its content.
                </p>
              </Card>
            )}
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center">
          <p className="text-sm text-zinc-600">Select a section above to edit it.</p>
        </div>
      )}
    </div>
  );
};
