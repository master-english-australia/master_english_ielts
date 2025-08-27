import { SxProps } from "@mui/material";
import { ReactNode } from "react";
import { Colors } from "@/app/consts/colors";
import CommonButton from "@/app/components/CommonButton";

type Variant = "number" | "prev" | "next";

interface Props {
  onClick?: () => void;
  isActive?: boolean;
  sx?: SxProps;
  children?: ReactNode;
  variant?: Variant;
}

export default function PaginationButton({
  onClick,
  isActive = false,
  sx,
  children,
  variant = "number",
}: Props) {
  const fallbackLabel =
    variant === "prev" ? "« Previous" : variant === "next" ? "Next »" : "";

  return (
    <CommonButton
      onClick={onClick}
      sx={{
        backgroundColor: isActive ? Colors.PRIMARY : Colors.WHITE,
        color: isActive ? Colors.WHITE : Colors.TEXT_DEFAULT,
        borderColor: isActive ? Colors.PRIMARY : Colors.BORDER,
        "&:hover": {
          backgroundColor: isActive
            ? Colors.PRIMARY_HOVER
            : Colors.PRIMARY_HOVER,
        },
        ...sx,
      }}
    >
      {children ?? fallbackLabel}
    </CommonButton>
  );
}
