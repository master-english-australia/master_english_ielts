import { Box } from "@mui/material";

export const QuestionNumberBox: React.FC<{ questionNumber: string }> = ({
  questionNumber,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "28px",
        height: "28px",
        color: "black",
        border: "1px solid black",
        borderRadius: "2px",
        fontWeight: "bold",
      }}
    >
      {questionNumber}
    </Box>
  );
};
