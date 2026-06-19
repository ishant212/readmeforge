// parseTreeOutput.ts — two-step folder structure parser

const EXCLUDED_NAMES = new Set([
  'node_modules', 'dist', 'build', '.git', 'coverage',
  '.next', '.cache', '.turbo', '__pycache__', '.venv', 'venv',
]);

function isExcluded(name: string): boolean {
  return EXCLUDED_NAMES.has(name.trim().toLowerCase().replace(/\/$/, ''));
}

export interface TreeNode {
  name: string;
  type: 'file' | 'folder';
  children: TreeNode[];
}

// ── Parse Get-ChildItem -Name output ─────────────────────────────────────────
// One entry per line; no extension = folder.
export function parseGetChildItem(raw: string): TreeNode[] {
  return raw
    .split('\n')
    .map((l) => l.trim())
    .filter((l) => l && !isExcluded(l))
    .map((name): TreeNode => {
      const isFile = /\.[^/\\]+$/.test(name);
      return { name, type: isFile ? 'file' : 'folder', children: [] };
    });
}

// ── Parse `tree src /A /F` output ────────────────────────────────────────────
// Windows tree uses 4-char depth chunks: "|   ", "+---", "\---"
function stripTreePrefix(line: string): { depth: number; name: string } | null {
  let i = 0;
  let depth = 0;
  while (i < line.length) {
    const chunk = line.slice(i, i + 4);
    if (/^[|+\\]\s{3}/.test(chunk) || /^\s{4}/.test(chunk)) {
      depth++;
      i += 4;
    } else {
      break;
    }
  }
  const rest = line.slice(i).replace(/^[+\\]---\s*/, '').trim();
  if (!rest || rest === 'No subfolders exist.') return null;
  return { depth, name: rest };
}

export function parseSrcTree(raw: string): TreeNode[] {
  const lines = raw.split('\n').filter((l) => /[|+\\]/.test(l));
  const roots: TreeNode[] = [];
  const stack: Array<{ node: TreeNode; depth: number }> = [];

  for (const line of lines) {
    const parsed = stripTreePrefix(line);
    if (!parsed) continue;
    const { depth, name } = parsed;
    if (isExcluded(name)) continue;

    const node: TreeNode = { name, type: 'folder', children: [] };

    while (stack.length > 0 && stack[stack.length - 1].depth >= depth) stack.pop();

    if (stack.length === 0) roots.push(node);
    else stack[stack.length - 1].node.children.push(node);

    stack.push({ node, depth });
  }

  // Classify leaf nodes: file if has extension
  function classify(nodes: TreeNode[]): void {
    for (const n of nodes) {
      if (n.children.length > 0) { n.type = 'folder'; classify(n.children); }
      else n.type = n.name.includes('.') ? 'file' : 'folder';
    }
  }
  classify(roots);
  return roots;
}

// ── Render TreeNode[] → box-drawing string ────────────────────────────────────
export function renderTree(nodes: TreeNode[], prefix = ''): string {
  return nodes
    .map((node, idx) => {
      const isLast = idx === nodes.length - 1;
      const connector = isLast ? '└── ' : '├── ';
      const childPrefix = isLast ? '    ' : '│   ';
      const displayName = node.type === 'folder' ? `${node.name}/` : node.name;
      const line = `${prefix}${connector}${displayName}`;
      const children =
        node.children.length > 0 ? '\n' + renderTree(node.children, prefix + childPrefix) : '';
      return line + children;
    })
    .join('\n');
}

// ── Main combinator ───────────────────────────────────────────────────────────
export function buildCombinedTree(
  rawTopLevel: string,
  rawSrcTree: string,
  rootName: string,
): string {
  const topNodes = parseGetChildItem(rawTopLevel);
  if (topNodes.length === 0) throw new Error('No top-level nodes parsed');

  if (rawSrcTree.trim()) {
    const srcNodes = parseSrcTree(rawSrcTree);
    if (srcNodes.length > 0) {
      // Extract root folder name from first non-blank, non-tree-char line of src paste
      const srcRootLine = rawSrcTree
        .split('\n')
        .find((l) => l.trim() && !/^[|+\\]/.test(l.trim()));
      const srcRootName = srcRootLine?.trim().toLowerCase() ?? 'src';

      // Find matching top-level folder node (exact name match, case-insensitive)
      const matchIdx = topNodes.findIndex(
        (n) =>
          n.type === 'folder' &&
          n.name.toLowerCase() === srcRootName.toLowerCase(),
      );
      if (matchIdx !== -1) {
        topNodes[matchIdx].children = srcNodes;
      }
    }
  }

  const childrenStr = renderTree(topNodes);
  return `${rootName}/\n${childrenStr}`;
}
