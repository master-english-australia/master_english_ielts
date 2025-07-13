import { Box, Radio, Typography } from "@mui/material";
import React from "react";
import { QuestionProps } from "../models/props/questionProps";
import { QuestionText } from "./QuestionText";

export const MultipleChoiceQuestion: React.FC<QuestionProps> = ({
  questionGroup,
  onChangeAnswer,
}) => (
  <Box>
    <Typography sx={{ textAlign: "left", mb: 2 }}>
      {questionGroup.instruction}
    </Typography>
    {questionGroup.questions.map((question) => (
      <Box key={question.id} my={2}>
        <QuestionText text={question.questionText || ""} number={question.id} />
        <Box height={8} />
        {question.options?.map((option, index) => (
          <Box key={index} sx={{ display: "flex", alignItems: "center" }}>
            <Radio
              value={option}
              checked={question.correctAnswer === option}
              onChange={() => {}}
            />
            {option}
          </Box>
        ))}
      </Box>
    ))}
  </Box>
);
