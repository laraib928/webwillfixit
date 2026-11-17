/** @type {import('next').NextConfig} */
if (!process.env.NODE_OPTIONS || !process.env.NODE_OPTIONS.includes('--max-old-space-size')) {
  process.env.NODE_OPTIONS = `${process.env.NODE_OPTIONS || ''} --max-old-space-size=1536`.trim();
}

const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['gsap', '@gsap/react', 'lenis'],
  experimental: {
    cpus: 1,
    workerThreads: false,
  },
};

module.exports = nextConfig;
