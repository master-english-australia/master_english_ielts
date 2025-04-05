'use client';

import { useState } from 'react';

export interface TestFiltersProps {
  onFilterChange: (filters: {
    search: string;
    testLength: string;
    testType: string;
  }) => void;
}

export default function TestFilters({ onFilterChange }: TestFiltersProps) {
  const [search, setSearch] = useState('');
  const [testLength, setTestLength] = useState('All');
  const [testType, setTestType] = useState('All');

  const testLengths = ['All', 'Full Tests', 'Parts'];
  const testTypes = ['All', 'Academic', 'General Training'];

  const handleFilter = () => {
    onFilterChange({
      search,
      testLength,
      testType
    });
  };

  return (
    <div className="test-filters">
      <h2>Filters</h2>
      <div className="filter-divider"></div>
      
      <div className="search-container">
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
      </div>
      
      <div className="filter-section">
        <h3>Filter By Length</h3>
        <div className="test-lengths">
          {testLengths.map((length) => (
            <button
              key={length}
              className={`filter-btn ${testLength === length ? 'active' : ''}`}
              onClick={() => setTestLength(length)}
            >
              {length}
            </button>
          ))}
        </div>
      </div>
      
      <button className="apply-filter-btn" onClick={handleFilter}>
        Filter
      </button>
      
      <div className="test-types">
        {testTypes.map((type) => (
          <button
            key={type}
            className={`type-btn ${testType === type ? 'active' : ''}`}
            onClick={() => setTestType(type)}
          >
            {type}
          </button>
        ))}
      </div>
    </div>
  );
} 