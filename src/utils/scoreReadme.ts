import type { Section } from '../types/section';

interface Suggestion {
  label: string;
  points: number;
}

interface ScoreResult {
  score: number;
  suggestions: Suggestion[];
}

interface Rule {
  check: (sections: Section[]) => boolean;
  points: number;
  label: string;
}

const RULES: Rule[] = [
  {
    label: 'Add a project description',
    points: 10,
    check: (sections) => {
      const about = sections.find((s) => s.type === 'about' && s.enabled);
      return !!about && !!(about.content.description as string)?.trim();
    },
  },
  {
    label: 'Add badges',
    points: 8,
    check: (sections) => {
      const badges = sections.find((s) => s.type === 'badges' && s.enabled);
      return !!badges && Array.isArray(badges.content.selected) && badges.content.selected.length >= 1;
    },
  },
  {
    label: 'Add at least 2 features',
    points: 10,
    check: (sections) => {
      const feat = sections.find((s) => s.type === 'features' && s.enabled);
      if (!feat || !Array.isArray(feat.content.items)) return false;
      return (feat.content.items as string[]).filter((i) => i.trim()).length >= 2;
    },
  },
  {
    label: 'Add installation instructions',
    points: 12,
    check: (sections) => {
      const inst = sections.find((s) => s.type === 'installation' && s.enabled);
      return !!inst && !!(inst.content.code as string)?.trim();
    },
  },
  {
    label: 'Add usage instructions',
    points: 10,
    check: (sections) => {
      const usage = sections.find((s) => s.type === 'usage' && s.enabled);
      if (!usage) return false;
      return !!(usage.content.description as string)?.trim() || !!(usage.content.exampleCode as string)?.trim();
    },
  },
  {
    label: 'Add screenshots',
    points: 8,
    check: (sections) => {
      const ss = sections.find((s) => s.type === 'screenshots' && s.enabled);
      if (!ss || !Array.isArray(ss.content.rows)) return false;
      return ss.content.rows.some((r: any) => (r.imageUrl as string)?.trim());
    },
  },
  {
    label: 'Add tech stack',
    points: 10,
    check: (sections) => {
      const ts = sections.find((s) => s.type === 'techstack' && s.enabled);
      return !!ts;
    },
  },
  {
    label: 'Select a license',
    points: 10,
    check: (sections) => {
      const lic = sections.find((s) => s.type === 'license' && s.enabled);
      return !!lic && !!(lic.content.license as string)?.trim();
    },
  },
  {
    label: 'Add contact info',
    points: 8,
    check: (sections) => {
      const contact = sections.find((s) => s.type === 'contact' && s.enabled);
      if (!contact) return false;
      return !!(contact.content.name as string)?.trim() || !!(contact.content.email as string)?.trim();
    },
  },
  {
    label: 'Enable 4+ sections',
    points: 14,
    check: (sections) => sections.filter((s) => s.enabled).length >= 4,
  },
];

export function scoreReadme(sections: Section[]): ScoreResult {
  let total = 0;
  const unmet: Suggestion[] = [];

  for (const rule of RULES) {
    if (rule.check(sections)) {
      total += rule.points;
    } else {
      unmet.push({ label: rule.label, points: rule.points });
    }
  }

  const score = Math.min(100, total);
  const suggestions = unmet.sort((a, b) => b.points - a.points).slice(0, 3);

  return { score, suggestions };
}
