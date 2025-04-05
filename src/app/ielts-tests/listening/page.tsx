'use client';

import TestFilters from '@/components/TestFilters';
import TestList from '@/components/TestList';
import { useState } from 'react';

// Sample data for the listening tests
const mockTests = [
  {
    id: '1',
    type: 'Form Completion',
    title: 'Cambridge IELTS 19 Listening Test 4 (Section 1)',
    testUrl: '/ielts-tests/listening/cambridge-19-test-4-s1',
  },
  {
    id: '2',
    type: 'Multiple Choice',
    title: 'Cambridge IELTS 19 Listening Test 4 (Section 2)',
    testUrl: '/ielts-tests/listening/cambridge-19-test-4-s2',
  },
  {
    id: '3',
    type: 'Matching',
    title: 'Cambridge IELTS 19 Listening Test 4 (Section 3)',
    testUrl: '/ielts-tests/listening/cambridge-19-test-4-s3',
  },
  {
    id: '4',
    type: 'Summary Completion',
    title: 'Cambridge IELTS 19 Listening Test 4 (Section 4)',
    testUrl: '/ielts-tests/listening/cambridge-19-test-4-s4',
  },
  {
    id: '5',
    type: 'Full Test',
    title: 'Cambridge IELTS 19 Listening Test 4',
    testUrl: '/ielts-tests/listening/cambridge-19-test-4',
  },
  {
    id: '6',
    type: 'Note Completion',
    title: 'Cambridge IELTS 19 Listening Test 3 (Section 1)',
    testUrl: '/ielts-tests/listening/cambridge-19-test-3-s1',
  },
  {
    id: '7',
    type: 'Table Completion',
    title: 'Cambridge IELTS 19 Listening Test 3 (Section 2)',
    testUrl: '/ielts-tests/listening/cambridge-19-test-3-s2',
  },
  {
    id: '8',
    type: 'Multiple Choice',
    title: 'Cambridge IELTS 19 Listening Test 3 (Section 3)',
    testUrl: '/ielts-tests/listening/cambridge-19-test-3-s3',
  },
  {
    id: '9',
    type: 'Sentence Completion',
    title: 'Cambridge IELTS 19 Listening Test 3 (Section 4)',
    testUrl: '/ielts-tests/listening/cambridge-19-test-3-s4',
  },
  {
    id: '10',
    type: 'Full Test',
    title: 'Cambridge IELTS 19 Listening Test 3',
    testUrl: '/ielts-tests/listening/cambridge-19-test-3',
  },
];

export default function ListeningTestsPage() {
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
    
    // Filter by test type (Academic/General)
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
            title="Free Online IELTS Listening Test Collection" 
            description="Explore our extensive library of 1000+ Free Online IELTS Listening Practice Tests & Solutions, carefully categorized by type."
          />
        </div>
      </div>
    </div>
  );
} 