export interface TeamMember {
  name: string;
  role: string;
  image: string;
  alt: string;
  tags: string[];
}

export interface FounderCred {
  tag: string;
  title: string;
  desc: string;
}

export interface FounderInfo {
  name: string;
  initials: string;
  role: string;
  heading: string;
  bio: string[];
  creds: FounderCred[];
}

export const founder: FounderInfo = {
  name: 'Waqar Ahmed Abbasi',
  initials: 'WA',
  role: 'FOUNDER & DIRECTOR · UK',
  heading: 'The person you deal with.',
  bio: [
    'Waqar leads client relationships and strategy for Webwillfixit in the UK. He spent more than 30 years in British broadcasting with the BBC and on charity boards, so he knows how to tell a story, run a project responsibly and look after a client.',
    'He makes sure every project is clear, fairly priced and delivered on time, while our technical team does the building.',
  ],
  creds: [
    { tag: 'MEDIA', title: 'Former BBC broadcaster', desc: 'Radio and content background' },
    { tag: 'BUSINESS', title: 'MBA', desc: 'University of East London' },
    { tag: 'GOVERNANCE', title: 'Charity board member', desc: 'Friends of the Earth, BBC Children in Need' },
  ],
};

export const teamMembers: TeamMember[] = [
  {
    name: 'Laraib Rafique',
    role: 'Software Engineer',
    image: '/team/laraib.jpg',
    alt: 'Portrait of Laraib Rafique',
    tags: ['React', 'Next.js', 'Node.js', 'n8n', 'AI automation'],
  },
  {
    name: 'Kashif Khan',
    role: 'Social Media Specialist',
    image: '/team/kashif.jpg',
    alt: 'Portrait of Kashif Khan',
    tags: ['Meta Ads', 'Instagram', 'TikTok', 'Content plans'],
  },
  {
    name: 'Rafay',
    role: 'Graphic Designer',
    image: '/team/rafay.jpg',
    alt: 'Portrait of Rafay',
    tags: ['Branding', 'Logos', 'Social posts', 'Print'],
  },
];

