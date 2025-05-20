import { FloatingLabelTextarea } from '@/components/FloatingLabelTextarea';
import { Feedback } from '../types/feedback';
import { FeedbackView } from './FeedbackView';

interface AnswerSectionProps {
  answerWidth: number;
  isSubmitted: boolean;
  currentPart: 'part1' | 'part2';
  part1Essay: string;
  part2Essay: string;
  wordCount: number;
  feedback: Feedback | null;
  onEssayChange: (part: 'part1' | 'part2', value: string) => void;
}

export const AnswerSection = ({
  answerWidth,
  isSubmitted,
  currentPart,
  part1Essay,
  part2Essay,
  wordCount,
  feedback,
  onEssayChange
}: AnswerSectionProps) => {
  return (
    <div 
      className="answer-section"
      style={{
        width: `${answerWidth}%`,
        maxWidth: `${answerWidth}%`,
        flex: `0 0 ${answerWidth}%`
      }}
    >
      {!isSubmitted ? (
        <div className="editor-container">
          <FloatingLabelTextarea
            value={currentPart === 'part1' ? part1Essay : part2Essay}
            onChange={(e) => onEssayChange(currentPart, e.target.value)}
            label={`Part ${currentPart === 'part1' ? '1' : '2'} Answer`}
            placeholder={`Enter your part ${currentPart === 'part1' ? '1' : '2'} answer...`}
            disabled={isSubmitted}
          />
          
          <div className="word-count">Word Count: {wordCount}</div>
        </div>
      ) : (
        <FeedbackView feedback={feedback} />
      )}
    </div>
  );
}; 