"use client";

import { ButtonProps } from "@mui/material";
import { Colors } from "@/app/consts/colors";
import CommonButton from "@/app/components/CommonButton";

export default function ActionButton({ sx, children, ...rest }: ButtonProps) {
  return (
    <CommonButton
      {...rest}
      sx={{
        backgroundColor: Colors.PRIMARY,
        color: Colors.WHITE,
        "&:hover": {
          backgroundColor: Colors.PRIMARY_HOVER,
        },
        width: "100%",
        textAlign: "center",
        ...sx,
      }}
    >
      {children}
    </CommonButton>
  );
}
