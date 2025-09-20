"use client";

import TestFilters from "@/app/components/TestFilters";
import TestList from "@/app/components/TestList";
import { Box } from "@mui/material";
import { useMemo, useState } from "react";
import { useTestsList } from "../hooks/useTestsList";
import { IeltsSection } from "../models/IeltsTest";

interface TestListPageProps {
  title: string;
  part: IeltsSection;
}

export default function TestListPage({ title, part }: TestListPageProps) {
  const { data: tests, loading, error } = useTestsList({ part });

  const [filters, setFilters] = useState({
    search: "",
    testType: "General",
  });

  const handleFilterChange = (newFilters: {
    search: string;
    testType: string;
  }) => {
    setFilters(newFilters);
  };

  const filteredTestList = useMemo(() => {
    return tests?.filter((test) => {
      if (test.type !== filters.testType) {
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
          {error ? (
            <div>Failed to load: {error}</div>
          ) : (
            <TestList
              tests={filteredTestList || []}
              title={title}
              description=""
              isLoading={loading}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
}
