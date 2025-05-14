'use client';

import TestFilters from '@/components/TestFilters';
import TestList from '@/components/TestList';
import { useMemo, useState } from 'react';

interface SpeakingTest {
  id: string;
  type: string;
  title: string;
  testUrl: string;
  description: string;
}

export default function SpeakingTestsPage() {
  const [tests] = useState<SpeakingTest[]>([
    {
      id: '1',
      type: 'Academic',
      title: 'Academic Speaking Test 1',
      testUrl: '/ielts-tests/speaking/1',
      description: 'Practice your speaking skills with this academic test featuring various topics.'
    },
    {
      id: '2',
      type: 'Academic',
      title: 'Academic Speaking Test 2',
      testUrl: '/ielts-tests/speaking/2',
      description: 'Another academic speaking test to help you prepare for the IELTS exam.'
    },
    {
      id: '3',
      type: 'General',
      title: 'General Speaking Test 1',
      testUrl: '/ielts-tests/speaking/3',
      description: 'Practice your speaking skills with this general training test featuring everyday topics.'
    },
    {
      id: '4',
      type: 'General',
      title: 'General Speaking Test 2',
      testUrl: '/ielts-tests/speaking/4',
      description: 'Another general training speaking test to help you prepare for the IELTS exam.'
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
            title="Speaking Tests" 
            description=""
          />
        </div>
      </div>
    </div>
  );
} 