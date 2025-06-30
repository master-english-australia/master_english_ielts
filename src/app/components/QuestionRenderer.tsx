// QuestionRenderer.tsx
import { Box } from "@mui/material";
import React from "react";
import { QuestionGroup } from "../models/QuestionGroup";
import { QuestionNumbers } from "./QuestionNumbers";
import { QuestionTypeRenderer } from "./QuestionTypeRenderer";

type Props = {
  questionGroup: QuestionGroup;
};

export const QuestionRenderer: React.FC<Props> = ({ questionGroup }) => {
  return (
    <Box mb={8}>
      <QuestionNumbers questions={questionGroup.questions} />
      <QuestionTypeRenderer questionGroup={questionGroup} />
    </Box>
  );
};
