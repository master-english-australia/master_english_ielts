"use client";

import CommonButton from "@/app/components/CommonButton";
import { Colors } from "@/app/consts/colors";
import { ButtonProps, Skeleton } from "@mui/material";

export interface ActionButtonProps extends ButtonProps {
  isLoading?: boolean;
}

export default function ActionButton({
  sx,
  children,
  isLoading,
  ...rest
}: ActionButtonProps) {
  if (isLoading) {
    return <Skeleton variant="rounded" width="100%" height={40} />;
  }

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
