'use client';

import Link from 'next/link';
import { useState } from 'react';

export interface TestCardProps {
  type: string;
  title: string;
  testUrl: string;
  questionType?: string;
}

export default function TestCard({ type, title, testUrl, questionType }: TestCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className={`test-card ${isHovered ? 'hover' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="test-card-type">
        <span className="test-tag">{type}</span>
        {questionType && <span className="question-tag">{questionType}</span>}
      </div>
      <h3 className="test-title">{title}</h3>
      <Link href={testUrl} className="take-test-btn">
        Take Test
      </Link>
    </div>
  );
} 