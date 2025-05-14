'use client';

import WritingTest from '@/components/WritingTest';
import './WritingTest.css';

interface PageProps {
  params: {
    id: string;
  };
}

export default function WritingTestPage({ params }: PageProps) {
  const { id } = params;
  
  if (!id) {
    return (
      <main className="writing-test-page">
        <div className="error-message">Test ID not found</div>
      </main>
    );
  }

  return (
    <main className="writing-test-page">
      <WritingTest testId={id} />
    </main>
  );
} 