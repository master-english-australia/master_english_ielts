import { Box, Radio, Typography } from "@mui/material";
import React from "react";
import { QuestionProps } from "../models/props/questionProps";
import { QuestionText } from "./QuestionText";

export const MultipleChoiceQuestion: React.FC<QuestionProps> = ({
  questionGroup,
  onChangeAnswer,
  answerState,
  isSubmitted,
  correctAnswers,
}) => (
  <Box>
    <Typography sx={{ textAlign: "left", mb: 2 }}>
      {questionGroup.instruction}
    </Typography>
    {questionGroup.questions.map((question) => {
      const userAnswer = answerState[Number(question.id)];
      const correctAnswer = correctAnswers.find(answer => answer.number === Number(question.id))?.answers[0];
      const isCorrect = correctAnswer === userAnswer;
      return (
        <Box key={question.id} my={2}>
          <QuestionText
            text={question.questionText || ""}
            number={question.id}
            isSubmitted={isSubmitted}
            isCorrect={isCorrect}
          />
          <Box height={8} />
          {question.options?.map((option, index) => (
            <Box key={index} sx={{ display: "flex", alignItems: "center" }}>
              <Radio
                value={option}
                checked={isSubmitted ? option === correctAnswer : option === userAnswer}
                onChange={(e) => {
                  if (isSubmitted) return;
                  
                  onChangeAnswer(Number(question.id), e.target.value);
                }}
              />
              {option}
            </Box>
          ))}
        </Box>
      );
    })}
  </Box>
);
