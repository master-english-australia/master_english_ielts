'use client';

import { useState } from 'react';

export interface TestFiltersProps {
  onFilterChange: (filters: {
    search: string;
    testType: string;
  }) => void;
}

export default function TestFilters({ onFilterChange }: TestFiltersProps) {
  const [search, setSearch] = useState('');
  const [testType, setTestType] = useState('All');

  const testTypes = ['All', 'Academic', 'General'];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearch = e.target.value;
    setSearch(newSearch);
    onFilterChange({ search: newSearch, testType });
  };

  const handleTypeChange = (type: string) => {
    setTestType(type);
    onFilterChange({ search, testType: type });
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
          onChange={handleSearchChange}
          className="search-input"
        />
      </div>
      
      <div className="test-types">
        {testTypes.map((type) => (
          <button
            key={type}
            className={`type-btn ${testType === type ? 'active' : ''}`}
            onClick={() => handleTypeChange(type)}
          >
            {type}
          </button>
        ))}
      </div>
    </div>
  );
} 