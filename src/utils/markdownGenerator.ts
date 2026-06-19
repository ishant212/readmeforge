import type { Section } from '../types/section';

// ── Helpers for Badges ──────────────────────────────────────────────────────

function getLicenseBadgeUrl(licenseType: string): string {
  switch (licenseType) {
    case 'MIT':          return 'https://img.shields.io/badge/License-MIT-yellow.svg';
    case 'Apache 2.0':   return 'https://img.shields.io/badge/License-Apache_2.0-blue.svg';
    case 'GPL v3':       return 'https://img.shields.io/badge/License-GPLv3-blue.svg';
    case 'BSD-3-Clause': return 'https://img.shields.io/badge/License-BSD_3--Clause-orange.svg';
    case 'Unlicense':    return 'https://img.shields.io/badge/License-Unlicense-blue.svg';
    default:             return '';
  }
}

function encodeBadgeLabel(label: string): string {
  return label.replace(/-/g, '--').replace(/_/g, '__').replace(/ /g, '_');
}

function getTechBadgeUrl(tech: string): string {
  switch (tech) {
    case 'React':          return 'https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB';
    case 'Next.js':        return 'https://img.shields.io/badge/Next.js-000000?style=flat&logo=nextdotjs&logoColor=white';
    case 'TypeScript':     return 'https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white';
    case 'JavaScript':     return 'https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=000000';
    case 'HTML5':          return 'https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white';
    case 'CSS3':           return 'https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white';
    case 'Tailwind CSS':   return 'https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat&logo=tailwindcss&logoColor=white';
    case 'Vue.js':         return 'https://img.shields.io/badge/Vue.js-4FC08D?style=flat&logo=vuedotjs&logoColor=white';
    case 'Angular':        return 'https://img.shields.io/badge/Angular-DD0031?style=flat&logo=angular&logoColor=white';
    case 'Svelte':         return 'https://img.shields.io/badge/Svelte-FF3E00?style=flat&logo=svelte&logoColor=white';
    case 'Node.js':        return 'https://img.shields.io/badge/Node.js-43853D?style=flat&logo=nodedotjs&logoColor=white';
    case 'Express':        return 'https://img.shields.io/badge/Express-000000?style=flat&logo=express&logoColor=white';
    case 'NestJS':         return 'https://img.shields.io/badge/NestJS-E0234E?style=flat&logo=nestjs&logoColor=white';
    case 'Python':         return 'https://img.shields.io/badge/Python-3776AB?style=flat&logo=python&logoColor=white';
    case 'Django':         return 'https://img.shields.io/badge/Django-092E20?style=flat&logo=django&logoColor=white';
    case 'FastAPI':        return 'https://img.shields.io/badge/FastAPI-009688?style=flat&logo=fastapi&logoColor=white';
    case 'GraphQL':        return 'https://img.shields.io/badge/GraphQL-E10098?style=flat&logo=graphql&logoColor=white';
    case 'PostgreSQL':     return 'https://img.shields.io/badge/PostgreSQL-316192?style=flat&logo=postgresql&logoColor=white';
    case 'MySQL':          return 'https://img.shields.io/badge/MySQL-4479A1?style=flat&logo=mysql&logoColor=white';
    case 'MongoDB':        return 'https://img.shields.io/badge/MongoDB-47A248?style=flat&logo=mongodb&logoColor=white';
    case 'Redis':          return 'https://img.shields.io/badge/Redis-DC382D?style=flat&logo=redis&logoColor=white';
    case 'Firebase':       return 'https://img.shields.io/badge/Firebase-FFCA28?style=flat&logo=firebase&logoColor=000000';
    case 'Docker':         return 'https://img.shields.io/badge/Docker-2CA5E0?style=flat&logo=docker&logoColor=white';
    case 'AWS':            return 'https://img.shields.io/badge/AWS-232F3E?style=flat&logo=amazon-aws&logoColor=white';
    case 'Vercel':         return 'https://img.shields.io/badge/Vercel-000000?style=flat&logo=vercel&logoColor=white';
    case 'Netlify':        return 'https://img.shields.io/badge/Netlify-00C7B7?style=flat&logo=netlify&logoColor=white';
    case 'GitHub Actions': return 'https://img.shields.io/badge/GitHub_Actions-2088FF?style=flat&logo=githubactions&logoColor=white';
    case 'Jest':           return 'https://img.shields.io/badge/Jest-C21325?style=flat&logo=jest&logoColor=white';
    case 'Figma':          return 'https://img.shields.io/badge/Figma-F24E1E?style=flat&logo=figma&logoColor=white';
    case 'Linux':          return 'https://img.shields.io/badge/Linux-FCC624?style=flat&logo=linux&logoColor=000000';
    default:               return '';
  }
}

// ── Per-type template functions ────────────────────────────────────────────

function generateAboutSection(_content: Record<string, string>): string {
  // Description is rendered in the title block at the top — do not duplicate it here.
  return '';
}

function generateFeaturesSection(content: Record<string, string[]>): string {
  const items: string[] = Array.isArray(content.items) ? content.items : [];
  const filled = items.map((i) => i.trim()).filter(Boolean);
  if (!filled.length) return '';
  const list = filled.map((item) => `- ${item}`).join('\n');
  return `## Features\n\n${list}`;
}

function generateContactSection(content: Record<string, string>): string {
  const lines: string[] = [];
  if (content.name?.trim())       lines.push(`**Name:** ${content.name.trim()}`);
  if (content.email?.trim())      lines.push(`**Email:** [${content.email.trim()}](mailto:${content.email.trim()})`);
  if (content.githubUrl?.trim())  lines.push(`**GitHub:** [${content.githubUrl.trim()}](${content.githubUrl.trim()})`);
  if (content.linkedinUrl?.trim()) lines.push(`**LinkedIn:** [${content.linkedinUrl.trim()}](${content.linkedinUrl.trim()})`);
  if (!lines.length) return '';
  return `## Contact\n\n${lines.join('  \n')}`;
}

function generateBadgesSection(content: Record<string, any>, licenseType?: string): string {
  const selected: string[] = Array.isArray(content.selected) ? content.selected : [];
  const badges: string[] = [];

  if (licenseType) {
    const licenseBadgeUrl = getLicenseBadgeUrl(licenseType);
    if (licenseBadgeUrl) {
      badges.push(`![License: ${licenseType}](${licenseBadgeUrl})`);
    }
  }

  selected.forEach((key) => {
    if (key.startsWith('__custom__')) {
      const rest = key.slice('__custom__'.length);
      const [label, color, logo] = rest.split('|');
      const encoded = encodeBadgeLabel(label || 'Badge');
      const c = (color || '555555').replace('#', '');
      const logoParam = logo ? `&logo=${logo}&logoColor=white` : '';
      badges.push(`![${label}](https://img.shields.io/badge/${encoded}-${c}?style=flat${logoParam})`);
    } else {
      const badgeUrl = getTechBadgeUrl(key);
      if (badgeUrl) badges.push(`![${key}](${badgeUrl})`);
    }
  });

  if (!badges.length) return '';
  return badges.join(' ');
}

function generateTechStackSection(content: Record<string, any>): string {
  const rows = Array.isArray(content.rows) ? content.rows : [];
  const validRows = rows.filter(
    (row) => (row.technology as string)?.trim() || (row.purpose as string)?.trim()
  );
  if (!validRows.length) return '';

  const header = '| Technology | Purpose | Layer |\n| --- | --- | --- |';
  const tableRows = validRows
    .map((row) => {
      const tech = (row.technology as string)?.trim() || '';
      const purpose = (row.purpose as string)?.trim() || '';
      const layer = (row.layer as string)?.trim() || 'Other';
      return `| ${tech} | ${purpose} | ${layer} |`;
    })
    .join('\n');

  return `## Tech Stack\n\n${header}\n${tableRows}`;
}

function generateInstallationSection(content: Record<string, any>): string {
  const lang = content.lang || 'bash';
  const code = (content.code as string || '').trim();
  if (!code) return '';
  return `## Installation\n\n\`\`\`${lang}\n${code}\n\`\`\``;
}

function generateUsageSection(content: Record<string, any>): string {
  const desc = (content.description as string || '').trim();
  const code = (content.exampleCode as string || '').trim();
  if (!desc && !code) return '';
  const parts: string[] = [];
  if (desc) parts.push(desc);
  if (code) parts.push(`\`\`\`javascript\n${code}\n\`\`\``);
  return `## Usage\n\n${parts.join('\n\n')}`;
}

function generateFolderStructureSection(content: Record<string, any>): string {
  // parsedTree is written by the new parse workflow; tree is the legacy field
  const tree = ((content.parsedTree as string) || (content.tree as string) || '').trim();
  if (!tree) return '';
  return `## Folder Structure\n\n\`\`\`\n${tree}\n\`\`\``;
}

function generateApiReferenceSection(content: Record<string, any>): string {
  const rows = Array.isArray(content.rows) ? content.rows : [];
  const validRows = rows.filter(
    (row) => row.endpoint?.trim() || row.method?.trim() || row.description?.trim()
  );
  if (!validRows.length) return '';

  const tableHeader = '| Endpoint | Method | Description |\n| --- | --- | --- |';
  const tableRows = validRows
    .map((row) => {
      const ep = row.endpoint?.trim() || '';
      const method = row.method?.trim() || 'GET';
      const desc = row.description?.trim() || '';
      const epStr = ep ? `\`${ep}\`` : '';
      const methodStr = method ? `\`${method}\`` : '';
      return `| ${epStr} | ${methodStr} | ${desc} |`;
    })
    .join('\n');

  return `## API Reference\n\n${tableHeader}\n${tableRows}`;
}

function generateScreenshotsSection(content: Record<string, any>): string {
  const rows = Array.isArray(content.rows) ? content.rows : [];
  const images = rows
    .map((row) => {
      const url = (row.imageUrl as string || '').trim();
      const alt = (row.altText as string || '').trim() || 'Screenshot';
      return url ? `![${alt}](${url})` : '';
    })
    .filter(Boolean);

  if (!images.length) return '';
  return `## Screenshots\n\n${images.join('\n\n')}`;
}

function generateContributingSection(content: Record<string, any>): string {
  const text = (content.text as string || '').trim();
  if (!text) return '';
  return `## Contributing\n\n${text}`;
}

function generateLicenseSection(content: Record<string, any>): string {
  const lic = content.license || 'MIT';
  let desc: string;
  switch (lic) {
    case 'MIT':
      desc = 'Distributed under the MIT License. See `LICENSE` for more information.';
      break;
    case 'Apache 2.0':
      desc = 'Distributed under the Apache 2.0 License. See `LICENSE` for more information.';
      break;
    case 'GPL v3':
      desc = 'Distributed under the GPL v3 License. See `LICENSE` for more information.';
      break;
    case 'BSD-3-Clause':
      desc = 'Distributed under the BSD 3-Clause License. See `LICENSE` for more information.';
      break;
    case 'Unlicense':
      desc = 'This is free and unencumbered software released into the public domain.';
      break;
    default:
      desc = `Distributed under the ${lic} License.`;
  }
  return `## License\n\n${desc}`;
}

// ── Main export ────────────────────────────────────────────────────────────

const SECTION_HEADINGS: Record<string, string> = {
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

function generateTableOfContents(sections: Section[]): string {
  const enabled = sections.filter(
    (s) => s.enabled && s.type !== 'badges' && s.type !== 'about'
  );
  if (!enabled.length) return '';
  const items = enabled.map((s) => {
    const label = SECTION_HEADINGS[s.type] ?? s.type;
    const anchor = label.toLowerCase().replace(/\s+/g, '-');
    return `- [${label}](#${anchor})`;
  });
  return `## Table of Contents\n\n${items.join('\n')}`;
}

export function generateMarkdown(sections: Section[]): string {
  const licenseSection = sections.find((s) => s.type === 'license' && s.enabled);
  const licenseType = licenseSection?.content?.license;

  // ── Title block (always first) ──────────────────────────────────────────
  const aboutSection = sections.find((s) => s.type === 'about');
  const projectName = (aboutSection?.content?.projectName as string || '').trim();
  const tagline     = (aboutSection?.content?.tagline     as string || '').trim();
  const description = (aboutSection?.content?.description as string || '').trim();

  const titleLines: string[] = [];
  if (projectName) titleLines.push(`# ${projectName}`);
  if (tagline)     titleLines.push(`\n> ${tagline}`);
  if (description) titleLines.push(`\n${description}`);
  const titleBlock = titleLines.join('\n');

  // ── Section bodies ───────────────────────────────────────────────────────
  const parts = sections
    .filter((s) => s.enabled)
    .map((s) => {
      switch (s.type) {
        case 'about':           return generateAboutSection(s.content as Record<string, string>);
        case 'features':        return generateFeaturesSection(s.content as Record<string, string[]>);
        case 'contact':         return generateContactSection(s.content as Record<string, string>);
        case 'badges':          return generateBadgesSection(s.content, licenseType);
        case 'techstack':       return generateTechStackSection(s.content);
        case 'installation':    return generateInstallationSection(s.content);
        case 'usage':           return generateUsageSection(s.content);
        case 'folderstructure': return generateFolderStructureSection(s.content);
        case 'apireference':    return generateApiReferenceSection(s.content);
        case 'screenshots':     return generateScreenshotsSection(s.content);
        case 'contributing':    return generateContributingSection(s.content);
        case 'license':         return generateLicenseSection(s.content);
        default:                return '';
      }
    })
    .filter(Boolean);

  if (!parts.length && !titleBlock) {
    return '*Start filling in sections on the left to see your README here.*';
  }

  const toc = generateTableOfContents(sections);
  const badgesSection = sections.find((s) => s.type === 'badges' && s.enabled);
  const output: string[] = [];

  // 1. Title block
  if (titleBlock) output.push(titleBlock);

  // 2. Badges
  if (badgesSection) {
    const badgesMd = generateBadgesSection(badgesSection.content, licenseType);
    if (badgesMd) output.push(badgesMd);
  }

  // 3. Table of Contents
  if (toc) output.push(toc);

  // 4. Section bodies (skip badges — already rendered above)
  const nonBadgeParts = parts.filter((_, i) => {
    const enabledSections = sections.filter((s) => s.enabled);
    return enabledSections[i]?.type !== 'badges';
  });
  output.push(...nonBadgeParts);

  return output.join('\n\n');
}

