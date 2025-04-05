'use client';

import { useState } from 'react';
import TestCard, { TestCardProps } from './TestCard';

interface Test extends TestCardProps {
  id: string;
}

interface TestListProps {
  tests: Test[];
  title: string;
  description: string;
}

export default function TestList({ tests, title, description }: TestListProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const testsPerPage = 12;
  
  // Calculate indices for current page
  const indexOfLastTest = currentPage * testsPerPage;
  const indexOfFirstTest = indexOfLastTest - testsPerPage;
  const currentTests = tests.slice(indexOfFirstTest, indexOfLastTest);
  
  // Calculate total pages
  const totalPages = Math.ceil(tests.length / testsPerPage);
  
  // Helper function for pagination
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  
  return (
    <div className="test-list-container">
      <div className="test-list-header">
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      
      <div className="test-grid">
        {currentTests.map((test) => (
          <TestCard
            key={test.id}
            type={test.type}
            title={test.title}
            testUrl={test.testUrl}
            questionType={test.questionType}
          />
        ))}
      </div>
      
      {totalPages > 1 && (
        <div className="pagination">
          {currentPage > 1 && (
            <button 
              className="pagination-btn prev" 
              onClick={() => paginate(currentPage - 1)}
            >
              &laquo; Previous
            </button>
          )}
          
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              className={`pagination-btn ${currentPage === i + 1 ? 'active' : ''}`}
              onClick={() => paginate(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          
          {currentPage < totalPages && (
            <button 
              className="pagination-btn next" 
              onClick={() => paginate(currentPage + 1)}
            >
              Next &raquo;
            </button>
          )}
        </div>
      )}
    </div>
  );
} 