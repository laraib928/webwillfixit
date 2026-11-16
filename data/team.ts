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
  image: string;
  heading: string;
  bio: string[];
  creds: FounderCred[];
}

export const founder: FounderInfo = {
  name: 'Waqar Ahmed Abbasi',
  initials: 'WA',
  role: 'Founder & Director · UK',
  image: '/team/waqar.jpg',
  heading: 'The person you deal with.',
  bio: [
    'Waqar Ahmed Abbasi brings over 30 years of experience across broadcasting, media, social sectors, and national and international charities. Throughout his career, he has developed extensive experience in communication, leadership, community engagement, and building meaningful relationships.',
    'He leads client relationships and strategic direction at Webwillfixit, ensuring every project is approached with clarity, transparency, fair pricing, and a strong commitment to delivering quality results.',
  ],
  creds: [
    {
      tag: 'MEDIA',
      title: 'Former BBC Broadcaster',
      desc: 'Extensive broadcasting and media experience.',
    },
    {
      tag: 'BUSINESS',
      title: 'MBA',
      desc: 'University of East London.',
    },
    {
      tag: 'GOVERNANCE',
      title: 'Charity Board Member',
      desc: 'Experience with Friends of the Earth and BBC Children in Need.',
    },
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

