import WatchLaterIcon from "@mui/icons-material/WatchLater";
import { Box, Typography } from "@mui/material";
import {
  formatTime,
  useTimer,
} from "../ielts-tests/writing/utils/timerHandler";

interface TestHeaderProps {
  timeLimit: number;
  onTimeUp: () => void;
}

export const TestHeader = ({ timeLimit, onTimeUp }: TestHeaderProps) => {
  const timer = useTimer(timeLimit, onTimeUp);

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
      <Typography variant="body1" fontWeight={600}>
        {formatTime(timer)}
      </Typography>
    </Box>
  );
};
