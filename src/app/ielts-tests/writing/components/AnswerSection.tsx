import { Box, TextField, Typography } from "@mui/material";

interface AnswerSectionProps {
  id: string;
  answerWidth: number;
  currentPart: number;
  part1Essay: string;
  part2Essay: string;
  wordCount: number;
  onEssayChange: (part: number, value: string) => void;
}

export const AnswerSection = ({
  id,
  answerWidth,
  currentPart,
  part1Essay,
  part2Essay,
  wordCount,
  onEssayChange,
}: AnswerSectionProps) => {
  const currentEssay = currentPart === 1 ? part1Essay : part2Essay;

  return (
    <Box
      id={id}
      width={`${answerWidth}%`}
      maxWidth={`${answerWidth}%`}
      flex={`0 0 ${answerWidth}%`}
      sx={{
        overflowY: "auto",
        padding: "1.5rem",
        transition: "width 0.1s ease",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1 }}>
        Part {currentPart} Answer
      </Typography>

      <TextField
        placeholder={`Enter your part ${currentPart} answer...`}
        multiline
        minRows={15}
        fullWidth
        variant="outlined"
        value={currentEssay}
        onChange={(e) => onEssayChange(currentPart, e.target.value)}
        sx={{
          mb: 1,
          backgroundColor: "#fff",
          "& textarea": {
            fontSize: "1rem",
            lineHeight: 1.6,
          },
        }}
      />

      <Typography variant="body2" color="text.secondary">
        Word Count: {wordCount}
      </Typography>
    </Box>
  );
};
