import { Answer } from "@/app/models/Answer";
import { Box } from "@mui/material";
import { useCallback, useRef, useState } from "react";
import { ResizeHandle } from "../../../components/ResizeHandle";
import { QuestionGroup } from "../../../models/QuestionGroup";
import { createResizeEventHandlers } from "../../../utils/resizeEventHandler";
import { AnswerSection } from "./AnswerSection";
import { TaskPrompt } from "./TaskPrompt";

interface TestLayoutProps {
  currentPart: number;
  promptContent: string;
  isSubmitted: boolean;
  questionGroups: QuestionGroup[];
  correctAnswers: Answer[];
}

export const TestLayout = ({
  promptContent,
  isSubmitted,
  questionGroups,
  correctAnswers,
}: TestLayoutProps) => {
  const [contentWidth, setContentWidth] = useState(50);
  const [answerWidth, setAnswerWidth] = useState(50);
  const layoutRef = useRef<HTMLDivElement>(null);

  const taskPromptId = "task-prompt";
  const answerSectionId = "answer-section";

  const handleResizeStart = useCallback(
    (e: React.MouseEvent) => {
      createResizeEventHandlers(e, layoutRef, setContentWidth, setAnswerWidth);
    },
    [contentWidth, answerWidth],
  );

  return (
    <Box
      mt={1}
      px={2}
      ref={layoutRef}
      display="flex"
      gap={2}
      width="100%"
      height="100%"
      position="relative"
    >
      <TaskPrompt
        id={taskPromptId}
        contentWidth={contentWidth}
        promptContent={promptContent}
        promptTitle={""}
      />

      <ResizeHandle
        contentWidth={contentWidth}
        onResizeStart={handleResizeStart}
      />

      <AnswerSection
        id={answerSectionId}
        answerWidth={answerWidth}
        isSubmitted={isSubmitted}
        questionGroups={questionGroups}
        correctAnswers={correctAnswers}
      />
    </Box>
  );
};
