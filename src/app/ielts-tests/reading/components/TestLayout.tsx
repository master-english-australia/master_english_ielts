import { useCallback, useRef, useState } from 'react';
import { ResizeHandle } from '../../components/ResizeHandle';
import { QuestionGroup } from '../../models/QuestionGroup';
import { createResizeEventHandlers } from '../../writing/utils/resizeEventHandler';
import { AnswerSection } from './AnswerSection';
import { TaskPrompt } from './TaskPrompt';

interface TestLayoutProps {
  currentPart: number;
  promptContent: string;
  isSubmitted: boolean;
  questionGroups: QuestionGroup[];
}

export const TestLayout = ({
  promptContent,
  isSubmitted,
  questionGroups,
}: TestLayoutProps) => {
  const [contentWidth, setContentWidth] = useState(50);
  const [answerWidth, setAnswerWidth] = useState(50);
  const [isResizing, setIsResizing] = useState(false);
  const layoutRef = useRef<HTMLDivElement>(null);

  const taskPromptId = 'task-prompt';
  const answerSectionId = 'answer-section';

  const handleResizeStart = useCallback((e: React.MouseEvent) => {
    createResizeEventHandlers(
      e,
      layoutRef,
      contentWidth,
      answerWidth,
      {
        setContentWidth,
        setAnswerWidth,
        setIsResizing
      },
      taskPromptId,
      answerSectionId
    );
  }, [contentWidth, answerWidth]);

  return (
    <div className="two-column-layout" ref={layoutRef}>
      <TaskPrompt
        id={taskPromptId}
        contentWidth={contentWidth}
        promptContent={promptContent}
      />
      
      <ResizeHandle
        isResizing={isResizing}
        answerWidth={answerWidth}
        onResizeStart={handleResizeStart}
      />
      
      <AnswerSection
        id={answerSectionId}
        answerWidth={answerWidth}
        isSubmitted={isSubmitted}
        questionGroups={questionGroups}
      />
    </div>
  );
}; 