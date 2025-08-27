"use client";

import React from "react";
import { Box } from "@mui/material";
import { usePathname } from "next/navigation";
import { Colors } from "@/app/consts/colors";
import BackButton from "@/app/components/BackButton";
import IELTSTestsNav from "@/app/components/IELTSTestsNav";

export default function IELTSTestsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isTestPage =
    pathname?.includes("/ielts-tests/writing/") ||
    pathname?.includes("/ielts-tests/reading/") ||
    pathname?.includes("/ielts-tests/listening/") ||
    pathname?.includes("/ielts-tests/speaking/");

  if (isTestPage) {
    return <>{children}</>;
  }

  return (
    <Box sx={{ minWidth: 320, width: "100%", overflowX: "hidden" }}>
      <Box
        sx={{
          backgroundColor: Colors.HEADER,
          color: Colors.HEADER_TEXT,
          py: "1rem",
          position: "sticky",
          top: 0,
          zIndex: 100,
        }}
      >
        <Box sx={{ maxWidth: 1400, mx: "auto", px: "1rem" }}>
          <BackButton label="Back to Home" href="/" variant="text" />
        </Box>
      </Box>
      <IELTSTestsNav />
      <Box sx={{ maxWidth: 1400, mx: "auto", px: "1rem", py: "1.5rem" }}>
        {children}
      </Box>
    </Box>
  );
}
