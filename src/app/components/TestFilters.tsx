"use client";

import { WidthWideTwoTone } from "@mui/icons-material";
import { useState } from "react";
import { Box, Button, Divider, TextField, Typography } from "@mui/material";
import { Colors } from "@/app/consts/colors";

export interface TestFiltersProps {
  onFilterChange: (filters: { search: string; testType: string }) => void;
}

export default function TestFilters({ onFilterChange }: TestFiltersProps) {
  const [search, setSearch] = useState("");
  const [testType, setTestType] = useState("All");

  const testTypes = ["All", "Academic", "General"];

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
    <Box
      sx={{
        backgroundColor: "white",
        padding: "1rem",
        borderRadius: "8px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        width: "100%",
        maxWidth: "200px",
        boxSizing: "border-box",
      }}
    >
      <Typography
        component="h2"
        sx={{
          fontSize: "1.2rem",
          color: "#333",
          margin: "0 0 1rem 0",
          wordBreak: "break-word",
        }}
      >
        Filters
      </Typography>

      <Divider
        sx={{
          height: "1px",
          backgroundColor: "#eee",
          margin: "0 0 1rem 0",
        }}
      />

      <Box
        sx={{
          fontSize: "0.9rem",
          height: "40px",
          marginBottom: "1rem",
        }}
      >
        <TextField
          placeholder="Search"
          fullWidth
          value={search}
          onChange={handleSearchChange}
          sx={{
            "& .MuiOutlinedInput-input": {
              fontSize: "0.9rem",
              p: "8px 14px",
              boxSizing: "border-box",
            },
            "& .MuiOutlinedInput-root": {
              height: "40px",
              borderRadius: "4px",
              "& fieldset": { borderColor: "#ddd" },
              "&:hover fieldset": { borderColor: "#ddd" },
              "&.Mui-focused fieldset": { borderColor: Colors.PRIMARY },
              "&.Mui-focused": {
                boxShadow: "0 0 0 2px rgba(0, 123, 255, 0.25)",
              },
            },
          }}
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
        }}
      >
        {testTypes.map((type) => {
          const active = testType === type;

          return (
            <Button
              key={type}
              onClick={() => handleTypeChange(type)}
              fullWidth
              sx={{
                padding: "0.5rem",
                border: "1px solid #ddd",
                borderColor: active ? Colors.PRIMARY : "#ddd",
                backgroundColor: active ? Colors.PRIMARY : "white",
                color: active ? "white" : "#333",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "0.9rem",
                textAlign: "left",
                justifyContent: "flex-start",
                textTransform: "none",
                transition: "all 0.2s",
                width: "100%",
                boxSizing: "border-box",
                "&:hover": {
                  backgroundColor: active ? Colors.PRIMARY_HOVER : "#f5f5f5",
                },
              }}
            >
              {type}
            </Button>
          );
        })}
      </Box>
    </Box>
  );
}
