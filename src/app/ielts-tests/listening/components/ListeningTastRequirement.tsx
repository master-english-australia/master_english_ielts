import { Box, Typography } from "@mui/material";
import "react-h5-audio-player/lib/styles.css";
import { SoundPlayer } from "../../components/SoundPlayer";

interface ListeningTastRequirementProps {
  currentPart: number;
  instructions: string;
  isPlaying: boolean;
  toggle: () => void;
  duration: number;
  currentTime: number;
  play: () => void;
  pause: () => void;
  seekTo: (timeInSeconds: number) => void;
}

export const ListeningTastRequirement = ({
  currentPart,
  instructions,
  isPlaying,
  toggle,
  duration,
  currentTime,
  play,
  pause,
  seekTo,
}: ListeningTastRequirementProps) => {
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
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Typography fontWeight="bold">Part {currentPart}</Typography>
        <Typography>{instructions}</Typography>
      </Box>
      <Box sx={{ height: 8 }} />
      <SoundPlayer
        isPlaying={isPlaying}
        toggle={toggle}
        duration={duration}
        currentTime={currentTime}
        play={play}
        pause={pause}
        seekTo={seekTo}
      />
    </Box>
  );
};
