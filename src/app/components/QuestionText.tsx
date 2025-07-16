import { Box, Typography } from "@mui/material";
import React from "react";
import { QuestionNumberBox } from "./QuestionNumberBox";

type Props = {
  number: string;
  text: string;
  isSubmitted: boolean;
  isCorrect: boolean;
};

export const QuestionText: React.FC<Props> = ({
  number,
  text,
  isSubmitted,
  isCorrect,
}) => (
  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
    <QuestionNumberBox
      questionNumber={number}
      isCorrect={isCorrect}
      isSubmitted={isSubmitted}
    />
    <Typography sx={{ textAlign: "left" }}>{text}</Typography>
  </Box>
);
