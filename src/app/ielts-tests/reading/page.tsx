"use client";

import TestFilters from "@/app/components/TestFilters";
import TestList from "@/app/components/TestList";
import { useMemo, useState } from "react";

interface ReadingTest {
  id: string;
  type: string;
  title: string;
  testUrl: string;
  description: string;
}

export default function ReadingTestsPage() {
  const [tests] = useState<ReadingTest[]>([
    {
      id: "1",
      type: "Academic",
      title: "Academic Reading Test 1",
      testUrl: "/ielts-tests/reading/1",
      description:
        "Practice your reading skills with this academic test featuring various question types.",
    },
    {
      id: "2",
      type: "Academic",
      title: "Academic Reading Test 2",
      testUrl: "/ielts-tests/reading/2",
      description:
        "Another academic reading test to help you prepare for the IELTS exam.",
    },
    {
      id: "3",
      type: "General",
      title: "General Reading Test 1",
      testUrl: "/ielts-tests/reading/3",
      description:
        "Practice your reading skills with this general training test featuring everyday texts.",
    },
    {
      id: "4",
      type: "General",
      title: "General Reading Test 2",
      testUrl: "/ielts-tests/reading/4",
      description:
        "Another general training reading test to help you prepare for the IELTS exam.",
    },
  ]);

  const [filters, setFilters] = useState({
    search: "",
    testType: "All",
  });

  const handleFilterChange = (newFilters: {
    search: string;
    testType: string;
  }) => {
    setFilters(newFilters);
  };

  const filteredTestList = useMemo(() => {
    return tests.filter((test) => {
      // Filter by test type
      if (filters.testType !== "All" && test.type !== filters.testType) {
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
            title="Reading Tests"
            description=""
          />
        </div>
      </div>
    </div>
  );
}
