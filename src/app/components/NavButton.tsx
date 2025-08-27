"use client";

import Link from "next/link";
import { ButtonProps } from "@mui/material";
import { Colors } from "@/app/consts/colors";
import CommonButton from "@/app/components/CommonButton";

interface NavButtonProps extends ButtonProps {
  href: string;
  selected?: boolean;
}

export default function NavButton({
  href,
  selected = false,
  sx,
  children,
  ...rest
}: NavButtonProps) {
  return (
    <CommonButton
      component={Link}
      href={href}
      aria-current={selected ? "page" : undefined}
      sx={{
        borderColor: selected ? Colors.PRIMARY : Colors.BORDER,
        backgroundColor: selected ? Colors.PRIMARY : Colors.WHITE,
        color: selected ? Colors.WHITE : Colors.TEXT_DEFAULT,
        "&:hover": {
          backgroundColor: selected
            ? Colors.PRIMARY_HOVER
            : Colors.BACKGROUND_HOVER,
        },
        textTransform: "none",
        whiteSpace: "nowrap",
        width: "auto",
        ...sx,
      }}
      {...rest}
    >
      {children}
    </CommonButton>
  );
}
