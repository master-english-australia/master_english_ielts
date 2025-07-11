"use client";

import TestFilters from "@/app/components/TestFilters";
import TestList from "@/app/components/TestList";
import { Box } from "@mui/material";
import { useMemo, useState } from "react";
import { IeltsTest } from "../models/IeltsTest";

interface TestListPageProps {
  tests: IeltsTest[];
  title: string;
}

export default function TestListPage({ tests, title }: TestListPageProps) {
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
      if (filters.testType !== "All" && test.type !== filters.testType) {
        return false;
      }

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
    <Box p={2}>
      <Box display="flex" gap={2}>
        <Box width="200px">
          <TestFilters onFilterChange={handleFilterChange} />
        </Box>
        <Box flex={1}>
          <TestList tests={filteredTestList} title={title} description="" />
        </Box>
      </Box>
    </Box>
  );
}
