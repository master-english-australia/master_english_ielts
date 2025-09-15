import { Box, MenuItem, Select, Typography } from "@mui/material";
import React from "react";
import { QuestionProps } from "../models/props/questionProps";
import { isAnswerCorrect } from "../utils/answerUtils";
import { QuestionText } from "./QuestionText";

export const MatchingQuestion: React.FC<QuestionProps> = ({
  questionGroup,
  onChangeAnswer,
  answerState,
  correctAnswers,
  isSubmitted,
}) => {
  return (
    <Box>
      <Typography sx={{ textAlign: "left", mb: 2 }}>
        {questionGroup.instruction}
      </Typography>
      <Box
        dangerouslySetInnerHTML={{ __html: questionGroup.questionText || "" }}
      />
      {questionGroup.questions.map((question) => {
        const userAnswer = answerState[Number(question.id)];
        const correctAnswer = correctAnswers.find(
          (answer) => answer.number === Number(question.id),
        );
        const isCorrect = isAnswerCorrect(
          userAnswer || "",
          correctAnswer?.answers || [],
        );

        return (
          <Box
            key={question.id}
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 1,
              marginY: 2,
            }}
          >
            <QuestionText
              number={question.id}
              text={question.questionText || ""}
              isSubmitted={isSubmitted}
              isCorrect={isCorrect}
            />
            <Select
              size="small"
              value={isSubmitted ? correctAnswer?.answers[0] : userAnswer || ""}
              onChange={(e) =>
                onChangeAnswer(Number(question.id), e.target.value)
              }
              sx={{ width: "120px", height: "26px" }}
            >
              {question.options?.map((opt) => (
                <MenuItem key={opt} value={opt}>
                  {opt}
                </MenuItem>
              ))}
            </Select>
          </Box>
        );
      })}
    </Box>
  );
};
