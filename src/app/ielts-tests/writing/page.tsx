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
      id: 'academic-task-1-chart',
      type: 'Academic',
      title: 'Academic Writing Task 1 - Chart',
      testUrl: '/ielts-tests/writing/academic-task-1-chart',
      description: 'Practice your writing skills with this Academic Task 1 test about charts and graphs.'
    },
    {
      id: 'academic-task-2-essay',
      type: 'Academic',
      title: 'Academic Writing Task 2 - Essay',
      testUrl: '/ielts-tests/writing/academic-task-2-essay',
      description: 'Practice writing an academic essay with this Task 2 test about education and community service.'
    },
    {
      id: 'general-task-1-letter',
      type: 'General',
      title: 'General Writing Task 1 - Letter',
      testUrl: '/ielts-tests/writing/general-task-1-letter',
      description: 'Practice your letter writing skills with this General Training Task 1 test.'
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