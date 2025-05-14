'use client';

import '@/styles/reading-test.css';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';

// Mock data for the reading test
const readingTests = {
  '1': {
    title: 'Academic Reading Test 1',
    type: 'Academic',
    passage: `
      <h2>The impact of climate change on butterflies in Britain</h2>
      <p>According to conservationists, populations of around two thirds of butterfly species have declined in Britain over the past 40 years. If this trend continues, it might have unpredictable knock-on effects for other species in the ecosystem. Butterfly eggs develop into caterpillars and these insects, which are the second stage in a new butterfly's lifecycle, consume vast quantities of plant material, and in turn act as prey for birds as well as bats and other small mammals. Only by arming themselves with an understanding of why butterfly numbers are down can conservationists hope to halt or reverse the decline.</p>
      <p>Butterflies prefer outdoor conditions to be 'just right', which means neither too hot nor too cold. Under the conditions of climate change, the temperature at any given time in summer is generally getting warmer, leaving butterflies with the challenge of how to deal with this. One of the main ways in which species are ensuring conditions suit them is by changing the time of year at which they are active and reproduce. Scientists refer to the timing of such lifecycle events as 'phenology', so when an animal or plant starts to do something earlier in the year than it usually does, it is said to be 'advancing its phenology'.</p>
      <p>These advances have been observed already in a wide range of butterflies – indeed, most species are advancing their phenology to some extent. In Britain, as the average spring temperature has increased by roughly 0.5°C over the past 20 years, species have advanced by between three days and a week on average, to keep in line with cooler temperatures. Is this a sign that butterflies are well equipped to cope with climate change, and readily adjust to new temperatures? Or are these populations under stress, being dragged along unwillingly by unnaturally fast changes? The answer is still unknown, but a new study is seeking to answer these questions.</p>
    `,
    instructions: 'Read the text and answer questions 1-5',
    questions: [
      {
        id: 1,
        type: 'truefalse',
        text: 'Forty years ago, there were fewer butterflies in Britain than at present.',
        options: ['TRUE', 'FALSE', 'NOT GIVEN'],
        answer: 'FALSE'
      },
      {
        id: 2,
        type: 'truefalse',
        text: 'Caterpillars are eaten by a number of different predators.',
        options: ['TRUE', 'FALSE', 'NOT GIVEN'],
        answer: 'TRUE'
      },
      {
        id: 3,
        type: 'truefalse',
        text: "'Phenology' is a term used to describe a creature's ability to alter the location of a lifecycle event.",
        options: ['TRUE', 'FALSE', 'NOT GIVEN'],
        answer: 'FALSE'
      },
      {
        id: 4,
        type: 'fillblank',
        text: 'The Small Blue lives in large [BLANK].',
        answer: 'colonies'
      },
      {
        id: 5,
        type: 'fillblank',
        text: 'The Small Blue first appears at the start of [BLANK].',
        answer: 'spring'
      }
    ]
  },
  '2': {
    title: 'Academic Reading Test 2',
    type: 'Academic',
    passage: `
      <h2>The Development of the London Underground</h2>
      <p>In the first half of the 1800s, London's population grew at an astonishing rate, and the central areas became increasingly congested. In addition, the expansion of the overground railway network brought thousands of commuters into the city each day. Numerous railway terminals were built around the edge of central London, but the railway companies were prohibited from building lines into the city centre. As a result, the journey into the centre had to be completed by other modes of transport, further adding to the congestion.</p>
      <p>In 1843, a lawyer and writer named Charles Pearson proposed the creation of an underground rail system to ease this congestion. However, it wasn't until 1853 that the first serious plans for an underground railway in London were submitted to Parliament. The Metropolitan Railway was given permission to build an underground line from Paddington to Farringdon Street via King's Cross, linking three of London's main railway terminals with the main business district.</p>
      <p>The construction of the line, which began in 1860, was not an easy task. The technique used was called "cut and cover" - a trench was dug along the middle of existing roads, then brick walls were built along the sides of the cutting. Finally, a brick arch was constructed to form a roof over the cutting, and the road above was rebuilt. This technique was primitive but effective, although it caused significant disruption to road traffic and led to the demolition of many homes.</p>
    `,
    instructions: 'Read the text and answer questions 1-5',
    questions: [
      {
        id: 1,
        type: 'truefalse',
        text: 'Railway companies were allowed to build lines into central London in the 1800s.',
        options: ['TRUE', 'FALSE', 'NOT GIVEN'],
        answer: 'FALSE'
      },
      {
        id: 2,
        type: 'truefalse',
        text: 'Charles Pearson was a politician.',
        options: ['TRUE', 'FALSE', 'NOT GIVEN'],
        answer: 'FALSE'
      },
      {
        id: 3,
        type: 'truefalse',
        text: 'The Metropolitan Railway was given permission to build an underground line immediately after Pearson proposed the idea.',
        options: ['TRUE', 'FALSE', 'NOT GIVEN'],
        answer: 'FALSE'
      },
      {
        id: 4,
        type: 'fillblank',
        text: 'The "cut and cover" technique involved digging a [BLANK] along the middle of existing roads.',
        answer: 'trench'
      },
      {
        id: 5,
        type: 'fillblank',
        text: 'The construction of the Metropolitan Railway began in [BLANK].',
        answer: '1860'
      }
    ]
  }
};

export default function ReadingTestPage() {
  const params = useParams();
  const router = useRouter();
  const testId = params.id as string;
  const test = readingTests[testId as keyof typeof readingTests];
  
  const [answers, setAnswers] = useState<{[key: number]: string}>({});
  const [activeQuestion, setActiveQuestion] = useState(1);
  const [timer, setTimer] = useState(3600); // 60 minutes
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [activePart, setActivePart] = useState(1);
  
  // New state for resizing
  const [contentWidth, setContentWidth] = useState(50);
  const [answerWidth, setAnswerWidth] = useState(50);
  const [isResizing, setIsResizing] = useState(false);
  const layoutRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!test) {
      router.push('/ielts-tests/reading');
      return;
    }

    // Add full-width class to the app element
    const appElement = document.getElementById('app');
    if (appElement) {
      appElement.classList.add('full-width-app');
    }

    // Initialize resize handle position
    setTimeout(() => {
      const contentElement = document.querySelector('.reading-test-content');
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

    const interval = setInterval(() => {
      setTimer(prevTimer => {
        if (prevTimer <= 1) {
          clearInterval(interval);
          handleSubmitTest();
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
    const contentElement = document.querySelector('.reading-test-content');
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

  const handleAnswerChange = (questionId: number, value: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleSubmitTest = () => {
    if (isSubmitted) return;
    
    // Calculate score
    let correctAnswers = 0;
    test.questions.forEach(question => {
      if (answers[question.id]?.toLowerCase() === question.answer.toLowerCase()) {
        correctAnswers++;
      }
    });
    
    setScore(correctAnswers);
    setIsSubmitted(true);
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (!test) {
    return <div>Loading...</div>;
  }

  if (isSubmitted) {
    return (
      <div className="reading-test-page">
        <div className="reading-test-header">
          <h1 className="reading-test-title">{test.title} - Results</h1>
        </div>
        <div className="reading-test-content">
          <div className="test-results">
            <h2>Test Completed!</h2>
            <p>You scored {score} out of {test.questions.length}.</p>
            <div className="test-navigation">
              <Link href="/ielts-tests/reading" className="nav-btn">
                Back to Reading Tests
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="reading-test-page">
      <div className="reading-test-header">
        <h1 className="reading-test-title">{test.title}</h1>
        <div className="test-controls">
          <span className="reading-test-timer">{formatTime(timer)}</span>
          <button className="test-control-btn">Practice Skimming</button>
          <button className="test-control-btn">-</button>
          <button className="test-control-btn">+</button>
        </div>
      </div>
      
      <div className="two-column-layout" ref={layoutRef}>
        <div 
          className="reading-test-content"
          style={{
            width: `${contentWidth}%`,
            maxWidth: `${contentWidth}%`,
            flex: `0 0 ${contentWidth}%`
          }}
        >
          <div className="part-tabs">
            <div 
              className={`part-tab ${activePart === 1 ? 'active' : ''}`}
              onClick={() => setActivePart(1)}
            >
              Part 1
            </div>
            <div 
              className={`part-tab ${activePart === 2 ? 'active' : ''}`}
              onClick={() => setActivePart(2)}
            >
              Part 2
            </div>
            <div 
              className={`part-tab ${activePart === 3 ? 'active' : ''}`}
              onClick={() => setActivePart(3)}
            >
              Part 3
            </div>
          </div>
          
          <div className="test-instructions">
            {test.instructions}
          </div>
          
          <div className="reading-passage" dangerouslySetInnerHTML={{ __html: test.passage }} />
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
          <h3>Questions</h3>
          
          <div className="test-pagination">
            {test.questions.map(q => (
              <button 
                key={q.id}
                className={`question-number-btn ${activeQuestion === q.id ? 'active' : ''} ${answers[q.id] ? 'answered' : ''}`}
                onClick={() => setActiveQuestion(q.id)}
              >
                {q.id}
              </button>
            ))}
          </div>
          
          <div className="question-section">
            {test.questions.map(question => (
              <div 
                key={question.id} 
                className="question-item"
                style={{ display: activeQuestion === question.id ? 'block' : 'none' }}
              >
                <span className="question-number">{question.id}</span>
                <span className="question-text">{question.text}</span>
                
                {question.type === 'truefalse' && (
                  <div className="mcq-options">
                    {question.options?.map(option => (
                      <div key={option} className="mcq-option">
                        <input
                          type="radio"
                          id={`q${question.id}-${option}`}
                          name={`question-${question.id}`}
                          value={option}
                          checked={answers[question.id] === option}
                          onChange={() => handleAnswerChange(question.id, option)}
                        />
                        <label htmlFor={`q${question.id}-${option}`}>{option}</label>
                      </div>
                    ))}
                  </div>
                )}
                
                {question.type === 'fillblank' && (
                  <div className="fill-blank">
                    <input
                      type="text"
                      placeholder="Enter your answer"
                      value={answers[question.id] || ''}
                      onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <div className="test-navigation">
            <button 
              className="nav-btn"
              onClick={() => setActiveQuestion(prev => Math.max(prev - 1, 1))}
              disabled={activeQuestion <= 1}
            >
              Previous
            </button>
            <button
              className="nav-btn"
              onClick={() => setActiveQuestion(prev => Math.min(prev + 1, test.questions.length))}
              disabled={activeQuestion >= test.questions.length}
            >
              Next
            </button>
          </div>
          
          <button 
            className="submit-test-btn"
            onClick={handleSubmitTest}
          >
            Submit Test
          </button>
        </div>
      </div>
    </div>
  );
} 