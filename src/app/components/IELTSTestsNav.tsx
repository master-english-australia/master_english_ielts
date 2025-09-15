"use client";

import NavButton from "@/app/components/NavButton";
import { Colors } from "@/app/consts/colors";
import { Shadows } from "@/app/consts/shadows";
import { Box } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
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
        px: "2rem",
        position: "sticky",
        zIndex: 99,
        boxShadow: Shadows.NAV,
      }}
    >
      <Box
        component="nav"
        sx={{
          maxWidth: 1400,
          mx: "auto",
          px: "1rem",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Link href="/" aria-label="Go to home">
          <Image
            src="/images/logo.png"
            alt="Home"
            width={64}
            height={64}
            style={{ cursor: "pointer" }}
          />
        </Link>
        <Box width="1.5rem" />
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
