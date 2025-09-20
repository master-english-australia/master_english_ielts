"use client";

import SelectableButton from "@/app/components/SelectableButton";
import { Colors } from "@/app/consts/colors";
import { Box, Divider, TextField, Typography } from "@mui/material";
import { useState } from "react";

export interface TestFiltersProps {
  part: "writing" | "reading" | "listening" | "speaking";
  onFilterChange: (filters: { search: string; testType: string }) => void;
}

export default function TestFilters({
  part,
  onFilterChange,
}: TestFiltersProps) {
  const [search, setSearch] = useState("");
  const [testType, setTestType] = useState("General");

  const testTypes =
    part === "writing" || part === "reading"
      ? ["General", "Academic"]
      : ["General"];

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
        mt: "48px",
      }}
    >
      <Typography
        sx={{
          fontWeight: "bold",
          textAlign: "center",
          fontSize: "1.2rem",
          color: "#333",
          mb: "0.5rem",
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
              "& fieldset": { borderColor: Colors.BORDER },
              "&:hover fieldset": { borderColor: Colors.BORDER },
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
        {testTypes.map((type) => (
          <SelectableButton
            key={type}
            onClick={() => handleTypeChange(type)}
            selected={testType === type}
            fullWidth
            sx={{
              textAlign: "left",
              justifyContent: "center",
            }}
          >
            {type}
          </SelectableButton>
        ))}
      </Box>
    </Box>
  );
}
