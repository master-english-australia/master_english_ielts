"use client";

import { ButtonProps } from "@mui/material";
import { Colors } from "@/app/consts/colors";
import CommonButton from "@/app/components/CommonButton";

interface SelectableButtonProps extends ButtonProps {
  selected?: boolean;
}

export default function SelectableButton({
  selected = false,
  sx,
  children,
  ...rest
}: SelectableButtonProps) {
  return (
    <CommonButton
      {...rest}
      sx={{
        borderColor: selected ? Colors.PRIMARY : Colors.BORDER,
        backgroundColor: selected ? Colors.PRIMARY : Colors.WHITE,
        color: selected ? Colors.WHITE : Colors.TEXT_DEFAULT,
        "&:hover": {
          backgroundColor: selected
            ? Colors.PRIMARY_HOVER
            : Colors.BACKGROUND_HOVER,
        },
        width: "100%",
        ...sx,
      }}
    >
      {children}
    </CommonButton>
  );
}
