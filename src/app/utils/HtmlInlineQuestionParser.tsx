import { QuestionNumberBox } from "@/app/components/QuestionNumberBox";
import { Box, TextField } from "@mui/material";
import parse, { HTMLReactParserOptions } from "html-react-parser";
import { AnswerState } from "../contexts/createAnswerContext";
import { Question } from "../models/Question";

export const HtmlInlineQuestionParser: React.FC<{
  htmlText: string;
  questions: Question[];
  onChangeAnswer: (questionNumber: number, value: string) => void;
  answerState: AnswerState;
}> = ({ htmlText, questions, onChangeAnswer, answerState }) => {
  let fieldIndex = 0;

  const options: HTMLReactParserOptions = {
    replace: (domNode) => {
      if (domNode.type === "text" && domNode.data?.includes("______")) {
        const parts = domNode.data.split("______");
        const nodes = [];

        for (let i = 0; i < parts.length; i++) {
          nodes.push(parts[i]);
          if (i < parts.length - 1) {
            const question = questions[fieldIndex];
            nodes.push(
              <Box
                key={`input-${fieldIndex}`}
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 1,
                  mx: "2px",
                  my: "2px",
                }}
              >
                <QuestionNumberBox questionNumber={question.id} />
                <TextField
                  key={`input-${fieldIndex}`}
                  size="small"
                  slotProps={{
                    input: {
                      sx: {
                        width: "160px",
                        height: "26px",
                      },
                    },
                  }}
                  value={answerState[Number(question.id)] || ""}
                  onChange={(e) => {
                    onChangeAnswer(Number(question.id), e.target.value);
                  }}
                />
              </Box>,
            );
            fieldIndex++;
          }
        }

        return <>{nodes}</>;
      }
    },
  };

  const safeHtmlText = htmlText
    .replace(/<p>/g, "<div>")
    .replace(/<\/p>/g, "</div>");
  const parsedHtml = parse(safeHtmlText, options);

  return (
    <Box
      sx={{
        "& > div": {
          my: 3,
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
  );
};
