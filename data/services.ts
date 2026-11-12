export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  lead: string;
  body: string;
  shortDesc: string;
  included: string[];
  tools: string[];
  idealFor: string;
  timeline: string;
  tags: string[];
  iconType: 'web' | 'auto' | 'bot' | 'aiv' | 'edit' | 'smm';
  visual: 'web' | 'auto' | 'bot' | 'aiv' | 'edit' | 'smm';
}

export const services: ServiceItem[] = [
  {
    id: 'svc-web',
    number: '01',
    title: 'Web Development',
    lead: 'Websites that load fast, look premium and turn visitors into enquiries.',
    body: 'From a one-page landing site to a full online store or custom web app. Every build is responsive, SEO-ready and easy for you to update.',
    shortDesc: 'Fast, animated, SEO-ready websites, e-commerce stores and web apps.',
    included: [
      'Business & portfolio websites',
      'E-commerce stores (Shopify, WooCommerce)',
      'Landing pages for ads and launches',
      'Custom web apps and dashboards',
      'Speed, SEO and Core Web Vitals fixes',
      'Hosting, domains and ongoing care',
    ],
    tools: ['React', 'Next.js', 'Node.js', 'Shopify', 'WordPress', 'Tailwind'],
    idealFor: 'Start-ups, shops, service businesses',
    timeline: '2–6 weeks',
    tags: ['React', 'Next.js', 'Shopify', 'WordPress'],
    iconType: 'web',
    visual: 'web',
  },
  {
    id: 'svc-auto',
    number: '02',
    title: 'AI Automation',
    lead: 'Let software do the repetitive work, so your team can focus on customers.',
    body: 'We map how work moves through your business, then connect your tools with AI so leads, emails, invoices and reports run on their own.',
    shortDesc: 'Lead capture, CRM updates, invoices and reports that run on their own.',
    included: [
      'Lead capture and follow-up',
      'CRM and spreadsheet sync',
      'Automatic invoices and reminders',
      'AI email and document processing',
      'Reports sent to you every week',
      'Social media auto-posting',
    ],
    tools: ['n8n', 'Make', 'Zapier', 'OpenAI', 'Google Sheets', 'HubSpot'],
    idealFor: 'Busy teams doing the same task every day',
    timeline: '1–4 weeks',
    tags: ['n8n', 'Make', 'OpenAI', 'CRM'],
    iconType: 'auto',
    visual: 'auto',
  },
  {
    id: 'svc-bot',
    number: '03',
    title: 'AI Chatbots',
    lead: 'A 24/7 assistant that answers customers, books calls and qualifies leads.',
    body: 'Trained on your own products, prices and FAQs. It replies on your website, WhatsApp and Instagram, and hands over to a person when needed.',
    shortDesc: '24/7 assistants for your website, WhatsApp and Instagram, trained on your business.',
    included: [
      'Website chat widget',
      'WhatsApp Business bot',
      'Instagram & Facebook DM replies',
      'Booking and lead qualification',
      'Trained on your own documents',
      'Human handover and chat logs',
    ],
    tools: ['WhatsApp API', 'OpenAI', 'Claude', 'RAG', 'Supabase'],
    idealFor: 'Shops, clinics, agencies, real estate',
    timeline: '1–3 weeks',
    tags: ['WhatsApp', 'Website', 'Instagram'],
    iconType: 'bot',
    visual: 'bot',
  },
  {
    id: 'svc-aiv',
    number: '04',
    title: 'AI Videos',
    lead: 'Professional videos made with AI, in days instead of weeks.',
    body: 'AI presenters, product ads and explainer videos with natural voiceovers in many languages. No camera crew or studio needed.',
    shortDesc: 'AI avatars, product ads and explainers produced in days, not weeks.',
    included: [
      'AI avatar presenter videos',
      'Product and UGC-style ads',
      'Explainer and training videos',
      'Multi-language voiceovers',
      'Short-form clips for social',
      'Scripts written for you',
    ],
    tools: ['HeyGen', 'Runway', 'ElevenLabs', 'Higgsfield', 'CapCut'],
    idealFor: 'Brands running ads, coaches, e-learning',
    timeline: '3–7 days',
    tags: ['Avatars', 'UGC ads', 'Voiceover'],
    iconType: 'aiv',
    visual: 'aiv',
  },
  {
    id: 'svc-edit',
    number: '05',
    title: 'Video Editing',
    lead: 'Edits that keep people watching until the very last second.',
    body: 'Send us raw footage and get back polished Reels, YouTube videos and ads with captions, sound design, motion graphics and colour grading.',
    shortDesc: 'Reels, YouTube and ads with captions, motion graphics and colour grading.',
    included: [
      'Reels, Shorts and TikToks',
      'YouTube long-form editing',
      'Podcast clips and cut-downs',
      'Captions and subtitles',
      'Motion graphics and titles',
      'Colour grading and sound',
    ],
    tools: ['Premiere Pro', 'After Effects', 'DaVinci Resolve', 'CapCut'],
    idealFor: 'Creators, coaches, businesses',
    timeline: '2–5 days per batch',
    tags: ['Reels', 'YouTube', 'Motion'],
    iconType: 'edit',
    visual: 'edit',
  },
  {
    id: 'svc-smm',
    number: '06',
    title: 'Social Media Marketing',
    lead: 'Consistent content and smart ads that bring real customers.',
    body: 'We plan, design and post your content, run paid campaigns on Meta and TikTok, and send you a simple report each month showing what worked.',
    shortDesc: 'Content, posting and paid ads on Meta, TikTok and LinkedIn, with clear monthly reports.',
    included: [
      'Monthly content calendar',
      'Post and story design',
      'Daily posting and community replies',
      'Meta and TikTok ad campaigns',
      'Audience and competitor research',
      'Clear monthly reports',
    ],
    tools: ['Meta Ads', 'TikTok Ads', 'Instagram', 'LinkedIn', 'Canva', 'Analytics'],
    idealFor: 'Local businesses and growing brands',
    timeline: 'Monthly plans',
    tags: ['Meta Ads', 'TikTok', 'Content'],
    iconType: 'smm',
    visual: 'smm',
  },
];

