import { Box, Checkbox, Typography } from "@mui/material";
import React from "react";
import { QuestionProps } from "../models/props/questionProps";
import { normalizeAnswer } from "../utils/answerUtils";
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
  const questionIds = (questionGroup.questions || [])
    .map((q) => Number(q.id))
    .sort((a, b) => a - b);

  const content = (() => {
    if (!firstQuestion) return null;
    const slots = questionIds.map((id) => (answerState[id] || "").trim());
    const selectedLetters = slots.filter(Boolean);

    const correctAnswersArrayAll = questionIds.flatMap(
      (qid) => correctAnswers.find((a) => a.number === qid)?.answers || [],
    );

    const options = firstQuestion.options || [];
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const getLetterForIndex = (i: number) => letters[i] || "";
    const normalizedOptions = options.map((opt) => normalizeAnswer(opt));
    const mapToLetter = (value: string): string => {
      const norm = normalizeAnswer(value);
      if (!norm) return "";
      if (norm.length === 1) {
        const idx = letters.indexOf(norm.toUpperCase());
        if (idx >= 0 && idx < options.length) return letters[idx];
      }
      const idx2 = normalizedOptions.findIndex((opt) => opt === norm);
      return idx2 >= 0 ? getLetterForIndex(idx2) : "";
    };

    const correctLetters = correctAnswersArrayAll
      .flatMap((ans) =>
        ans
          .split(",")
          .map((p) => p.trim())
          .filter(Boolean)
          .map(mapToLetter),
      )
      .filter(Boolean);

    // Compute correctness per question ID
    const correctLettersById = new Map<number, string[]>();
    questionIds.forEach((qid) => {
      const lettersForId = (
        correctAnswers.find((a) => a.number === qid)?.answers || []
      )
        .flatMap((ans) =>
          ans
            .split(",")
            .map((p) => p.trim())
            .filter(Boolean)
            .map(mapToLetter),
        )
        .filter(Boolean);
      correctLettersById.set(qid, lettersForId);
    });

    const isCorrectFirst = (() => {
      const qid = Number(firstQuestion.id);
      const sel = (answerState[qid] || "").trim();
      if (!sel) return false;
      const pool = (correctLettersById.get(qid) || []).map(normalizeAnswer);
      return pool.includes(normalizeAnswer(sel));
    })();

    const handleToggle = (letter: string) => {
      if (isSubmitted) return;
      const currentSlots = questionIds.map((id) =>
        (answerState[id] || "").trim(),
      );
      const existingIndex = currentSlots.findIndex((v) => v === letter);
      if (existingIndex >= 0) {
        onChangeAnswer(questionIds[existingIndex], "");
        return;
      }
      const filledCount = currentSlots.filter(Boolean).length;
      if (filledCount >= maxSelectable) return;
      const emptyIndex = currentSlots.findIndex((v) => !v);
      if (emptyIndex >= 0) {
        onChangeAnswer(questionIds[emptyIndex], letter);
      }
    };

    const reachedMax = selectedLetters.length >= maxSelectable;

    return (
      <Box my={2}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {Array.from({ length: maxSelectable - 1 }, (_, index) => {
            const questionId = Number(firstQuestion.id) + index;
            const isCorrect = (() => {
              const sel = (answerState[questionId] || "").trim();
              if (!sel) return false;
              const pool = (correctLettersById.get(questionId) || []).map(
                normalizeAnswer,
              );
              return pool.includes(normalizeAnswer(sel));
            })();

            return (
              <QuestionNumberBox
                key={questionId}
                questionNumber={String(questionId)}
                isCorrect={isCorrect}
                isSubmitted={isSubmitted}
              />
            );
          })}
          <QuestionText
            text={firstQuestion.questionText || ""}
            number={String(Number(firstQuestion.id) + maxSelectable - 1)}
            isSubmitted={isSubmitted}
            isCorrect={isCorrectFirst}
          />
        </Box>
        {firstQuestion.options?.map((option, index) => {
          const letter = getLetterForIndex(index);
          const isOptionSelected = selectedLetters.includes(letter);
          const disabled = isSubmitted || (!isOptionSelected && reachedMax);
          const checked = isSubmitted
            ? correctLetters
                .map(normalizeAnswer)
                .includes(normalizeAnswer(letter))
            : isOptionSelected;
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
              <Checkbox
                checked={checked}
                disabled={disabled}
                onChange={() => handleToggle(letter)}
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
