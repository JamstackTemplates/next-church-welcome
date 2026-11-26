interface TeamMember { id: string; name: string; role: string; line: string }

export const team: readonly TeamMember[] = [
  { id: 'ruth-okafor', name: 'Ruth Okafor', role: 'Lead Pastor', line: 'Find Ruth by the fellowship hall after worship.' },
  { id: 'daniel-reyes', name: 'Daniel Reyes', role: 'Associate Pastor', line: 'Talk with Daniel about small groups and pastoral care.' },
  { id: 'mae-holloway', name: 'Mae Holloway', role: 'Kids’ Trail Director', line: 'Find Mae by the blue door on Sunday.' },
  { id: 'tom-bennett', name: 'Tom Bennett', role: 'Office Manager', line: 'Ask Tom about the building, office hours or giving statements.' },
];
