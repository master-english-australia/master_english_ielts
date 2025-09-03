"use client";

import { Box } from "@mui/material";
import { Colors } from "@/app/consts/colors";
import { Shadows } from "@/app/consts/shadows";
import { useState } from "react";

export default function ActionTestCard({
  sx,
  children,
}: {
  sx?: React.CSSProperties;
  children: React.ReactNode;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Box
      sx={{
        background: Colors.WHITE,
        borderRadius: "8px",
        padding: "1rem",
        boxShadow: Shadows.CARD,
        transition: "transform 0.2s",
        width: "100%",
        boxSizing: "border-box",
        wordBreak: "break-word",
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: Shadows.CARD_HOVER,
        },
        ...sx,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
    </Box>
  );
}
