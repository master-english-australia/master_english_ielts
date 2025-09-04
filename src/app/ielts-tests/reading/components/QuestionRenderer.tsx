// QuestionRenderer.tsx
import { Answer } from "@/app/models/Answer";
import { Box } from "@mui/material";
import React from "react";
import { QuestionNumbers } from "../../../components/QuestionNumbers";
import { QuestionTypeRenderer } from "../../../components/QuestionTypeRenderer";
import { QuestionGroup } from "../../../models/QuestionGroup";
import { useReadingAnswers } from "../hooks/useAnswerContext";

type Props = {
  questionGroup: QuestionGroup;
  isSubmitted: boolean;
  correctAnswers: Answer[];
};

export const ReadingQuestionRenderer: React.FC<Props> = ({
  questionGroup,
  isSubmitted,
  correctAnswers,
}) => {
  const { state, dispatch } = useReadingAnswers();

  const handleChangeAnswer = (questionNumber: number, value: string) => {
    dispatch({ type: "UPSERT", questionNumber, value });
  };

  return (
    <Box mb={8} mr={2}>
      <QuestionNumbers questions={questionGroup.questions} />
      <QuestionTypeRenderer
        questionGroup={questionGroup}
        onChangeAnswer={handleChangeAnswer}
        state={state}
        isSubmitted={isSubmitted}
        correctAnswers={correctAnswers}
      />
    </Box>
  );
};
