// QuestionRenderer.tsx
import { Box } from "@mui/material";
import React from "react";
import { QuestionNumbers } from "../../../components/QuestionNumbers";
import { QuestionTypeRenderer } from "../../../components/QuestionTypeRenderer";
import { QuestionGroup } from "../../models/QuestionGroup";
import { ResumeSoundButton } from "./ResumeSoundButton";

type Props = {
  questionGroup: QuestionGroup;
  seekTo: (timeInSeconds: number) => void;
};

export const ListeningQuestionRenderer: React.FC<Props> = ({
  questionGroup,
  seekTo,
}) => {
  return (
    <Box mb={8}>
      <QuestionNumbers questions={questionGroup.questions} />
      <Box sx={{ height: 8 }} />
      <ResumeSoundButton
        onClick={() => seekTo(questionGroup.seekPosition ?? 0)}
      />
      <Box sx={{ height: 8 }} />
      <QuestionTypeRenderer questionGroup={questionGroup} />
    </Box>
  );
};
