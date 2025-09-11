"use client";

import NavButton from "@/app/components/NavButton";
import { Colors } from "@/app/consts/colors";
import { Shadows } from "@/app/consts/shadows";
import { Box } from "@mui/material";
import { usePathname } from "next/navigation";

export default function IELTSTestsNav() {
  const pathname = usePathname();

  const items = [
    { href: "/ielts-tests/listening", label: "IELTS Listening Tests" },
    { href: "/ielts-tests/reading", label: "IELTS Reading Tests" },
    { href: "/ielts-tests/writing", label: "IELTS Writing Tests" },
    { href: "/ielts-tests/speaking", label: "IELTS Speaking Tests" },
  ];

  return (
    <Box
      sx={{
        backgroundColor: Colors.BACKGROUND_HOVER,
        p: "1rem 0",
        position: "sticky",
        top: "3.5rem",
        zIndex: 99,
        boxShadow: Shadows.NAV,
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
