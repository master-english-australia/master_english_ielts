import { Box, Typography } from "@mui/material";
import React from "react";
import { QuestionNumberBox } from "./QuestionNumberBox";

type Props = {
  number: string;
  text: string;
};

export const QuestionText: React.FC<Props> = ({ number, text }) => (
  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
    <QuestionNumberBox questionNumber={number} />
    <Typography sx={{ textAlign: "left" }}>{text}</Typography>
  </Box>
);
