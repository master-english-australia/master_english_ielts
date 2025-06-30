import { MoreVert, Pause, PlayArrow, VolumeUp } from "@mui/icons-material";
import { Box, IconButton, Slider, Typography } from "@mui/material";

interface SoundPlayerProps {
  isPlaying: boolean;
  toggle: () => void;
  duration: number;
  currentTime: number;
  play: () => void;
  pause: () => void;
  seekTo: (timeInSeconds: number) => void;
}

export const SoundPlayer = ({
  isPlaying,
  toggle,
  duration,
  currentTime,
  play,
  pause,
  seekTo,
}: SoundPlayerProps) => {
  function formatDuration(value: number) {
    const minute = Math.floor(value / 60);
    const secondLeft = Math.floor(value - minute * 60);
    return `${minute}:${secondLeft < 10 ? `0${secondLeft}` : secondLeft}`;
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#f4f4f4",
        borderRadius: 8,
        px: 2,
      }}
    >
      <IconButton sx={{ mr: 1 }} onClick={toggle}>
        {isPlaying ? (
          <Pause sx={{ fontSize: 20 }} />
        ) : (
          <PlayArrow sx={{ fontSize: 20 }} />
        )}
      </IconButton>
      <Typography width={28}>{formatDuration(currentTime)}</Typography>
      <Typography mx={1}>/</Typography>
      <Typography width={28}>{formatDuration(duration)}</Typography>
      <Slider
        aria-label="time-indicator"
        size="small"
        value={currentTime}
        min={0}
        step={0.5}
        max={duration}
        onChange={(_, value) => {
          seekTo(value);
        }}
        sx={(t) => ({
          mx: 2,
          color: "rgba(0,0,0,0.87)",
          height: 4,
          transition: "none",
          "& .MuiSlider-thumb": {
            width: 8,
            height: 8,
            transition: "none",
            "&::before": {
              boxShadow: "0 2px 12px 0 rgba(0,0,0,0.4)",
            },
            "&:hover, &.Mui-focusVisible": {
              boxShadow: `0px 0px 0px 8px ${"rgb(0 0 0 / 16%)"}`,
              ...t.applyStyles("dark", {
                boxShadow: `0px 0px 0px 8px ${"rgb(255 255 255 / 16%)"}`,
              }),
            },
            "&.Mui-active": {
              width: 20,
              height: 20,
            },
          },
          "& .MuiSlider-rail": {
            opacity: 0.28,
          },
          ...t.applyStyles("dark", {
            color: "#fff",
          }),
        })}
      />
      <IconButton>
        <VolumeUp sx={{ fontSize: 20 }} />
      </IconButton>
      <IconButton>
        <MoreVert sx={{ fontSize: 20 }} />
      </IconButton>
    </Box>
  );
};
