import Link from 'next/link';
import { Feedback } from '../types/feedback';

interface FeedbackViewProps {
  feedback: Feedback | null;
}

export const FeedbackView = ({ feedback }: FeedbackViewProps) => {
  if (!feedback) return null;

  return (
    <div className="feedback-container">
      <div className="feedback-header">Essay Feedback</div>
      
      <div className="score-summary">
        <div className="score-item">
          <span className="score-label">Task Achievement</span>
          <span className="score-value">{feedback.taskAchievement.toFixed(1)}</span>
        </div>
        <div className="score-item">
          <span className="score-label">Coherence & Cohesion</span>
          <span className="score-value">{feedback.coherenceAndCohesion.toFixed(1)}</span>
        </div>
        <div className="score-item">
          <span className="score-label">Lexical Resource</span>
          <span className="score-value">{feedback.lexicalResource.toFixed(1)}</span>
        </div>
        <div className="score-item">
          <span className="score-label">Grammatical Range</span>
          <span className="score-value">{feedback.grammaticalRange.toFixed(1)}</span>
        </div>
      </div>
      
      <div className="feedback-section">
        <div className="score-item">
          <span className="score-label">Overall Band Score</span>
          <span className="score-value">{feedback.overallBand.toFixed(1)}</span>
        </div>
      </div>
      
      <div className="feedback-details">
        <div className="feedback-section">
          <div className="feedback-section-title">Comments:</div>
          <p>{feedback.comments}</p>
        </div>
      </div>
      
      <div className="test-navigation">
        <Link href="/ielts-tests/writing" className="nav-btn">
          Back to Writing Tests
        </Link>
      </div>
    </div>
  );
}; 