import WatchLaterIcon from "@mui/icons-material/WatchLater";
import { Box, Typography } from "@mui/material";
import { formatTime, useTimer } from "../utils/timerHandler";

interface TestHeaderProps {
  timeLimit: number;
}

export const TestHeader = ({ timeLimit }: TestHeaderProps) => {
  const { timeLeft, overtime } = useTimer(timeLimit);

  return (
    <Box
      sx={{
        width: "100%",
        padding: "1rem 0",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <WatchLaterIcon sx={{ fontSize: 18 }} />
      <Box width={8} />
      <Typography
        variant="body1"
        fontWeight={600}
        color={timeLeft === 0 ? "error.main" : "text.primary"}
      >
        {timeLeft > 0
          ? formatTime(timeLeft)
          : `+${formatTime(overtime)}`}
      </Typography>
    </Box>
  );
};
