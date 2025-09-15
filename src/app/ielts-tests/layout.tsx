"use client";

import IELTSTestsNav from "@/app/components/IELTSTestsNav";
import { Box } from "@mui/material";
import { usePathname } from "next/navigation";
import React from "react";

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
      <IELTSTestsNav />
      <Box sx={{ maxWidth: 1400, px: "1rem", py: "1.5rem" }}>{children}</Box>
    </Box>
  );
}
