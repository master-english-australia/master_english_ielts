import { Box, MenuItem, Select, Typography } from "@mui/material";
import React, { useState } from "react";
import { QuestionGroup } from "../models/QuestionGroup";
import { QuestionText } from "./QuestionText";

type Props = {
  questionGroup: QuestionGroup;
};

export const MatchingQuestion: React.FC<Props> = ({ questionGroup }) => {
  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<string, string>
  >({});

  const handleAnswerChange = (questionId: string, value: string) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  return (
    <Box>
      <Typography sx={{ textAlign: "left", mb: 2 }}>
        {questionGroup.instruction}
      </Typography>
      {questionGroup.questions.map((question) => (
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
          />
          <Select
            size="small"
            value={selectedAnswers[question.id] || ""}
            onChange={(e) => handleAnswerChange(question.id, e.target.value)}
            sx={{ width: "120px", height: "26px" }}
          >
            {question.options?.map((opt) => (
              <MenuItem key={opt} value={opt}>
                {opt}
              </MenuItem>
            ))}
          </Select>
        </Box>
      ))}
    </Box>
  );
};
