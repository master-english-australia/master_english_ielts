'use client';

import FeatureCard from '@/components/FeatureCard';
import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    console.log('IELTS Master application loaded');
  }, []);

  const features = [
    {
      title: 'Speaking Practice',
      description: 'Practice your IELTS speaking skills with AI-powered conversations.',
    },
    {
      title: 'Writing Assessment',
      description: 'Get your IELTS essays evaluated with detailed feedback.',
    },
    {
      title: 'Reading Exercises',
      description: 'Improve your reading comprehension with IELTS-style passages.',
    },
    {
      title: 'Listening Tests',
      description: 'Enhance your listening skills with authentic IELTS audio tests.',
    },
  ];

  return (
    <main className="design-mockup">
      <h1>IELTS Master</h1>
      <p>This is a design mockup for the Cursor Agent to work with.</p>
      <div className="feature-grid">
        {features.map((feature, index) => (
          <FeatureCard 
            key={index}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </div>
    </main>
  );
} 