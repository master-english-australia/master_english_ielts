'use client';

import { useState } from 'react';

interface FeatureCardProps {
  title: string;
  description: string;
}

export default function FeatureCard({ title, description }: FeatureCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    console.log(`User clicked on feature: ${title}`);
    alert(`You selected: ${title}\nThis feature will be implemented by the Cursor Agent.`);
  };

  return (
    <div 
      className={`feature-card ${isHovered ? 'hover' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
} 