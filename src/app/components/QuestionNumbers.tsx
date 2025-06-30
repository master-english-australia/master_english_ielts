import { Typography } from "@mui/material";
import React from "react";
import { Question } from "../models/Question";

type Props = {
  questions: Question[];
};

export const QuestionNumbers: React.FC<Props> = ({ questions }) => {
  if (questions.length === 0) return null;

  const firstNumber = questions[0].id;
  const lastNumber = questions[questions.length - 1].id;

  return (
    <Typography sx={{ fontWeight: "bold", mb: 1, textAlign: "left" }}>
      Questions {firstNumber}-{lastNumber}
    </Typography>
  );
};
