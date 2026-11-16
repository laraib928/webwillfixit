import React from 'react';
import Hero from '@/components/Hero';
import Manifesto from '@/components/Manifesto';
import HorizontalServices from '@/components/HorizontalServices';
import Stats from '@/components/Stats';
import WorkStack from '@/components/WorkStack';
import BigCta from '@/components/BigCta';
import BlockWipe from '@/components/BlockWipe';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Manifesto />
      <HorizontalServices />
      <Stats />
      <WorkStack />
      <BigCta />
      <BlockWipe />
    </>
  );
}


