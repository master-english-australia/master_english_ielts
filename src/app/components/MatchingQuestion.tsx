import { Box, MenuItem, Select, Typography } from "@mui/material";
import React from "react";
import { QuestionProps } from "../models/props/questionProps";
import { QuestionText } from "./QuestionText";

export const MatchingQuestion: React.FC<QuestionProps> = ({
  questionGroup,
  onChangeAnswer,
  answerState,
}) => {
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
            value={answerState[Number(question.id)] || ""}
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
      ))}
    </Box>
  );
};
