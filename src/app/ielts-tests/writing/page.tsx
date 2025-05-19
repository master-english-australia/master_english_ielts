'use client';

import TestFilters from '@/components/TestFilters';
import TestList from '@/components/TestList';
import { useMemo, useState } from 'react';

interface WritingTest {
  id: string;
  type: string;
  title: string;
  testUrl: string;
  description: string;
}

export default function WritingTestsPage() {
  const [tests] = useState<WritingTest[]>([
    {
      id: 'academic-writing-test',
      type: 'Academic',
      title: 'Academic Writing Test',
      testUrl: '/ielts-tests/writing/academic-writing-test',
      description: 'Practice both Academic Writing Task 1 (Chart/Graph) and Task 2 (Essay) in a single test.'
    }
  ]);

  const [filters, setFilters] = useState({
    search: '',
    testType: 'All'
  });

  const handleFilterChange = (newFilters: { search: string; testType: string }) => {
    setFilters(newFilters);
  };

  const filteredTestList = useMemo(() => {
    return tests.filter(test => {
      // Filter by test type
      if (filters.testType !== 'All' && test.type !== filters.testType) {
        return false;
      }
      
      // Filter by search query
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        return (
          test.title.toLowerCase().includes(searchLower) ||
          test.description.toLowerCase().includes(searchLower)
        );
      }
      
      return true;
    });
  }, [tests, filters]);

  return (
    <div className="ielts-tests-container">
      <div className="page-content">
        <div className="sidebar">
          <TestFilters onFilterChange={handleFilterChange} />
        </div>
        <div className="main-content">
          <TestList 
            tests={filteredTestList} 
            title="Writing Tests" 
            description="Practice your IELTS writing skills with these tasks."
          />
        </div>
      </div>
    </div>
  );
} 