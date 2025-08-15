import React from "react";
import { Button, SxProps } from "@mui/material";
import { ReactNode } from "react";

interface Props {
  onClick: () => void;
  sx?: SxProps;
  children: ReactNode;
}

export default function TestListPaginationButton({
  onClick,
  sx,
  children,
}: Props) {
  const baseButtonSx = {
    display: "inline-block",
    padding: "0.5rem 1rem",
    border: "1px solid #ddd",
    backgroundColor: "white",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "all 0.2s",
    minWidth: "2.5rem",
    textAlign: "center",
    fontSize: "1rem",
    color: "#333",
    marginRight: "0.5rem",
    "&:hover": { backgroundColor: "#f5f5f5" },
  };
  return (
    <Button
      sx={{
        ...baseButtonSx,
      }}
    >
      &laquo; Previous
    </Button>
  );
}
