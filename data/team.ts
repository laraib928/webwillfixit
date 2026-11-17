export interface TeamMember {
  name: string;
  role: string;
  image: string;
  alt: string;
  intro: string;
  highlights: string[];
  chips: string[];
  tags: string[];
}

export interface FounderCred {
  tag: string;
  title: string;
  desc: string;
}

export interface TimelineItem {
  period: string;
  role: string;
  org: string;
}

export interface FounderInfo {
  name: string;
  initials: string;
  role: string;
  image: string;
  heading: string;
  bio: string[];
  creds: FounderCred[];
  timeline: TimelineItem[];
}

export const founder: FounderInfo = {
  name: 'Waqar Ahmed Abbasi',
  initials: 'WA',
  role: 'Founder & Director · UK',
  image: '/team/waqar.jpg',
  heading: 'The person you deal with.',
  bio: [
    'Over three decades of experience leading and shaping impactful initiatives across equality, education, media and the community sector, with a particular focus on amplifying under-represented voices and creating opportunities for meaningful social and organisational change.',
    "Career highlights include securing Greater Manchester's first permanent full-time South Asian and Muslim-led FM radio licence, following more than six decades of unsuccessful attempts to establish a permanent service for these communities; initiating, producing and presenting multilingual content across multiple BBC local radio stations; and establishing the first all-female cohort in the history of The Prince's Trust (now King's Trust) personal development programme.",
    'Known for combining vision with practical action, with a people-first approach grounded in empathy, determination and an ability to bring clarity to complex situations. Experienced in building initiatives from the ground up, navigating challenges, bringing people together and creating environments where innovation, equality, education and community empowerment can thrive.',
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
  timeline: [
    {
      period: '2017–2020',
      role: 'Head / Station Manager',
      org: 'Heritage FM, Manchester',
    },
    {
      period: '2014–2015',
      role: 'Head of Public Relations',
      org: 'Syria Relief Charity, UK',
    },
    {
      period: '2005–2008',
      role: 'Media Spokesperson (Volunteer)',
      org: 'CAFOD, North West UK',
    },
    {
      period: '1997–1998',
      role: 'Researcher',
      org: 'BBC Pebble Mill, Birmingham',
    },
    {
      period: '1995–1996',
      role: 'Granada Television',
      org: 'Manchester',
    },
    {
      period: '1991–1999',
      role: 'Presenter / Reporter',
      org: 'BBC North West Asian Programmes, BBC Radio Berkshire, BBC Somerset Sound & BBC Wiltshire Sound',
    },
    {
      period: '1989–1990',
      role: 'Researcher',
      org: 'CIGO FM Radio, Port Hawkesbury, Nova Scotia, Canada',
    },
  ],
};

export const teamMembers: TeamMember[] = [
  {
    name: 'Laraib Rafique',
    role: 'AI Automation Expert & Full Stack Developer',
    image: '/team/laraib.jpg',
    alt: 'Portrait of Laraib Rafique',
    intro:
      'Laraib builds production-ready web applications and intelligent automations. From React and Next.js frontends to Node.js and Supabase backends, he connects AI and automation to real business workflows so teams can work faster with less manual effort.',
    highlights: [
      'Leads development of a social media automation platform that auto-publishes to Facebook, Instagram, LinkedIn, YouTube, TikTok and Pinterest from a single dashboard.',
      'Designs n8n automation pipelines, secure OAuth account connections and LLM-powered tools, including WhatsApp auto-reply and lead qualification systems.',
      'Builds full-stack products such as AI chatbots, quote generators with PDF output, content discovery platforms and a real estate ERP portal.',
      'BS Computer Science, with DeepLearning.AI specializations in NLP and Deep Learning.',
    ],
    chips: [
      'React',
      'Next.js',
      'TypeScript',
      'Node.js',
      'Supabase',
      'n8n',
      'OpenAI',
      'Gemini',
      'Stripe',
      'Vercel',
    ],
    tags: ['React', 'Next.js', 'Node.js', 'n8n', 'AI automation'],
  },
  {
    name: 'Kashif',
    role: 'Social Media Specialist & Digital Marketer',
    image: '/team/kashif.jpg',
    alt: 'Portrait of Kashif',
    intro:
      'Kashif drives traffic, engagement and growth through SEO, Meta Ads and social media management, with hands-on experience running and optimizing Shopify stores.',
    highlights: [
      'Manages content and campaigns across Facebook and Instagram, tracking performance to improve strategy and brand visibility.',
      'Plans and optimizes Meta Ads campaigns focused on reach, engagement and lead generation.',
      'Delivers on-page and off-page SEO to improve rankings and organic traffic.',
      'Handles Shopify product listings, store optimization and overall store performance.',
    ],
    chips: [
      'SEO',
      'Meta Ads',
      'Social Media',
      'Shopify',
      'Content Strategy',
      'Project Management',
    ],
    tags: ['Meta Ads', 'Instagram', 'TikTok', 'Content plans'],
  },
  {
    name: 'Rafay Abbasi',
    role: 'Graphic Designer',
    image: '/team/rafay.jpg',
    alt: 'Portrait of Rafay Abbasi',
    intro:
      'With 13 years of experience, Rafay creates visual concepts for print and digital platforms. His work is guided by clear communication, consistent quality and respect for deadlines.',
    highlights: [
      'Designs logos, brochures, posters, packaging and marketing materials for a diverse range of clients.',
      'Develops visual solutions aligned with brand strategy and client requirements.',
      'Pays close attention to layout, color and typography to deliver polished results.',
      'Also edits video content for social and marketing use.',
    ],
    chips: [
      'Branding',
      'Logo Design',
      'Print & Layout',
      'Illustrator',
      'Photoshop',
      'InDesign',
      'CorelDRAW',
      'CapCut',
    ],
    tags: ['Branding', 'Logos', 'Social posts', 'Print'],
  },
];
