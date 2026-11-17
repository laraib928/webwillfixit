import type { Metadata, Viewport } from 'next';
import { Unbounded, Manrope, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import ScrollProgress from '@/components/ScrollProgress';
import CustomCursor from '@/components/CustomCursor';
import Chatbot from '@/components/Chatbot';
import Loader from '@/components/Loader';
import SmoothScroll from '@/components/SmoothScroll';
import Footer from '@/components/Footer';

const unbounded = Unbounded({
  subsets: ['latin'],
  weight: ['500', '700', '800', '900'],
  variable: '--font-unbounded',
  display: 'swap',
});

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-manrope',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://webwillfixit.com'),
  title: {
    default: 'Webwillfixit · Complete Digital Solutions',
    template: '%s | Webwillfixit',
  },
  description:
    'Webwillfixit: UK-led digital agency for web development, AI automation, chatbots, AI videos, video editing and social media marketing.',
  keywords: [
    'Web Development',
    'AI Automation',
    'Chatbots',
    'AI Videos',
    'Video Editing',
    'Social Media Marketing',
    'UK Digital Agency',
  ],
  authors: [{ name: 'Webwillfixit' }],
  creator: 'Webwillfixit',
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: 'https://webwillfixit.com',
    siteName: 'Webwillfixit',
    title: 'Webwillfixit · Complete Digital Solutions',
    description:
      'Webwillfixit: UK-led digital agency for web development, AI automation, chatbots, AI videos, video editing and social media marketing.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Webwillfixit · Complete Digital Solutions',
    description:
      'UK-led digital agency for web development, AI automation, chatbots, AI videos, video editing and social media marketing.',
  },
  icons: {
    icon: '/icon.svg',
    shortcut: '/favicon.svg',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#07070a',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${unbounded.variable} ${manrope.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <SmoothScroll>
          <Loader />
          <ScrollProgress />
          <CustomCursor />
          <div className="noise" aria-hidden="true" />
          <Header />
          <main>{children}</main>
          <Footer />
          <Chatbot />
        </SmoothScroll>
      </body>
    </html>
  );
}

