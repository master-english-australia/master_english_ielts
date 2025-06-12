import { Box, TextField } from "@mui/material";
import parse, { HTMLReactParserOptions } from "html-react-parser";
import { QuestionNumberBox } from "../components/QuestionNumberBox";
import { Question } from "../models/Question";

export const HtmlInlineQuestionParser: React.FC<{
  htmlText: string;
  questions: Question[];
}> = ({ htmlText, questions }) => {
  let fieldIndex = 0;

  const options: HTMLReactParserOptions = {
    replace: (domNode) => {
      if (domNode.type === "text" && domNode.data?.includes("______")) {
        const parts = domNode.data.split("______");
        const nodes = [];

        for (let i = 0; i < parts.length; i++) {
          nodes.push(parts[i]);
          if (i < parts.length - 1) {
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
                <QuestionNumberBox questionNumber={questions[fieldIndex].id} />
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

  const parsedHtml = parse(htmlText, options);

  console.log(parsedHtml);

  return <Box>{parsedHtml}</Box>;
};
