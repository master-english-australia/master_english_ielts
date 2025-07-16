// TextInputQuestion.tsx
import { Box } from "@mui/material";
import React from "react";
import { QuestionProps } from "../models/props/questionProps";
import { HtmlInlineQuestionParser } from "../utils/HtmlInlineQuestionParser";

export const TextInputQuestion: React.FC<QuestionProps> = ({
  questionGroup,
  onChangeAnswer,
  answerState,
  correctAnswers,
  isSubmitted,
}) => {
  return (
    <Box padding={2} border={1} borderColor="grey.400" borderRadius={1}>
      <div dangerouslySetInnerHTML={{ __html: questionGroup.instruction }} />
      <HtmlInlineQuestionParser
        htmlText={questionGroup.questionText || ""}
        questions={questionGroup.questions}
        onChangeAnswer={onChangeAnswer}
        answerState={answerState}
        isSubmitted={isSubmitted}
        correctAnswers={correctAnswers}
      />
    </Box>
  );
};
