import type { GlassColor } from './ministries.ts';

interface BudgetItem { id: string; label: string; percent: number; glass: GlassColor; detail: string }

export const budget: readonly BudgetItem[] = [
  { id: 'local-care', label: 'Food pantry & local care', percent: 22, glass: 'amber', detail: 'Groceries for neighbours and practical help in a hard week.' },
  { id: 'kids-youth', label: 'Kids & youth', percent: 18, glass: 'sky', detail: 'Classroom supplies, youth meals and help with retreat fees.' },
  { id: 'staff', label: 'Pastoral staff', percent: 30, glass: 'rose', detail: 'Pay for the people who teach, lead worship and care for the church.' },
  { id: 'building', label: 'Building & utilities', percent: 17, glass: 'sage', detail: 'Heat, lights and upkeep for the church and fellowship hall.' },
  { id: 'missions', label: 'Partners & missions', percent: 13, glass: 'amber', detail: 'Support for partner ministries and work beyond the valley.' },
];
