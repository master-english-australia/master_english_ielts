// @ts-ignore: No types for 'react-mic'
declare module "react-mic";

import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { useEffect, useRef, useState } from "react";
import { MicRecorder } from "./MicRecorder";

interface TestLayoutProps {
  questionNumber: number;
  questionText: string;
  onPrev: () => void;
  onNext: () => void;
  onSubmit: () => void;
  isFirst: boolean;
  isLast: boolean;
  isSubmitted: boolean;
  onAudioBlobReady?: (blob: Blob | null) => void;
}

export const TestLayout = ({
  questionNumber,
  questionText,
  onPrev,
  onNext,
  onSubmit,
  isFirst,
  isLast,
  isSubmitted,
  onAudioBlobReady,
}: TestLayoutProps) => {
  const layoutRef = useRef<HTMLDivElement>(null);
  const [hasRecording, setHasRecording] = useState<boolean>(false);

  useEffect(() => {
    setHasRecording(false);
  }, [questionNumber]);

  const buttonStyles = {
    color: "white",
    backgroundColor: "black",
    fontSize: "12px",
    fontWeight: 400,
    textTransform: "none",
    "&.Mui-disabled": {
      color: "white",
      backgroundColor: "grey",
    },
  };

  return (
    <Container
      maxWidth={false}
      ref={layoutRef}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        py: 4,
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          mb: 2,
        }}
      >
        <Button
          variant="outlined"
          startIcon={<ArrowBackIosNewIcon sx={{ scale: 0.8 }} />}
          onClick={onPrev}
          disabled={isFirst}
          sx={buttonStyles}
        >
          Previous Question
        </Button>
        <Button
          variant="outlined"
          endIcon={<ArrowForwardIosIcon sx={{ scale: 0.8 }} />}
          onClick={onNext}
          disabled={isLast}
          sx={buttonStyles}
        >
          Next Question
        </Button>
      </Box>
      <Box sx={{ width: "100%", textAlign: "center", mb: 2 }}>
        <Box sx={{ fontWeight: "bold", mb: 1 }}>Question {questionNumber}</Box>
        <Box sx={{ fontWeight: 500, mb: 3 }}>{questionText}</Box>
      </Box>
      <MicRecorder
        isSubmitted={isSubmitted}
        onAudioRecorded={(url) => setHasRecording(Boolean(url))}
        onAudioBlobReady={onAudioBlobReady}
      />
      <Button
        variant="contained"
        color="success"
        onClick={onSubmit}
        disabled={isSubmitted || !hasRecording}
        sx={{
          fontSize: "12px",
          fontWeight: 400,
          textTransform: "none",
          "&.Mui-disabled": {
            backgroundColor: "rgba(76, 175, 80, 0.3)",
            color: "rgba(255, 255, 255, 0.3)",
          },
        }}
      >
        Submit Answer
      </Button>
    </Container>
  );
};
