import { Box } from "@mui/material";
import { Colors } from "../consts/colors";

export const PartSwitcherQuestionNumber: React.FC<{
  questionNumber: string;
  isCorrect: boolean;
  isSubmitted: boolean;
}> = ({ questionNumber, isCorrect, isSubmitted }) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "20px",
        height: "20px",
        fontSize: "12px",
        color: isSubmitted ? "white" : "black",
        border: "1px solid black",
        borderRadius: "4px",
        backgroundColor: isSubmitted
          ? isCorrect
            ? Colors.CORRECT
            : Colors.INCORRECT
          : "white",
      }}
    >
      {questionNumber}
    </Box>
  );
};
