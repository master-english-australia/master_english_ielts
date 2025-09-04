import { Box } from "@mui/material";
import { Colors } from "../consts/colors";

export const QuestionNumberBox: React.FC<{
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
        width: "24px",
        height: "24px",
        color: isSubmitted ? "white" : "black",
        border: "1px solid black",
        borderRadius: "2px",
        fontSize: "0.8rem",
        fontWeight: "bold",
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
