"use client";

import ActionButton from "@/app/components/ActionButton";
import { TestCardTitle } from "@/app/components/TestCardTitle";
import { TestCardType } from "@/app/components/TestCardType";
import { Box } from "@mui/material";
import Link from "next/link";
import { useState } from "react";

export interface TestCardProps {
  type: string;
  title: string;
  testUrl: string;
}

export interface TestCardPropsWithLoading extends TestCardProps {
  isLoading: boolean;
}

export default function TestCard({
  type,
  title,
  testUrl,
  isLoading,
}: TestCardPropsWithLoading) {
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
        <TestCardType type={type} isLoading={isLoading} />
      </Box>

      <TestCardTitle title={title} isLoading={isLoading} />

      <ActionButton component={Link} href={testUrl} isLoading={isLoading}>
        Take Test
      </ActionButton>
    </Box>
  );
}
