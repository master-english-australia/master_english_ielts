import { Box, FormControl, MenuItem, Select } from "@mui/material";
import parse, { HTMLReactParserOptions } from "html-react-parser";
import React from "react";
import { QuestionProps } from "../models/props/questionProps";
import { isAnswerCorrect } from "../utils/answerUtils";
import { QuestionNumberBox } from "./QuestionNumberBox";

export const MultipleChoiceInput: React.FC<QuestionProps> = ({
  questionGroup,
  onChangeAnswer,
  answerState,
  correctAnswers,
  isSubmitted,
}) => {
  let fieldIndex = 0;

  const options: HTMLReactParserOptions = {
    replace: (domNode) => {
      if (domNode.type === "text" && domNode.data?.includes("______")) {
        const parts = domNode.data.split("______");
        const nodes = [];

        for (let i = 0; i < parts.length; i++) {
          nodes.push(parts[i]);
          if (i < parts.length - 1) {
            const question = questionGroup.questions[fieldIndex];
            const userAnswer = answerState[Number(question.id)];
            const correctAnswer = correctAnswers.find(
              (answer) => answer.number === Number(question.id),
            );
            const isCorrect = isAnswerCorrect(
              userAnswer || "",
              correctAnswer?.answers || [],
            );

            nodes.push(
              <Box
                key={`select-${fieldIndex}`}
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 1,
                  mx: "2px",
                  my: "2px",
                }}
              >
                <QuestionNumberBox
                  questionNumber={question.id}
                  isCorrect={isCorrect}
                  isSubmitted={isSubmitted}
                />
                <FormControl size="small" sx={{ minWidth: 120 }}>
                  <Select
                    value={
                      isSubmitted
                        ? correctAnswer?.answers?.[0] || ""
                        : userAnswer || ""
                    }
                    onChange={(e) => {
                      onChangeAnswer(Number(question.id), e.target.value);
                    }}
                    disabled={isSubmitted}
                    sx={{
                      height: "26px",
                      backgroundColor: isSubmitted
                        ? isCorrect
                          ? "#e8f5e8"
                          : "#ffeaea"
                        : "white",
                    }}
                  >
                    <MenuItem value="">
                      <em>Select...</em>
                    </MenuItem>
                    {question.options?.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>,
            );
            fieldIndex++;
          }
        }

        return <>{nodes}</>;
      }
    },
  };

  const safeHtmlText = (questionGroup.questionText || "")
    .replace(/<p>/g, "<div>")
    .replace(/<\/p>/g, "</div>");
  const parsedHtml = parse(safeHtmlText, options);

  return (
    <Box padding={2} border={1} borderColor="grey.400" borderRadius={1}>
      <Box
        pl={2}
        sx={{
          "& > div": {
            my: 2,
          },
          "& h3": {
            mt: 3,
          },
          "& em": {
            mb: 3,
          },
          "& table": {
            width: "100%",
            borderCollapse: "collapse",
            marginBottom: 2,
          },
          "& td, & th": {
            border: "1px solid #ddd",
            padding: "8px",
            textAlign: "left",
            verticalAlign: "top",
          },
          "& tr:nth-of-type(even)": {
            backgroundColor: "#f9f9f9",
          },
          "& td ul": {
            paddingLeft: "20px",
            margin: 0,
            listStyleType: "disc",
          },
          "& td li": {
            marginBottom: "4px",
            listStylePosition: "inside",
          },
        }}
      >
        {parsedHtml}
      </Box>
    </Box>
  );
};
