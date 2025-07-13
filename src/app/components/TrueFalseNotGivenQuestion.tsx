import { Box, Radio, Typography } from "@mui/material";
import React from "react";
import { QuestionProps } from "../models/props/questionProps";
import { QuestionText } from "./QuestionText";

const options = ["TRUE", "FALSE", "NOT GIVEN"];

export const TrueFalseNotGivenQuestion: React.FC<QuestionProps> = ({
  questionGroup,
  onChangeAnswer,
  answerState,
}) => (
  <Box marginY={2}>
    <Typography sx={{ textAlign: "left", mb: 2 }}>
      {questionGroup.instruction}
    </Typography>
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 1,
        my: 4,
        textAlign: "left",
      }}
    >
      <Typography sx={{ display: "flex", gap: 4, textAlign: "left" }}>
        <Box component="span" sx={{ width: "120px", fontWeight: "bold" }}>
          TRUE
        </Box>
        <Box component="span">if the statement agrees with the information</Box>
      </Typography>
      <Typography sx={{ display: "flex", gap: 4, textAlign: "left" }}>
        <Box component="span" sx={{ width: "120px", fontWeight: "bold" }}>
          FALSE
        </Box>
        <Box component="span">if the statement contradicts the information</Box>
      </Typography>
      <Typography sx={{ display: "flex", gap: 4, textAlign: "left" }}>
        <Box component="span" sx={{ width: "120px", fontWeight: "bold" }}>
          NOT GIVEN
        </Box>
        <Box component="span">if there is no information on this</Box>
      </Typography>
    </Box>
    {questionGroup.questions.map((question) => (
      <Box marginY={2} key={question.id}>
        <QuestionText number={question.id} text={question.questionText || ""} />
        <Box sx={{ display: "flex", flexDirection: "column", mt: 1 }}>
          {options.map((opt) => (
            <Box
              key={question.id + opt}
              sx={{ display: "flex", alignItems: "center" }}
            >
              <Radio
                value={opt}
                checked={opt === answerState[Number(question.id)]}
                onChange={(e) => {
                  onChangeAnswer(Number(question.id), e.target.value);
                }}
              />
              <Typography>{opt}</Typography>
            </Box>
          ))}
        </Box>
      </Box>
    ))}
  </Box>
);
