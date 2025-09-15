"use client";

import CommonButton from "@/app/components/CommonButton";
import { Colors } from "@/app/consts/colors";
import { ButtonProps } from "@mui/material";
import Link from "next/link";

interface BackButtonProps extends ButtonProps {
  href?: string;
  label?: string;
}

export default function BackButton({
  href = "/",
  label = "Back to Home",
  ...props
}: BackButtonProps) {
  return (
    <CommonButton
      component={Link}
      href={href}
      sx={{
        backgroundColor: Colors.HEADER,
        color: Colors.HEADER_TEXT,
        "&:hover": {
          backgroundColor: Colors.PRIMARY_HOVER || Colors.HEADER,
        },
      }}
      {...props}
    >
      ← {label}
    </CommonButton>
  );
}
