'use client';

import TestFilters from '@/components/TestFilters';
import TestList from '@/components/TestList';
import { useState } from 'react';

// Sample data for the writing tests
const mockTests = [
  {
    id: '1',
    type: 'Task 1',
    title: 'Academic IELTS Writing Task 1: Chart Description',
    testUrl: '/ielts-tests/writing/academic-task-1-chart',
  },
  {
    id: '2',
    type: 'Task 1',
    title: 'Academic IELTS Writing Task 1: Process Diagram',
    testUrl: '/ielts-tests/writing/academic-task-1-process',
  },
  {
    id: '3',
    type: 'Task 1',
    title: 'Academic IELTS Writing Task 1: Map Description',
    testUrl: '/ielts-tests/writing/academic-task-1-map',
  },
  {
    id: '4',
    type: 'Task 1',
    title: 'General IELTS Writing Task 1: Formal Letter',
    testUrl: '/ielts-tests/writing/general-task-1-formal',
  },
  {
    id: '5',
    type: 'Task 1',
    title: 'General IELTS Writing Task 1: Informal Letter',
    testUrl: '/ielts-tests/writing/general-task-1-informal',
  },
  {
    id: '6',
    type: 'Task 2',
    title: 'IELTS Writing Task 2: Opinion Essay',
    testUrl: '/ielts-tests/writing/task-2-opinion',
  },
  {
    id: '7',
    type: 'Task 2',
    title: 'IELTS Writing Task 2: Advantages and Disadvantages',
    testUrl: '/ielts-tests/writing/task-2-advantages',
  },
  {
    id: '8',
    type: 'Task 2',
    title: 'IELTS Writing Task 2: Problem and Solution',
    testUrl: '/ielts-tests/writing/task-2-problem',
  },
];

export default function WritingTestsPage() {
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
            title="Free Online IELTS Writing Test Collection" 
            description="Practice with our comprehensive collection of IELTS Writing Tasks with sample answers and detailed feedback."
          />
        </div>
      </div>
    </div>
  );
} 