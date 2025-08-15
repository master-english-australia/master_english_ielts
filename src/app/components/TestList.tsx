"use client";

import TestListPaginationButton from "@/app/components/TestListPagenationButton";
import TestCard, { TestCardProps } from "@/app/components/TestCard";
import { Box, Button, Typography } from "@mui/material";
import { Colors } from "@/app/consts/colors";
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
  const testsPerPage = 6;
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
            <TestListPaginationButton
              onClick={() => paginate(currentPage - 1)}
              sx={{}}
            >
              &laquo; Previous
            </TestListPaginationButton>
          )}

          {Array.from({ length: totalPages }, (_, i) => {
            const isActive = currentPage === i + 1;
            return (
              <TestListPaginationButton
                key={i + 1}
                onClick={() => paginate(i + 1)}
                sx={{
                  backgroundColor: isActive ? Colors.PRIMARY : "white",
                  color: isActive ? "white" : "#333",
                  borderColor: isActive ? Colors.PRIMARY : "#ddd",
                  "&:hover": {
                    backgroundColor: isActive
                      ? Colors.PRIMARY_HOVER
                      : Colors.PRIMARY_HOVER,
                  },
                }}
              >
                {i + 1}
              </TestListPaginationButton>
            );
          })}

          {currentPage < totalPages && (
            <TestListPaginationButton
              onClick={() => paginate(currentPage + 1)}
              sx={{
                marginRight: 0,
              }}
            >
              Next &raquo;
            </TestListPaginationButton>
          )}
        </Box>
      )}
    </Box>
  );
}
