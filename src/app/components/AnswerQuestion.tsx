import { Box, TextField, Typography } from "@mui/material";
import React from "react";
import { QuestionProps } from "../models/props/questionProps";
import { isAnswerCorrect } from "../utils/answerUtils";
import { QuestionNumberBox } from "./QuestionNumberBox";

export const AnswerQuestion: React.FC<QuestionProps> = ({
  questionGroup,
  onChangeAnswer,
  answerState,
  correctAnswers,
  isSubmitted,
}) => {
  return (
    <Box padding={2}>
      <Box
        dangerouslySetInnerHTML={{ __html: questionGroup.questionText || "" }}
      />
      <Box sx={{ mt: 2 }}>
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
                alignItems: "center",
                gap: 2,
                mb: 2,
                flexWrap: "wrap",
              }}
            >
              <QuestionNumberBox
                questionNumber={question.id}
                isCorrect={isCorrect}
                isSubmitted={isSubmitted}
              />
              <Box sx={{ flex: 1, minWidth: "300px" }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Typography
                    variant="body1"
                    sx={{ flex: 1 }}
                    dangerouslySetInnerHTML={{
                      __html: question.questionText || "",
                    }}
                  />
                  <TextField
                    size="small"
                    value={
                      isSubmitted
                        ? correctAnswer?.answers?.join(", ") || ""
                        : userAnswer || ""
                    }
                    onChange={(e) => {
                      onChangeAnswer(Number(question.id), e.target.value);
                    }}
                    disabled={isSubmitted}
                    slotProps={{
                      input: {
                        sx: {
                          width: "160px",
                          height: "26px",
                        },
                      },
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        backgroundColor: isSubmitted
                          ? isCorrect
                            ? "#e8f5e8"
                            : "#ffeaea"
                          : "white",
                      },
                    }}
                  />
                </Box>
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};
