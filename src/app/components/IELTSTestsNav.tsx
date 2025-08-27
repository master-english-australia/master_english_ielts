"use client";

import { Box } from "@mui/material";
import { usePathname } from "next/navigation";
import NavButton from "@/app/components/NavButton";

export default function IELTSTestsNav() {
  const pathname = usePathname();

  const items = [
    { href: "/ielts-tests/reading", label: "IELTS Reading Tests" },
    { href: "/ielts-tests/listening", label: "IELTS Listening Tests" },
    { href: "/ielts-tests/writing", label: "IELTS Writing Tests" },
    { href: "/ielts-tests/speaking", label: "IELTS Speaking Tests" },
  ];

  return (
    <Box
      sx={{
        backgroundColor: "#f8f9fa",
        p: "1rem 0",
        position: "sticky",
        top: "3.5rem",
        zIndex: 99,
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      }}
    >
      <Box component="nav" sx={{ maxWidth: 1400, mx: "auto", px: "1rem" }}>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
          {items.map((it) => (
            <NavButton
              key={it.href}
              href={it.href}
              selected={pathname.startsWith(it.href)}
              variant="outlined"
              size="small"
            >
              {it.label}
            </NavButton>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
