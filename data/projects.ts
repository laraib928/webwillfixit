export interface ProjectItem {
  id: string;
  index: number;
  cat: 'AI Automation' | 'Web Development' | 'E-commerce' | 'Web Apps' | 'AI Chatbots';
  title: string;
  line: string;
  tags: string[];
  tone: 't1' | 't2' | 't3' | 't4' | 't5';
  prob: string;
  sol: string;
  url: string;
  live: boolean;
  isBig: boolean;
  artType: 'postly' | 'aidigital' | 'bitsnbobs' | 'viralzy' | 'chatbot' | 'timera';
}

export const projects: ProjectItem[] = [
  {
    id: 'postly',
    index: 0,
    cat: 'AI Automation',
    title: 'Postly',
    line: 'A social media automation platform that publishes to every channel from one place.',
    tags: ['Next.js', 'Supabase', 'n8n', 'Meta Graph API', 'YouTube API', 'TikTok API'],
    tone: 't1',
    prob: 'Managing posts for many brands across Facebook, Instagram, LinkedIn, YouTube, TikTok and Pinterest meant logging into each platform separately, every day.',
    sol: 'We built Postly: connect every account once, write a post, get it approved and schedule it. An n8n pipeline then publishes it automatically to each platform, with encrypted account tokens and an admin dashboard showing everything that went live.',
    url: '',
    live: false,
    isBig: true,
    artType: 'postly',
  },
  {
    id: 'ai-digital-division',
    index: 1,
    cat: 'Web Development',
    title: 'AI & Digital Division website',
    line: 'Corporate website for a growth agency serving Pakistan and Saudi Arabia.',
    tags: ['React', 'Animation', 'SEO', 'WhatsApp'],
    tone: 't5',
    prob: 'The agency needed one website to present nine service areas, its growth packages and offices in two countries.',
    sol: 'We designed and built a modern, animated site with a clear service ecosystem, impact numbers, packages, testimonials, FAQ and quick WhatsApp contact.',
    url: 'https://www.aidigitaldivision.com/',
    live: false,
    isBig: false,
    artType: 'aidigital',
  },
  {
    id: 'bits-n-bobs',
    index: 2,
    cat: 'E-commerce',
    title: "Bits'N'Bobs",
    line: 'Shopify wholesale store for a UK supplier serving 10,000+ independent retailers.',
    tags: ['Shopify', 'E-commerce', 'UK'],
    tone: 't4',
    prob: 'A UK wholesaler with 35 years of trading needed retailers to browse and order its convenience products online.',
    sol: 'We worked on the Shopify store so shop owners can find products by category, from cosmetics and DIY to stationery, and order wholesale stock easily on any device.',
    url: 'https://bitsnbobs.co/',
    live: false,
    isBig: false,
    artType: 'bitsnbobs',
  },
  {
    id: 'viralzy',
    index: 3,
    cat: 'Web Apps',
    title: 'Viralzy',
    line: 'A content discovery platform for finding, filtering and transcribing viral videos.',
    tags: ['Web app', 'Dashboard', 'Transcription'],
    tone: 't2',
    prob: 'Creators waste hours scrolling to find content ideas that are already working.',
    sol: 'We built Viralzy with a dashboard to discover trending videos, filter them, save favourites and transcribe them into text for faster content research.',
    url: 'https://www.viralzy.com/',
    live: false,
    isBig: true,
    artType: 'viralzy',
  },
  {
    id: 'ai-lead-chatbot',
    index: 4,
    cat: 'AI Chatbots',
    title: 'AI lead & support chatbot',
    line: 'A website assistant that answers questions and captures leads 24/7.',
    tags: ['Chatbot', 'Lead capture', 'Website'],
    tone: 't3',
    prob: 'Visitors leave when their question isn’t answered straight away, especially outside office hours.',
    sol: 'We built a chat assistant that answers common questions about services, pricing and timelines, then collects the visitor’s name, email and needs for the team. It’s running on this website, so you can try it now.',
    url: '',
    live: true,
    isBig: false,
    artType: 'chatbot',
  },
  {
    id: 'timera-watches',
    index: 5,
    cat: 'E-commerce',
    title: 'TIMERA Watches',
    line: 'Online watch store selling luxury-styled timepieces across Pakistan.',
    tags: ['E-commerce', 'Cash on delivery', 'WhatsApp support'],
    tone: 't2',
    prob: 'A new watch brand wanted to sell directly to customers across Pakistan, without showrooms or middlemen.',
    sol: 'We built a premium, mobile-first store with collections for steel, Arabic dial and strap watches, bundle deals, cash on delivery and WhatsApp support, so buyers can order in a few taps.',
    url: 'https://timerawatches.store/',
    live: false,
    isBig: true,
    artType: 'timera',
  },
];

