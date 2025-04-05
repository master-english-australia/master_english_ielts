'use client';

import TestFilters from '@/components/TestFilters';
import TestList from '@/components/TestList';
import { useState } from 'react';

// Sample data for the speaking tests
const mockTests = [
  {
    id: '1',
    type: 'Part 1',
    title: 'IELTS Speaking Part 1: Introduction and Interview',
    testUrl: '/ielts-tests/speaking/part-1-introduction',
  },
  {
    id: '2',
    type: 'Part 1',
    title: 'IELTS Speaking Part 1: Work and Study',
    testUrl: '/ielts-tests/speaking/part-1-work-study',
  },
  {
    id: '3',
    type: 'Part 1',
    title: 'IELTS Speaking Part 1: Hometown and Accommodation',
    testUrl: '/ielts-tests/speaking/part-1-hometown',
  },
  {
    id: '4',
    type: 'Part 2',
    title: 'IELTS Speaking Part 2: Describe a Person',
    testUrl: '/ielts-tests/speaking/part-2-person',
  },
  {
    id: '5',
    type: 'Part 2',
    title: 'IELTS Speaking Part 2: Describe a Place',
    testUrl: '/ielts-tests/speaking/part-2-place',
  },
  {
    id: '6',
    type: 'Part 2',
    title: 'IELTS Speaking Part 2: Describe an Event',
    testUrl: '/ielts-tests/speaking/part-2-event',
  },
  {
    id: '7',
    type: 'Part 3',
    title: 'IELTS Speaking Part 3: Education Discussion',
    testUrl: '/ielts-tests/speaking/part-3-education',
  },
  {
    id: '8',
    type: 'Part 3',
    title: 'IELTS Speaking Part 3: Technology Discussion',
    testUrl: '/ielts-tests/speaking/part-3-technology',
  },
  {
    id: '9',
    type: 'Part 3',
    title: 'IELTS Speaking Part 3: Environment Discussion',
    testUrl: '/ielts-tests/speaking/part-3-environment',
  },
  {
    id: '10',
    type: 'Full Test',
    title: 'IELTS Speaking Full Mock Test: Technology Theme',
    testUrl: '/ielts-tests/speaking/full-test-technology',
  },
  {
    id: '11',
    type: 'Full Test',
    title: 'IELTS Speaking Full Mock Test: Travel Theme',
    testUrl: '/ielts-tests/speaking/full-test-travel',
  },
];

export default function SpeakingTestsPage() {
  const [filteredTests, setFilteredTests] = useState(mockTests);
  
  const handleFilterChange = (filters: {
    search: string;
    testLength: string;
    testType: string;
  }) => {
    let filtered = [...mockTests];
    
    // Filter by search query
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(test => 
        test.title.toLowerCase().includes(searchLower)
      );
    }
    
    // Filter by test length
    if (filters.testLength !== 'All') {
      if (filters.testLength === 'Full Tests') {
        filtered = filtered.filter(test => test.type === 'Full Test');
      } else if (filters.testLength === 'Parts') {
        filtered = filtered.filter(test => test.type !== 'Full Test');
      }
    }
    
    // Filter by test type (if applicable)
    if (filters.testType !== 'All') {
      filtered = filtered.filter(test => 
        test.title.includes(filters.testType)
      );
    }
    
    setFilteredTests(filtered);
  };
  
  return (
    <div className="ielts-tests-container">
      <div className="page-content">
        <div className="sidebar">
          <TestFilters onFilterChange={handleFilterChange} />
        </div>
        <div className="main-content">
          <TestList 
            tests={filteredTests} 
            title="Free Online IELTS Speaking Test Collection" 
            description="Practice with our comprehensive collection of IELTS Speaking questions across all three parts with sample answers and detailed scoring guides."
          />
        </div>
      </div>
    </div>
  );
} 