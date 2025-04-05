'use client';

import TestFilters from '@/components/TestFilters';
import TestList from '@/components/TestList';
import { useState } from 'react';

// Sample data for the tests
const mockTests = [
  {
    id: '1',
    type: 'Yes/No/Not Given',
    title: 'Cambridge IELTS 19 Academic Reading Test 4 (Questions 36-40)',
    testUrl: '/ielts-tests/reading/cambridge-19-test-4-q36-40',
  },
  {
    id: '2',
    type: 'Summary Completion',
    title: 'Cambridge IELTS 19 Academic Reading Test 4 (Questions 31-35)',
    testUrl: '/ielts-tests/reading/cambridge-19-test-4-q31-35',
  },
  {
    id: '3',
    type: 'One Choice',
    title: 'Cambridge IELTS 19 Academic Reading Test 4 (Questions 27-30)',
    testUrl: '/ielts-tests/reading/cambridge-19-test-4-q27-30',
  },
  {
    id: '4',
    type: 'Summary Completion',
    title: 'Cambridge IELTS 19 Academic Reading Test 4 (Questions 24-26)',
    testUrl: '/ielts-tests/reading/cambridge-19-test-4-q24-26',
  },
  {
    id: '5',
    type: 'Matching Features',
    title: 'Cambridge IELTS 19 Academic Reading Test 4 (Questions 18-23)',
    testUrl: '/ielts-tests/reading/cambridge-19-test-4-q18-23',
  },
  {
    id: '6',
    type: 'Matching Information',
    title: 'Cambridge IELTS 19 Academic Reading Test 4 (Questions 14-17)',
    testUrl: '/ielts-tests/reading/cambridge-19-test-4-q14-17',
  },
  {
    id: '7',
    type: 'Note Completion',
    title: 'Cambridge IELTS 19 Academic Reading Test 4 (Questions 07-13)',
    testUrl: '/ielts-tests/reading/cambridge-19-test-4-q07-13',
  },
  {
    id: '8',
    type: 'True/False/Not Given',
    title: 'Cambridge IELTS 19 Academic Reading Test 4 (Questions 01-06)',
    testUrl: '/ielts-tests/reading/cambridge-19-test-4-q01-06',
  },
  {
    id: '9',
    type: 'Full Test',
    title: 'Cambridge IELTS 19 Academic Reading Test 4',
    testUrl: '/ielts-tests/reading/cambridge-19-test-4',
  },
  {
    id: '10',
    type: 'Yes/No/Not Given',
    title: 'Cambridge IELTS 19 Academic Reading Test 3 (Questions 35-40)',
    testUrl: '/ielts-tests/reading/cambridge-19-test-3-q35-40',
  },
  {
    id: '11',
    type: 'Matching Sentence Endings',
    title: 'Cambridge IELTS 19 Academic Reading Test 3 (Questions 31-34)',
    testUrl: '/ielts-tests/reading/cambridge-19-test-3-q31-34',
  },
  {
    id: '12',
    type: 'One Choice',
    title: 'Cambridge IELTS 19 Academic Reading Test 3 (Questions 27-30)',
    testUrl: '/ielts-tests/reading/cambridge-19-test-3-q27-30',
  },
];

export default function ReadingTestsPage() {
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
            title="Free Online IELTS Reading Test Collection" 
            description="Explore our extensive library of 1000+ Free Online IELTS Reading Practice Tests & Solutions, carefully categorized by type."
          />
        </div>
      </div>
    </div>
  );
} 