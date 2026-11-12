export interface PackageItem {
  id: string;
  tier: string;
  title: string;
  desc: string;
  features: string[];
  hot?: boolean;
  service: string;
}

export const packages: PackageItem[] = [
  {
    id: 'launch',
    tier: 'LAUNCH',
    title: 'Get online',
    desc: 'For new businesses that need a strong start.',
    features: [
      'Website or online store',
      'Logo and brand graphics',
      'Social media setup',
      'Google Business profile',
    ],
    service: 'Web Development',
  },
  {
    id: 'automate',
    tier: 'AUTOMATE',
    title: 'Work smarter',
    desc: 'For businesses losing time on manual work.',
    features: [
      'AI chatbot on web and WhatsApp',
      'Lead and CRM automation',
      'Automatic follow-ups',
      'Monthly improvements',
    ],
    hot: true,
    service: 'AI Automation',
  },
  {
    id: 'grow',
    tier: 'GROW',
    title: 'Full growth engine',
    desc: 'For brands ready to scale every channel.',
    features: [
      'Website and automation',
      'Monthly content and ads',
      'AI videos and edited Reels',
      'Dedicated account manager',
    ],
    service: 'Social Media Marketing',
  },
];

