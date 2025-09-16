import { Box, MenuItem, Select, Typography } from "@mui/material";
import React from "react";
import { QuestionProps } from "../models/props/questionProps";
import { isAnswerCorrect, normalizeAnswer } from "../utils/answerUtils";
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

        const options = question.options || [];
        const normalizedOptions = options.map((opt) => normalizeAnswer(opt));
        const toCanonicalOption = (value: string): string => {
          const norm = normalizeAnswer(value || "");
          const idx = normalizedOptions.findIndex((v) => v === norm);
          return idx >= 0 ? options[idx] : "";
        };

        const submittedValue = toCanonicalOption(
          (correctAnswer?.answers || [""])[0] || "",
        );
        const currentValue = toCanonicalOption(userAnswer || "");
        const selectValue = isSubmitted ? submittedValue : currentValue;

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
              value={selectValue}
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
