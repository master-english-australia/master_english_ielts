"use client";

import TestCard, { TestCardProps } from "@/app/components/TestCard";
import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";

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
  const testsPerPage = 18;

  const indexOfLastTest = currentPage * testsPerPage;
  const indexOfFirstTest = indexOfLastTest - testsPerPage;
  const currentTests = tests.slice(indexOfFirstTest, indexOfLastTest);

  const totalPages = Math.ceil(tests.length / testsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <Box className="test-list-container">
      <Box className="test-list-header">
        <Typography variant="h1">{title}</Typography>
        {description && <Typography variant="body1">{description}</Typography>}
      </Box>

      <Box className="test-grid">
        {currentTests.map((test) => (
          <TestCard
            key={test.id}
            type={test.type}
            title={test.title}
            testUrl={test.testUrl}
            questionType={test.questionType}
          />
        ))}
      </Box>

      {totalPages > 1 && (
        <Box className="pagination">
          {currentPage > 1 && (
            <Button
              className="pagination-btn prev"
              onClick={() => paginate(currentPage - 1)}
            >
              &laquo; Previous
            </Button>
          )}

          {Array.from({ length: totalPages }, (_, i) => (
            <Button
              key={i + 1}
              className={`pagination-btn ${currentPage === i + 1 ? "active" : ""}`}
              onClick={() => paginate(i + 1)}
            >
              {i + 1}
            </Button>
          ))}

          {currentPage < totalPages && (
            <Button
              className="pagination-btn next"
              onClick={() => paginate(currentPage + 1)}
            >
              Next &raquo;
            </Button>
          )}
        </Box>
      )}
    </Box>
  );
}
