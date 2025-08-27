"use client";

import PaginationButton from "@/app/components/PaginationButton";
import TestCard, { TestCardProps } from "@/app/components/TestCard";
import { Box, Typography } from "@mui/material";
import { useState } from "react";

interface Test extends TestCardProps {
  id: string;
}

interface TestListProps {
  tests: Test[];
  title: string;
  description: string;
  isLoading: boolean;
}

export default function TestList({
  tests,
  title,
  description,
  isLoading,
}: TestListProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const testsPerPage = 12;
  const totalPages = Math.ceil(tests.length / testsPerPage);

  const indexOfLastTest = currentPage * testsPerPage;
  const indexOfFirstTest = indexOfLastTest - testsPerPage;
  const currentTests = tests.slice(indexOfFirstTest, indexOfLastTest);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <Box sx={{ width: "100%", overflowX: "hidden" }}>
      <Typography
        component="h1"
        sx={{
          fontSize: "1.2rem",
          color: "#333",
          margin: "0 0 1rem 0",
          wordBreak: "break-word",
        }}
      >
        {title}
      </Typography>
      {description && <Typography variant="body1">{description}</Typography>}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "1rem",
          width: "100%",
        }}
      >
        {isLoading
          ? Array.from({ length: 9 }).map((_, i) => (
              <TestCard
                key={i}
                type={""}
                title={""}
                testUrl={""}
                isLoading={isLoading}
              />
            ))
          : currentTests.map((test) => (
              <TestCard
                key={test.id}
                type={test.type}
                title={test.title}
                testUrl={test.testUrl}
                isLoading={isLoading}
              />
            ))}
      </Box>

      {totalPages > 1 && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: "0.5rem",
            mt: 2,
            flexWrap: "wrap",
          }}
        >
          {currentPage > 1 && (
            <PaginationButton
              variant="prev"
              onClick={() => paginate(currentPage - 1)}
            />
          )}

          {Array.from({ length: totalPages }, (_, i) => (
            <PaginationButton
              key={i + 1}
              onClick={() => paginate(i + 1)}
              isActive={currentPage === i + 1}
              variant="number"
            >
              {i + 1}
            </PaginationButton>
          ))}

          {currentPage < totalPages && (
            <PaginationButton
              variant="next"
              onClick={() => paginate(currentPage + 1)}
              sx={{ marginRight: 0 }}
            />
          )}
        </Box>
      )}
    </Box>
  );
}
