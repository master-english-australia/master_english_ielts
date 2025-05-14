'use client';

import TestFilters from '@/components/TestFilters';
import '@/styles/WritingTests.css';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface WritingTest {
  id: string;
  title: string;
  type: string;
  description: string;
}

export default function WritingTestsPage() {
  const router = useRouter();
  const [filteredTests, setFilteredTests] = useState<WritingTest[]>([
    {
      id: 'academic-task-1-chart',
      title: 'Academic Writing Task 1',
      type: 'Academic',
      description: 'Describe the information shown in the graph below.'
    },
    {
      id: 'general-task-1-letter',
      title: 'General Training Writing Task 1',
      type: 'General Training',
      description: 'Write a letter to your friend about your recent holiday.'
    }
  ]);

  const handleFilterChange = (filters: { search: string; testType: string }) => {
    // TODO: Implement filtering logic when we have the backend
    console.log('Filters changed:', filters);
  };

  const handleTakeTest = (testId: string) => {
    router.push(`/writing-test/${testId}`);
  };

  return (
    <main className="writing-tests-page">
      <h1>Writing Tests</h1>
      
      <TestFilters onFilterChange={handleFilterChange} />
      
      <div className="tests-grid">
        {filteredTests.map((test) => (
          <div key={test.id} className="test-card">
            <h2>{test.title}</h2>
            <p className="test-type">{test.type}</p>
            <p className="test-description">{test.description}</p>
            <button 
              className="take-test-btn"
              onClick={() => handleTakeTest(test.id)}
            >
              Take Test
            </button>
          </div>
        ))}
      </div>
    </main>
  );
} 