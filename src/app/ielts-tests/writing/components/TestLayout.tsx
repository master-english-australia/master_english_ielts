import { useCallback, useRef, useState } from 'react';
import { createResizeEventHandlers } from '../utils/resizeEventHandler';
import { AnswerSection } from './AnswerSection';
import { ResizeHandle } from './ResizeHandle';
import { TaskPrompt } from './TaskPrompt';

interface TestLayoutProps {
  currentPart: 'part1' | 'part2';
  promptTitle: string;
  promptContent: string;
  isSubmitted: boolean;
  part1Essay: string;
  part2Essay: string;
  wordCount: number;
  feedback: any;
  onEssayChange: (part: 'part1' | 'part2', value: string) => void;
}

export const TestLayout = ({
  currentPart,
  promptTitle,
  promptContent,
  isSubmitted,
  part1Essay,
  part2Essay,
  wordCount,
  feedback,
  onEssayChange
}: TestLayoutProps) => {
  const [contentWidth, setContentWidth] = useState(50);
  const [answerWidth, setAnswerWidth] = useState(50);
  const [isResizing, setIsResizing] = useState(false);
  const layoutRef = useRef<HTMLDivElement>(null);

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
      }
    );
  }, [contentWidth, answerWidth]);

  return (
    <div className="two-column-layout" ref={layoutRef}>
      <TaskPrompt
        contentWidth={contentWidth}
        promptTitle={promptTitle}
        promptContent={promptContent}
      />
      
      <ResizeHandle
        isResizing={isResizing}
        answerWidth={answerWidth}
        onResizeStart={handleResizeStart}
      />
      
      <AnswerSection
        answerWidth={answerWidth}
        isSubmitted={isSubmitted}
        currentPart={currentPart}
        part1Essay={part1Essay}
        part2Essay={part2Essay}
        wordCount={wordCount}
        feedback={feedback}
        onEssayChange={onEssayChange}
      />
    </div>
  );
}; 