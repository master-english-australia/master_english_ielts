'use client';

import '@/app/ielts-tests/writing/[id]/WritingTest.css';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

interface WritingTestProps {
  testId: string;
}

interface TestData {
  id: string;
  title: string;
  question: string;
  type: string;
  description: string;
}

export default function WritingTest({ testId }: WritingTestProps) {
  const [wordCount, setWordCount] = useState(0);
  const [answer, setAnswer] = useState('');
  const [testData, setTestData] = useState<TestData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [questionWidth, setQuestionWidth] = useState(50);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const router = useRouter();
  const resizeHandleRef = useRef<HTMLDivElement>(null);
  const isResizing = useRef(false);
  const startX = useRef(0);
  const startWidth = useRef(0);

  useEffect(() => {
    const fetchTestData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await fetch(`/api/ielts-tests/writing/${testId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch test data');
        }
        const data = await response.json();
        setTestData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTestData();
  }, [testId]);

  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      if (e.target === resizeHandleRef.current) {
        isResizing.current = true;
        startX.current = e.clientX;
        startWidth.current = questionWidth;
        document.body.style.cursor = 'col-resize';
        document.body.style.userSelect = 'none';
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing.current) return;

      const container = document.querySelector('.writing-test-content') as HTMLElement;
      if (!container) return;

      const containerRect = container.getBoundingClientRect();
      const deltaX = e.clientX - startX.current;
      const deltaPercent = (deltaX / containerRect.width) * 100;
      const newWidth = startWidth.current + deltaPercent;
      
      // Ensure the width stays within bounds
      const clampedWidth = Math.max(30, Math.min(70, newWidth));
      setQuestionWidth(clampedWidth);
    };

    const handleMouseUp = () => {
      if (isResizing.current) {
        isResizing.current = false;
        document.body.style.cursor = '';
        document.body.style.userSelect = '';
      }
    };

    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [questionWidth]);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setAnswer(text);
    const words = text.trim().split(/\s+/).filter(word => word.length > 0);
    setWordCount(words.length);
  };

  const handleSubmit = () => {
    setShowConfirmation(true);
  };

  const handleConfirmSubmit = async () => {
    try {
      // TODO: Implement actual submission logic
      console.log('Submitting answer:', answer);
      router.push('/ielts-tests/writing/success');
    } catch (err) {
      setError('Failed to submit the test. Please try again.');
    }
  };

  const handleCancelSubmit = () => {
    setShowConfirmation(false);
  };

  if (isLoading) {
    return (
      <div className="writing-test-container">
        <div className="loading">Loading test data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="writing-test-container">
        <div className="error-message">{error}</div>
      </div>
    );
  }

  if (!testData) {
    return (
      <div className="writing-test-container">
        <div className="error-message">Test data not found</div>
      </div>
    );
  }

  return (
    <div className="writing-test-container">
      <div className="writing-test-header">
        <h1>{testData.title}</h1>
        <div className="word-count">Word count: {wordCount}</div>
      </div>

      <div className="writing-test-content">
        <div 
          className="question-section" 
          style={{ width: `${questionWidth}%` }}
        >
          <h2>Task 1</h2>
          <div className="question-text">
            <p>{testData.question}</p>
          </div>
        </div>

        <div 
          ref={resizeHandleRef}
          className="resize-handle"
        />

        <div 
          className="answer-section"
          style={{ width: `${100 - questionWidth}%` }}
        >
          <textarea
            className="answer-textarea"
            value={answer}
            onChange={handleTextChange}
            placeholder="Type your answer here..."
            rows={20}
          />
        </div>
      </div>

      <div className="writing-test-footer">
        <button className="submit-btn" onClick={handleSubmit}>Submit</button>
      </div>

      {showConfirmation && (
        <div className="confirmation-dialog-overlay">
          <div className="confirmation-dialog">
            <h3>Confirm Submission</h3>
            <p>Are you sure you want to submit your test? This action cannot be undone.</p>
            <div className="confirmation-buttons">
              <button className="cancel-btn" onClick={handleCancelSubmit}>Cancel</button>
              <button className="confirm-btn" onClick={handleConfirmSubmit}>Confirm</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 