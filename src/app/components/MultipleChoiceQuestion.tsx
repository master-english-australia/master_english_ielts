import { Box, Radio, Typography } from "@mui/material";
import React from "react";
import { QuestionProps } from "../models/props/questionProps";
import { normalizeAnswer } from "../utils/answerUtils";
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
      const correctAnswerRaw =
        correctAnswers.find((answer) => answer.number === Number(question.id))
          ?.answers[0] || "";

      const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      const getLetterForIndex = (i: number) => letters[i] || "";

      const options = question.options || [];
      const normalizedOptions = options.map((opt) => normalizeAnswer(opt));
      const normalizedCorrectRaw = normalizeAnswer(correctAnswerRaw);

      let correctLetter = "";
      if (normalizedCorrectRaw.length === 1) {
        const maybeIndex = letters.indexOf(normalizedCorrectRaw.toUpperCase());
        if (maybeIndex >= 0 && maybeIndex < options.length) {
          correctLetter = letters[maybeIndex];
        }
      }
      if (!correctLetter) {
        const matchIndex = normalizedOptions.findIndex(
          (opt) => opt === normalizedCorrectRaw,
        );
        if (matchIndex >= 0) correctLetter = getLetterForIndex(matchIndex);
      }

      const isCorrect =
        normalizeAnswer(userAnswer || "") === normalizeAnswer(correctLetter);

      return (
        <Box key={question.id} my={2}>
          <QuestionText
            text={question.questionText || ""}
            number={question.id}
            isSubmitted={isSubmitted}
            isCorrect={isCorrect}
          />
          <Box height={8} />
          {options.map((option, index) => {
            const letter = getLetterForIndex(index);
            const isChecked = isSubmitted
              ? normalizeAnswer(letter) === normalizeAnswer(correctLetter)
              : letter === userAnswer;

            return (
              <Box key={index} sx={{ display: "flex", alignItems: "center" }}>
                <Box
                  sx={{
                    width: 24,
                    height: 24,
                    borderRadius: "50%",
                    bgcolor: "grey.200",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "bold",
                    color: "text.primary",
                    mr: 1.5,
                  }}
                >
                  {letter}
                </Box>
                <Radio
                  value={letter}
                  checked={isChecked}
                  onChange={(e) => {
                    if (isSubmitted) return;
                    onChangeAnswer(Number(question.id), e.target.value);
                  }}
                />
                {option}
              </Box>
            );
          })}
        </Box>
      );
    })}
  </Box>
);
