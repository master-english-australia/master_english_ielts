import { Box, Checkbox, Typography } from "@mui/material";
import React from "react";
import { QuestionProps } from "../models/props/questionProps";
import { isMultiSelectCorrect } from "../utils/answerUtils";
import { QuestionNumberBox } from "./QuestionNumberBox";
import { QuestionText } from "./QuestionText";

type MultipleSelectProps = QuestionProps & { maxSelectable?: number };

export const MultipleSelectChoiceQuestion: React.FC<MultipleSelectProps> = ({
  questionGroup,
  onChangeAnswer,
  answerState,
  isSubmitted,
  correctAnswers,
  maxSelectable = 2,
}) => {
  const firstQuestion = questionGroup.questions[0];

  const content = (() => {
    if (!firstQuestion) return null;
    const currentQuestionId = Number(firstQuestion.id);
    const rawUserAnswer = answerState[currentQuestionId] || "";
    const selectedValues = rawUserAnswer
      .split(",")
      .map((v) => v.trim())
      .filter(Boolean);

    const correctAnswersArray =
      correctAnswers.find((a) => a.number === currentQuestionId)?.answers || [];

    const isCorrect = isMultiSelectCorrect(
      selectedValues.join(","),
      correctAnswersArray,
    );

    const handleToggle = (option: string) => {
      if (isSubmitted) return;
      const alreadySelected = selectedValues.includes(option);
      let next = selectedValues.slice();
      if (alreadySelected) {
        next = next.filter((v) => v !== option);
      } else {
        if (next.length >= maxSelectable) {
          return;
        }
        next.push(option);
      }
      onChangeAnswer(currentQuestionId, next.join(","));
    };

    const reachedMax = selectedValues.length >= maxSelectable;

    return (
      <Box my={2}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <QuestionNumberBox
            questionNumber={firstQuestion.id}
            isCorrect={isCorrect}
            isSubmitted={isSubmitted}
          />
          <QuestionText
            text={firstQuestion.questionText || ""}
            number={String(Number(firstQuestion.id) + 1)}
            isSubmitted={isSubmitted}
            isCorrect={isCorrect}
          />
        </Box>
        {firstQuestion.options?.map((option, index) => {
          const isOptionSelected = selectedValues.includes(option);
          const disabled = isSubmitted || (!isOptionSelected && reachedMax);
          const checked = isSubmitted
            ? correctAnswersArray.includes(option)
            : isOptionSelected;
          return (
            <Box key={index} sx={{ display: "flex", alignItems: "center" }}>
              <Checkbox
                checked={checked}
                disabled={disabled}
                onChange={() => handleToggle(option)}
              />
              {option}
            </Box>
          );
        })}
      </Box>
    );
  })();

  return (
    <Box>
      <Typography sx={{ textAlign: "left", mb: 2 }}>
        {questionGroup.instruction}
      </Typography>
      {content}
    </Box>
  );
};
