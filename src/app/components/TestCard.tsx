"use client";

import { Colors } from "@/app/consts/colors";
import { Box, Button } from "@mui/material";
import Link from "next/link";
import { useState } from "react";

export interface TestCardProps {
  type: string;
  title: string;
  testUrl: string;
  questionType?: string;
}

export default function TestCard({
  type,
  title,
  testUrl,
  questionType,
}: TestCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Box
      sx={{
        background: "white",
        borderRadius: "8px",
        padding: "1rem",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        transition: "transform 0.2s",
        width: "100%",
        boxSizing: "border-box",
        wordBreak: "break-word",
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.15)",
        },
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Box
        sx={{
          marginBottom: "0.5rem",
          display: "flex",
          flexWrap: "wrap",
          gap: "0.5rem",
        }}
      >
        <Box
          component="span"
          sx={{
            display: "inline-block",
            padding: "0.25rem 0.5rem",
            backgroundColor: "#f0f0f0",
            borderRadius: "4px",
            fontSize: "0.8rem",
            color: "#666",
          }}
        >
          {type}
        </Box>

        {questionType && (
          <Box
            component="span"
            sx={{
              marginLeft: "0.5rem",
              display: "inline-block",
              padding: "0.25rem 0.5rem",
              backgroundColor: "#e0e0e0",
              borderRadius: "4px",
              fontSize: "0.75rem",
              color: "#666",
              fontWeight: 500,
            }}
          >
            {questionType}
          </Box>
        )}
      </Box>

      <Box
        component="h3"
        sx={{
          margin: "0 0 1rem 0",
          fontSize: "1.1rem",
          color: "#333",
          wordBreak: "break-word",
        }}
      >
        {title}
      </Box>

      <Button
        component={Link}
        href={testUrl}
        sx={{
          display: "inline-block",
          padding: "0.5rem 1rem",
          backgroundColor: Colors.PRIMARY,
          color: "white",
          textDecoration: "none",
          borderRadius: "4px",
          fontSize: "0.9rem",
          transition: "background-color 0.2s",
          width: "100%",
          textAlign: "center",
          boxSizing: "border-box",
          textTransform: "none",
          "&:hover": {
            backgroundColor: Colors.PRIMARY_HOVER,
          },
        }}
      >
        Take Test
      </Button>
    </Box>
  );
}
