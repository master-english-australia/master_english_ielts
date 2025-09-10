import { Box, Button, Stack, Typography } from "@mui/material";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Answer } from "../models/Answer";
import { QuestionPart } from "../models/QuestionPart";
import { PartSwitcherQuestionNumber } from "./PartSwitcherQuestionNumber";

interface PartSwitcherProps {
  currentPart: number;
  totalParts: number;
  isSubmitted: boolean;
  onPartChange: (part: number) => void;
  onSubmit?: () => void;
  allParts: QuestionPart[];
  correctAnswers: Answer[];
  userAnswers: Record<number, string>;
}

export const PartSwitcher = ({
  currentPart,
  totalParts,
  isSubmitted,
  onPartChange,
  onSubmit,
  allParts,
  correctAnswers,
  userAnswers,
}: PartSwitcherProps) => {
  const parts = Array.from({ length: totalParts }, (_, i) => i + 1);

  return (
    <Box sx={{ width: "100%", px: 2 }}>
      <Stack spacing={2} sx={{ width: "100%" }}>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Stack direction="row" spacing={1}>
            <Button
              variant="outlined"
              size="small"
              onClick={() => onPartChange(currentPart - 1)}
              disabled={currentPart === 1}
              sx={{
                minWidth: "auto",
                p: 1,
                color: "white",
                backgroundColor: currentPart > 1 ? "black" : "grey.300",
                borderColor: currentPart > 1 ? "black" : "grey.300",
              }}
            >
              <IoIosArrowBack />
            </Button>
            <Button
              variant="outlined"
              size="small"
              onClick={() => onPartChange(currentPart + 1)}
              disabled={currentPart === totalParts}
              sx={{
                minWidth: "auto",
                p: 1,
                color: "white",
                backgroundColor:
                  currentPart < totalParts ? "black" : "grey.300",
                borderColor: currentPart < totalParts ? "black" : "grey.300",
              }}
            >
              <IoIosArrowForward />
            </Button>
          </Stack>
          {onSubmit && (
            <Button
              variant="contained"
              color="success"
              onClick={() => {
                if (!onSubmit) return;
                const message =
                  "Are you sure you want to end the test and submit your answers?";
                if (typeof window === "undefined") return;
                const confirmed = window.confirm(message);
                if (confirmed) onSubmit();
              }}
              disabled={isSubmitted}
              sx={{
                textTransform: "none",
              }}
            >
              Submit
            </Button>
          )}
        </Box>
        <Box sx={{ backgroundColor: "white" }}>
          <Stack
            direction="row"
            spacing={1}
            sx={{
              width: "100%",
              mb: 2,
              "& > button": {
                flex: 1,
                minWidth: 0,
                color: "black",
                border: "1px solid grey.300",
              },
            }}
          >
            {parts.map((partNumber) => {
              const questions =
                allParts
                  .find((part) => part.id === `${partNumber}`)
                  ?.question_groups.map((group) => group.questions)
                  .flat() || [];

              return (
                <Button
                  key={partNumber}
                  variant="outlined"
                  onClick={() => onPartChange(partNumber)}
                  sx={{
                    py: 1,
                    border:
                      currentPart === partNumber
                        ? "1px solid red"
                        : "1px solid grey",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      gap: 0.5,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Typography sx={{ fontSize: "16px", fontWeight: "bold" }}>
                      PART {partNumber}:
                    </Typography>
                    {questions.map((question) => {
                      const correctAnswer = correctAnswers.find(
                        (answer) => answer.number === Number(question.id),
                      );
                      const userAnswer = userAnswers[Number(question.id)];
                      const isCorrect = correctAnswer?.answers.includes(
                        userAnswer || "",
                      );
                      return (
                        <PartSwitcherQuestionNumber
                          key={question.id}
                          questionNumber={question.id}
                          isCorrect={isCorrect || false}
                          isSubmitted={isSubmitted}
                        />
                      );
                    })}
                  </Box>
                </Button>
              );
            })}
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};
