// @ts-ignore: No types for 'react-mic'
declare module 'react-mic';

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { useRef } from 'react';
import { MicRecorder } from './MicRecorder';

interface TestLayoutProps {
  questionNumber: number;
  questionText: string;
  onPrev: () => void;
  onNext: () => void;
  onSubmit: () => void;
  isFirst: boolean;
  isLast: boolean;
  isSubmitted: boolean;
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
}: TestLayoutProps) => {
  const layoutRef = useRef<HTMLDivElement>(null);

  return (
    <Container maxWidth={false} ref={layoutRef} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 4 }}>
      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Button
          variant="outlined"
          startIcon={<ArrowBackIosNewIcon />}
          onClick={onPrev}
          disabled={isFirst}
        >
          Previous Question
        </Button>
        <Button
          variant="outlined"
          endIcon={<ArrowForwardIosIcon />}
          onClick={onNext}
          disabled={isLast}
        >
          Next Question
        </Button>
      </Box>
      <Box sx={{ width: '100%', textAlign: 'center', mb: 2 }}>
        <Box sx={{ fontWeight: 'bold', fontSize: 18, mb: 1 }}>Question {questionNumber}</Box>
        <Box sx={{ fontSize: 20, fontWeight: 500, mb: 3 }}>{questionText}</Box>
      </Box>
      <MicRecorder isSubmitted={isSubmitted} />
      <Button
        variant="contained"
        color="success"
        onClick={onSubmit}
        disabled={isSubmitted}
      >
        Submit Answer
      </Button>
    </Container>
  );
}; 