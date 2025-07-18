// QuestionRenderer.tsx
import { Answer } from "@/app/models/Answer";
import { Box } from "@mui/material";
import React from "react";
import { QuestionNumbers } from "../../../components/QuestionNumbers";
import { QuestionTypeRenderer } from "../../../components/QuestionTypeRenderer";
import { QuestionGroup } from "../../../models/QuestionGroup";
import { useListeningAnswers } from "../hooks/useAnswerContext";
import { ResumeSoundButton } from "./ResumeSoundButton";

type Props = {
  questionGroup: QuestionGroup;
  seekTo: (timeInSeconds: number) => void;
  isSubmitted: boolean;
  correctAnswers: Answer[];
};

export const ListeningQuestionRenderer: React.FC<Props> = ({
  questionGroup,
  seekTo,
  isSubmitted,
  correctAnswers,
}) => {
  const { state, dispatch } = useListeningAnswers();

  const handleChangeAnswer = (questionNumber: number, value: string) => {
    dispatch({ type: "UPSERT", questionNumber, value });
  };

  return (
    <Box mb={8}>
      <QuestionNumbers questions={questionGroup.questions} />
      <Box sx={{ height: 8 }} />
      <ResumeSoundButton
        onClick={() => seekTo(questionGroup.seekPosition ?? 0)}
      />
      <Box sx={{ height: 8 }} />
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
