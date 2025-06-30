import { Box, Typography } from "@mui/material";

interface TaskRequirementsProps {
  currentPart: number;
  instructions: string;
}

export const TaskRequirements = ({
  currentPart,
  instructions,
}: TaskRequirementsProps) => {
  return (
    <Box
      p={2}
      sx={{
        marginX: 2,
        minHeight: "50px",
        backgroundColor: "#fff",
        display: "flex",
        flexDirection: "column",
        border: "1px solid #e0e0e0",
      }}
    >
      <Typography fontWeight="bold">Part {currentPart}</Typography>
      <Typography>{instructions}</Typography>
    </Box>
  );
};
