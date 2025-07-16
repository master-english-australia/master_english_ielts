import { Answer } from "@/app/models/Answer";
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";
import { Colors } from "../consts/colors";

interface TestResultProps {
  userAnswers: Record<number, string>;
  correctAnswers: Answer[];
  bandScore: number;
  correctCount: number;
  currentTime: number;
  close: () => void;
}

export const TestResult: React.FC<TestResultProps> = ({
  userAnswers,
  correctAnswers,
  bandScore,
  correctCount,
  currentTime,
  close,
}) => {
  const formatTime = (timeInSeconds: number): string => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}:${Math.floor(
      (timeInSeconds % 1) * 100,
    )
      .toString()
      .padStart(2, "0")}`;
  };

  const isAnswerCorrect = (
    questionNumber: number,
    userAnswer: string,
  ): boolean => {
    const correctAnswer = correctAnswers.find(
      (answer) => answer.number === questionNumber,
    );
    if (!correctAnswer) return false;

    const normalizedUserAnswer = userAnswer?.trim().toLowerCase() || "";
    if (!normalizedUserAnswer) return false;

    return correctAnswer.answers.some(
      (answer) => answer.trim().toLowerCase() === normalizedUserAnswer,
    );
  };

  const getCorrectAnswerText = (questionNumber: number): string => {
    const correctAnswer = correctAnswers.find(
      (answer) => answer.number === questionNumber,
    );
    return correctAnswer ? correctAnswer.answers.join(", ") : "";
  };

  const allQuestions = correctAnswers
    .map((answer) => answer.number)
    .sort((a, b) => a - b);

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
      }}
    >
      <Paper
        sx={{
          width: "60%",
          maxHeight: "90%",
          p: 3,
          position: "relative",
          overflow: "auto",
          backgroundColor: "#ffffff",
        }}
      >
        <Button onClick={close}> ✕ </Button>

        <Box sx={{ textAlign: "center", mb: 3 }}>
          <Typography
            variant="h4"
            sx={{ color: "#b71c1c", fontWeight: "bold", mb: 1 }}
          >
            Band Score: {bandScore}
          </Typography>
          <Typography variant="h5" sx={{ mb: 1, fontWeight: "bold" }}>
            {correctCount}/{allQuestions.length}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "gray",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 1,
            }}
          >
            <span style={{ fontSize: "16px" }}>⏱</span>{" "}
            {formatTime(currentTime)}
          </Typography>
        </Box>

        <TableContainer
          component={Paper}
          sx={{ boxShadow: "none", border: "1px solid #e0e0e0" }}
        >
          <Table size="small">
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                <TableCell
                  sx={{ fontWeight: "bold", textAlign: "center", py: 1 }}
                >
                  #
                </TableCell>
                <TableCell
                  sx={{ fontWeight: "bold", textAlign: "center", py: 1 }}
                >
                  Your Answer
                </TableCell>
                <TableCell
                  sx={{ fontWeight: "bold", textAlign: "center", py: 1 }}
                >
                  Correct Answer
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allQuestions.map((questionNumber) => {
                const userAnswer = userAnswers[questionNumber] || "";
                const isCorrect = isAnswerCorrect(questionNumber, userAnswer);
                const correctAnswerText = getCorrectAnswerText(questionNumber);

                return (
                  <TableRow
                    key={questionNumber}
                    sx={{
                      height: "40px",
                      backgroundColor: isCorrect ? Colors.CORRECT_LIGHT : Colors.INCORRECT_LIGHT,
                    }}
                  >
                    <TableCell
                      sx={{ textAlign: "center", fontWeight: "bold", py: 0.5 }}
                    >
                      {questionNumber}
                    </TableCell>
                    <TableCell sx={{ textAlign: "center", py: 0.5 }}>
                      {userAnswer || ""}
                    </TableCell>
                    <TableCell sx={{ textAlign: "center", py: 0.5 }}>
                      {correctAnswerText}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};
