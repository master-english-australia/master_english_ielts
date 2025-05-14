'use client';

import '@/styles/writing-test.css';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';

// Mock data for writing tests
const writingTests = {
  'academic-task-1-chart': {
    id: 'academic-task-1-chart',
    title: 'Academic Writing Task 1 - Chart',
    type: 'Academic',
    task: 'Task 1',
    timeLimit: 1200, // 20 minutes
    promptTitle: 'The charts below show the percentage of water used for different purposes in six areas of the world.',
    promptContent: `
      <p>The charts below show the percentage of water used for different purposes in six areas of the world.</p>
      <p>Summarise the information by selecting and reporting the main features, and make comparisons where relevant.</p>
    `,
    imageUrl: '/sample-chart.jpg',
    instructions: 'Write at least 150 words.',
    guidelines: [
      'Spend about 20 minutes on this task',
      'Describe the main trends and comparisons',
      'Do not give your opinion',
      'Use appropriate language for describing data'
    ]
  },
  'academic-task-2-essay': {
    id: 'academic-task-2-essay',
    title: 'Academic Writing Task 2 - Essay',
    type: 'Academic',
    task: 'Task 2',
    timeLimit: 2400, // 40 minutes
    promptTitle: 'Some people believe that unpaid community service should be a compulsory part of high school education.',
    promptContent: `
      <p>Some people believe that unpaid community service should be a compulsory part of high school education.</p>
      <p>To what extent do you agree or disagree with this statement?</p>
    `,
    instructions: 'Write at least 250 words.',
    guidelines: [
      'Spend about 40 minutes on this task',
      'Give reasons for your answer and include relevant examples from your own knowledge or experience',
      'Write a well-organized essay with an introduction, body paragraphs, and conclusion',
      'Use a range of vocabulary and grammatical structures'
    ]
  },
  'general-task-1-letter': {
    id: 'general-task-1-letter',
    title: 'General Writing Task 1 - Letter',
    type: 'General',
    task: 'Task 1',
    timeLimit: 1200, // 20 minutes
    promptTitle: 'You are having problems with noise from your neighbor\'s apartment.',
    promptContent: `
      <p>You are having problems with noise from your neighbor's apartment.</p>
      <p>Write a letter to your neighbor. In your letter:</p>
      <ul>
        <li>explain the situation</li>
        <li>describe how the noise is affecting you</li>
        <li>suggest what your neighbor could do about it</li>
      </ul>
    `,
    instructions: 'Write at least 150 words.',
    guidelines: [
      'Spend about 20 minutes on this task',
      'Begin your letter appropriately (Dear Sir/Madam or Dear Mr/Mrs/Ms + surname)',
      'End your letter appropriately (Yours faithfully/sincerely)',
      'Organize your letter clearly with appropriate paragraphing'
    ]
  }
};

export default function WritingTestPage() {
  const params = useParams();
  const router = useRouter();
  const testId = params.id as string;
  const test = writingTests[testId as keyof typeof writingTests];
  
  const [essay, setEssay] = useState('');
  const [wordCount, setWordCount] = useState(0);
  const [timer, setTimer] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [feedback, setFeedback] = useState<{
    taskAchievement: number;
    coherenceAndCohesion: number;
    lexicalResource: number;
    grammaticalRange: number;
    overallBand: number;
    comments: string;
  } | null>(null);
  
  // New state for resizing
  const [contentWidth, setContentWidth] = useState(50);
  const [answerWidth, setAnswerWidth] = useState(50);
  const [isResizing, setIsResizing] = useState(false);
  const layoutRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!test) {
      router.push('/ielts-tests/writing');
      return;
    }

    // Add full-width class to the app element
    const appElement = document.getElementById('app');
    if (appElement) {
      appElement.classList.add('full-width-app');
    }

    // Initialize resize handle position
    setTimeout(() => {
      const contentElement = document.querySelector('.writing-test-content');
      const answerElement = document.querySelector('.answer-section');
      const resizeHandle = document.querySelector('.resize-handle');
      
      if (contentElement && answerElement && resizeHandle) {
        // Use !important to ensure styles are applied
        contentElement.setAttribute('style', 
          `width: ${contentWidth}% !important; 
           max-width: ${contentWidth}% !important; 
           flex: 0 0 ${contentWidth}% !important;`
        );
        
        answerElement.setAttribute('style', 
          `width: ${answerWidth}% !important; 
           max-width: ${answerWidth}% !important; 
           flex: 0 0 ${answerWidth}% !important;`
        );
        
        resizeHandle.setAttribute('style', 
          `right: ${answerWidth}% !important;`
        );
      }
    }, 100);

    setTimer(test.timeLimit);

    const interval = setInterval(() => {
      setTimer(prevTimer => {
        if (prevTimer <= 1) {
          clearInterval(interval);
          handleSubmitEssay();
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);

    return () => {
      clearInterval(interval);
      
      // Remove full-width class when component unmounts
      if (appElement) {
        appElement.classList.remove('full-width-app');
      }
    };
  }, [test, router, contentWidth, answerWidth]);
  
  // Add resize event handlers
  const handleResizeStart = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(true);
    
    // Save reference to the elements we'll be modifying
    const contentElement = document.querySelector('.writing-test-content');
    const answerElement = document.querySelector('.answer-section');
    const resizeHandle = document.querySelector('.resize-handle');
    
    // Store initial widths to avoid repeated state updates during drag
    let lastContentWidth = contentWidth;
    let lastAnswerWidth = answerWidth;
    
    // Add event listeners with the elements captured in closure
    const handleMove = (moveEvent: MouseEvent) => {
      if (!layoutRef.current) return;
      
      // Prevent default to avoid text selection during drag
      moveEvent.preventDefault();
      
      const containerRect = layoutRef.current.getBoundingClientRect();
      const containerWidth = containerRect.width;
      const x = moveEvent.clientX - containerRect.left;
      
      // Calculate percentages with wider range (10% to 90%) for more flexibility
      let newContentWidth = Math.min(Math.max((x / containerWidth) * 100, 10), 90);
      let newAnswerWidth = 100 - newContentWidth;
      
      // Only update DOM directly during drag, save state updates for the end
      if (contentElement && answerElement && resizeHandle) {
        contentElement.style.width = `${newContentWidth}%`;
        contentElement.style.maxWidth = `${newContentWidth}%`;
        contentElement.style.flex = `0 0 ${newContentWidth}%`;
        
        answerElement.style.width = `${newAnswerWidth}%`;
        answerElement.style.maxWidth = `${newAnswerWidth}%`;
        answerElement.style.flex = `0 0 ${newAnswerWidth}%`;
        
        resizeHandle.style.right = `${newAnswerWidth}%`;
      }
      
      // Save the last width values
      lastContentWidth = newContentWidth;
      lastAnswerWidth = newAnswerWidth;
    };
    
    const handleUp = () => {
      // Only update state once at the end of drag
      setContentWidth(lastContentWidth);
      setAnswerWidth(lastAnswerWidth);
      setIsResizing(false);
      
      document.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseup', handleUp);
    };
    
    document.addEventListener('mousemove', handleMove);
    document.addEventListener('mouseup', handleUp);
  }, [contentWidth, answerWidth]);
  
  // Remove the separate handlers since they're now included in handleResizeStart
  const handleResizeMove = useCallback(() => {}, []);
  const handleResizeEnd = useCallback(() => {}, []);

  useEffect(() => {
    // Count words
    if (essay) {
      const words = essay.trim().split(/\s+/);
      setWordCount(words.length);
    } else {
      setWordCount(0);
    }
  }, [essay]);

  const handleSubmitEssay = () => {
    if (isSubmitted) return;

    // In a real application, we would send the essay to an API for evaluation
    // Here we'll just simulate a response
    
    // Calculate a "score" based on word count (just for demonstration)
    const mockFeedback = {
      taskAchievement: Math.min(9, Math.max(5, Math.floor(wordCount / 50))),
      coherenceAndCohesion: Math.min(9, Math.max(5, Math.floor(wordCount / 60))),
      lexicalResource: Math.min(9, Math.max(5, Math.floor(wordCount / 70))),
      grammaticalRange: Math.min(9, Math.max(5, Math.floor(wordCount / 80))),
      overallBand: 0,
      comments: "This is automated feedback. In a real application, this would include detailed comments on your essay structure, language use, and suggestions for improvement."
    };
    
    mockFeedback.overallBand = Math.round(
      (mockFeedback.taskAchievement + 
      mockFeedback.coherenceAndCohesion + 
      mockFeedback.lexicalResource + 
      mockFeedback.grammaticalRange) / 4 * 10
    ) / 10;
    
    setFeedback(mockFeedback);
    setIsSubmitted(true);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (!test) {
    return <div>Loading test data...</div>;
  }

  return (
    <div className="writing-test-page">
      <div className="writing-test-header">
        <h1 className="writing-test-title">{test.title}</h1>
        <span className="writing-test-timer">{formatTime(timer)}</span>
      </div>
      
      <div className="two-column-layout" ref={layoutRef}>
        <div 
          className="writing-test-content"
          style={{
            width: `${contentWidth}%`,
            maxWidth: `${contentWidth}%`,
            flex: `0 0 ${contentWidth}%`
          }}
        >
          <div className="task-prompt">
            <h2>{test.promptTitle}</h2>
            <div dangerouslySetInnerHTML={{ __html: test.promptContent }} />
          </div>
          
          {test.imageUrl && (
            <div className="task-image">
              <img src={test.imageUrl} alt="Task visual" />
            </div>
          )}
          
          <div className="task-instructions">
            {test.instructions}
          </div>
          
          <div className="task-guidelines">
            <h3>Guidelines:</h3>
            <ul>
              {test.guidelines.map((guideline, index) => (
                <li key={index}>{guideline}</li>
              ))}
            </ul>
          </div>
        </div>
        
        <div 
          className={`resize-handle ${isResizing ? 'active' : ''}`} 
          onMouseDown={handleResizeStart}
          style={{ right: `${answerWidth}%` }}
        ></div>
        
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
              <div className="editor-header">
                <div className="word-count">Word Count: {wordCount}</div>
              </div>
              
              <textarea
                className="writing-editor"
                value={essay}
                onChange={(e) => setEssay(e.target.value)}
                placeholder="Write your answer here..."
                disabled={isSubmitted}
              />
              
              <button 
                className="submit-btn"
                onClick={handleSubmitEssay}
                disabled={isSubmitted}
              >
                Submit
              </button>
            </div>
          ) : (
            <div className="feedback-container">
              <div className="feedback-header">Essay Feedback</div>
              
              <div className="score-summary">
                <div className="score-item">
                  <span className="score-label">Task Achievement</span>
                  <span className="score-value">{feedback?.taskAchievement.toFixed(1)}</span>
                </div>
                <div className="score-item">
                  <span className="score-label">Coherence & Cohesion</span>
                  <span className="score-value">{feedback?.coherenceAndCohesion.toFixed(1)}</span>
                </div>
                <div className="score-item">
                  <span className="score-label">Lexical Resource</span>
                  <span className="score-value">{feedback?.lexicalResource.toFixed(1)}</span>
                </div>
                <div className="score-item">
                  <span className="score-label">Grammatical Range</span>
                  <span className="score-value">{feedback?.grammaticalRange.toFixed(1)}</span>
                </div>
              </div>
              
              <div className="feedback-section">
                <div className="score-item">
                  <span className="score-label">Overall Band Score</span>
                  <span className="score-value">{feedback?.overallBand.toFixed(1)}</span>
                </div>
              </div>
              
              <div className="feedback-details">
                <div className="feedback-section">
                  <div className="feedback-section-title">Comments:</div>
                  <p>{feedback?.comments}</p>
                </div>
              </div>
              
              <div className="test-navigation">
                <Link href="/ielts-tests/writing" className="nav-btn">
                  Back to Writing Tests
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 