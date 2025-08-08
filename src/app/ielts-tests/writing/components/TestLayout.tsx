import { Box } from "@mui/material";
import { useCallback, useRef, useState } from "react";
import { ResizeHandle } from "../../../components/ResizeHandle";
import { createResizeEventHandlers } from "../../../utils/resizeEventHandler";
import { AnswerSection } from "./AnswerSection";
import { TaskPrompt } from "./TaskPrompt";

interface TestLayoutProps {
  currentPart: number;
  promptTitle: string;
  promptContent: string;
  isSubmitted: boolean;
  part1Essay: string;
  part2Essay: string;
  wordCount: number;
  onEssayChange: (part: number, value: string) => void;
}

export const TestLayout = ({
  currentPart,
  promptTitle,
  promptContent,
  isSubmitted,
  part1Essay,
  part2Essay,
  wordCount,
  onEssayChange,
}: TestLayoutProps) => {
  const [contentWidth, setContentWidth] = useState(50);
  const [answerWidth, setAnswerWidth] = useState(50);
  const layoutRef = useRef<HTMLDivElement>(null);

  const handleResizeStart = useCallback((e: React.MouseEvent) => {
    createResizeEventHandlers(e, layoutRef, setContentWidth, setAnswerWidth);
  }, []);

  return (
    <Box
      p={2}
      ref={layoutRef}
      display="flex"
      gap={2}
      width="100%"
      position="relative"
    >
      <TaskPrompt
        id="content-prompt"
        contentWidth={contentWidth}
        promptTitle={promptTitle}
        promptContent={promptContent}
      />

      <ResizeHandle
        contentWidth={contentWidth}
        onResizeStart={handleResizeStart}
      />

      <AnswerSection
        id="answer-section"
        answerWidth={answerWidth}
        currentPart={currentPart}
        part1Essay={part1Essay}
        part2Essay={part2Essay}
        wordCount={wordCount}
        onEssayChange={onEssayChange}
      />
    </Box>
  );
};
