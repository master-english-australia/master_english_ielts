// QuestionRenderer.tsx
import { Box } from "@mui/material";
import React from "react";
import { QuestionNumbers } from "../../../components/QuestionNumbers";
import { QuestionTypeRenderer } from "../../../components/QuestionTypeRenderer";
import { QuestionGroup } from "../../../models/QuestionGroup";
import { useReadingAnswers } from "../hooks/useAnswerContext";

type Props = {
  questionGroup: QuestionGroup;
};

export const ReadingQuestionRenderer: React.FC<Props> = ({ questionGroup }) => {
  const { state, dispatch } = useReadingAnswers();

  const handleChangeAnswer = (questionNumber: number, value: string) => {
    dispatch({ type: "UPSERT", questionNumber, value });
  };

  return (
    <Box mb={8}>
      <QuestionNumbers questions={questionGroup.questions} />
      <QuestionTypeRenderer
        questionGroup={questionGroup}
        onChangeAnswer={handleChangeAnswer}
        state={state}
      />
    </Box>
  );
};
