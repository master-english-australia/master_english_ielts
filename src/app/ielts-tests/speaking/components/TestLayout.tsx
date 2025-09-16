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
  followups?: string[];
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
  followups,
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
  const [recorderKey, setRecorderKey] = useState<number>(0);

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
      <Box sx={{ width: "50%", textAlign: "center", mb: 2 }}>
        <Box sx={{ fontWeight: "bold", mb: 1 }}>Question {questionNumber}</Box>
        <Box sx={{ fontWeight: 500, mb: 3 }}>{questionText}</Box>
        {followups && followups.length > 0 && (
          <Box
            component="ul"
            sx={{
              fontWeight: 500,
              mb: 3,
              display: "inline-block",
              textAlign: "left",
              listStyleType: "disc",
              listStylePosition: "inside",
              pl: 0,
              m: 0,
            }}
          >
            {followups.map((followup, index) => (
              <Box component="li" key={index} sx={{ mb: 0.5 }}>
                {followup}
              </Box>
            ))}
          </Box>
        )}
      </Box>
      <MicRecorder
        key={recorderKey}
        isSubmitted={isSubmitted}
        onAudioRecorded={(url) => setHasRecording(Boolean(url))}
        onAudioBlobReady={onAudioBlobReady}
      />
      <Box sx={{ width: 260, maxWidth: "100%" }}>
        {hasRecording && (
          <Button
            fullWidth
            variant="outlined"
            color="error"
            onClick={() => {
              if (typeof window === "undefined") return;
              const confirmed = window.confirm(
                "Are you sure you want to clear the recording?",
              );
              if (!confirmed) return;
              if (onAudioBlobReady) onAudioBlobReady(null);
              setHasRecording(false);
              setRecorderKey((k) => k + 1);
            }}
            disabled={isSubmitted || !hasRecording}
            sx={{
              fontSize: "12px",
              fontWeight: 400,
              textTransform: "none",
              mb: 1,
              "&.Mui-disabled": {
                borderColor: "rgba(244, 67, 54, 0.3)",
                color: "rgba(244, 67, 54, 0.3)",
              },
            }}
          >
            Clear Recording
          </Button>
        )}
        <Button
          fullWidth
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
      </Box>
    </Container>
  );
};
