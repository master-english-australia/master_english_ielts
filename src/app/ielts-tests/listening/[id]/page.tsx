"use client";

import "@/styles/listening-test.css";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

// Mock data for the listening test
const listeningTests = {
  "1": {
    title: "Academic Listening Test 1",
    type: "Academic",
    audioUrl: "/sample-audio.mp3", // Replace with actual audio
    instructions:
      "Listen to the audio and answer the questions below. You will hear the recording ONCE only.",
    sections: [
      {
        title: "Section 1",
        description:
          "In this section, you will hear a conversation between a woman looking for accommodation and a rental agent. First, you have some time to look at questions 1-3. Now listen carefully and answer questions 1-3.",
        questions: [
          {
            id: 1,
            type: "mcq",
            text: "What is the woman looking for?",
            options: [
              "A. A room to rent",
              "B. A house to buy",
              "C. An apartment to share",
              "D. A studio for work",
            ],
            answer: "A",
          },
          {
            id: 2,
            type: "mcq",
            text: "How much is the rent per month?",
            options: ["A. £450", "B. £550", "C. £650", "D. £750"],
            answer: "C",
          },
          {
            id: 3,
            type: "fillblank",
            text: "The apartment is located on [BLANK] Street.",
            answer: "Oxford",
          },
        ],
      },
      {
        title: "Section 2",
        description:
          "In this section, you will hear a tour guide giving information about local attractions. First, you have some time to look at questions 4-5. Now listen carefully and answer questions 4-5.",
        questions: [
          {
            id: 4,
            type: "mcq",
            text: "What is the main topic of the talk?",
            options: [
              "A. Public transportation",
              "B. City history",
              "C. Local attractions",
              "D. Weather patterns",
            ],
            answer: "C",
          },
          {
            id: 5,
            type: "fillblank",
            text: "The museum is open from [BLANK] AM to 5:00 PM.",
            answer: "9:00",
          },
        ],
      },
    ],
  },
  "2": {
    title: "Academic Listening Test 2",
    type: "Academic",
    audioUrl: "/sample-audio2.mp3", // Replace with actual audio
    instructions:
      "Listen to the audio and answer the questions below. You will hear the recording ONCE only.",
    sections: [
      {
        title: "Section 1",
        description:
          "In this section, you will hear a conversation between a student and an administrator about course registration. First, you have some time to look at questions 1-3. Now listen carefully and answer questions 1-3.",
        questions: [
          {
            id: 1,
            type: "mcq",
            text: "What is the purpose of the conversation?",
            options: [
              "A. Job interview",
              "B. Course registration",
              "C. Housing inquiry",
              "D. Health check",
            ],
            answer: "B",
          },
          {
            id: 2,
            type: "mcq",
            text: "How long is the course?",
            options: [
              "A. 3 months",
              "B. 6 months",
              "C. 9 months",
              "D. 12 months",
            ],
            answer: "C",
          },
          {
            id: 3,
            type: "fillblank",
            text: "The registration fee is [BLANK] pounds.",
            answer: "250",
          },
        ],
      },
      {
        title: "Section 2",
        description:
          "In this section, you will hear a lecture about climate science. First, you have some time to look at questions 4-5. Now listen carefully and answer questions 4-5.",
        questions: [
          {
            id: 4,
            type: "mcq",
            text: "What is the lecture primarily about?",
            options: [
              "A. Marine biology",
              "B. Climate science",
              "C. Sustainable agriculture",
              "D. Renewable energy",
            ],
            answer: "B",
          },
          {
            id: 5,
            type: "fillblank",
            text: "The average global temperature has risen by [BLANK] degrees since pre-industrial times.",
            answer: "1.1",
          },
        ],
      },
    ],
  },
};

export default function ListeningTestPage() {
  const params = useParams();
  const router = useRouter();
  const testId = params.id as string;
  const test = listeningTests[testId as keyof typeof listeningTests];

  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [activeSection, setActiveSection] = useState(0);
  const [activeQuestion, setActiveQuestion] = useState(1);
  const [timer, setTimer] = useState(1800); // 30 minutes
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [activePart, setActivePart] = useState(1);

  // New state for resizing
  const [contentWidth, setContentWidth] = useState(50);
  const [answerWidth, setAnswerWidth] = useState(50);
  const [isResizing, setIsResizing] = useState(false);
  const layoutRef = useRef<HTMLDivElement>(null);

  // Add resize event handlers
  const handleResizeStart = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      setIsResizing(true);

      // Save reference to the elements we'll be modifying
      const contentElement = document.querySelector(".listening-test-content");
      const answerElement = document.querySelector(".answer-section");
      const resizeHandle = document.querySelector(".resize-handle");

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
        let newContentWidth = Math.min(
          Math.max((x / containerWidth) * 100, 10),
          90,
        );
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

        document.removeEventListener("mousemove", handleMove);
        document.removeEventListener("mouseup", handleUp);
      };

      document.addEventListener("mousemove", handleMove);
      document.addEventListener("mouseup", handleUp);
    },
    [contentWidth, answerWidth],
  );

  // Remove the separate handlers since they're now included in handleResizeStart
  const handleResizeMove = useCallback(() => {}, []);
  const handleResizeEnd = useCallback(() => {}, []);

  useEffect(() => {
    if (!test) {
      router.push("/ielts-tests/listening");
      return;
    }

    // Add full-width class to the app element
    const appElement = document.getElementById("app");
    if (appElement) {
      appElement.classList.add("full-width-app");
    }

    // Initialize resize handle position
    setTimeout(() => {
      const contentElement = document.querySelector(".listening-test-content");
      const answerElement = document.querySelector(".answer-section");
      const resizeHandle = document.querySelector(".resize-handle");

      if (contentElement && answerElement && resizeHandle) {
        // Use !important to ensure styles are applied
        contentElement.setAttribute(
          "style",
          `width: ${contentWidth}% !important; 
           max-width: ${contentWidth}% !important; 
           flex: 0 0 ${contentWidth}% !important;`,
        );

        answerElement.setAttribute(
          "style",
          `width: ${answerWidth}% !important; 
           max-width: ${answerWidth}% !important; 
           flex: 0 0 ${answerWidth}% !important;`,
        );

        resizeHandle.setAttribute(
          "style",
          `right: ${answerWidth}% !important;`,
        );
      }
    }, 100);

    const interval = setInterval(() => {
      setTimer((prevTimer) => {
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
        appElement.classList.remove("full-width-app");
      }
    };
  }, [test, router, contentWidth, answerWidth]);

  const handleAnswerChange = (questionId: number, value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleRestart = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleSubmitTest = () => {
    if (isSubmitted) return;

    // Calculate score
    let correctAnswers = 0;
    test.sections.forEach((section) => {
      section.questions.forEach((question) => {
        if (
          answers[question.id]?.toLowerCase() === question.answer.toLowerCase()
        ) {
          correctAnswers++;
        }
      });
    });

    setScore(correctAnswers);
    setIsSubmitted(true);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;

    return `${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const getAllQuestions = () => {
    return test.sections.flatMap((section) => section.questions);
  };

  const findQuestionById = (id: number) => {
    for (let i = 0; i < test.sections.length; i++) {
      const question = test.sections[i].questions.find((q) => q.id === id);
      if (question) {
        setActiveSection(i);
        return question;
      }
    }
    return null;
  };

  if (!test) {
    return <div>Loading...</div>;
  }

  if (isSubmitted) {
    return (
      <div className="listening-test-page">
        <div className="listening-test-header">
          <h1 className="listening-test-title">{test.title} - Results</h1>
        </div>
        <div className="listening-test-content">
          <div className="test-results">
            <h2>Test Completed!</h2>
            <p>
              You scored {score} out of {getAllQuestions().length}.
            </p>
            <div className="test-navigation">
              <Link href="/ielts-tests/listening" className="nav-btn">
                Back to Listening Tests
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="listening-test-page">
      <div className="listening-test-header">
        <h1 className="listening-test-title">{test.title}</h1>
        <span className="listening-test-timer">{formatTime(timer)}</span>
      </div>

      <div className="audio-player-container">
        <div className="audio-player">
          <audio
            ref={audioRef}
            src={test.audioUrl}
            onEnded={() => setIsPlaying(false)}
          />

          <div className="audio-controls">
            <button className="audio-control-btn" onClick={handlePlayPause}>
              {isPlaying ? "Pause" : "Play"}
            </button>
            <button className="audio-control-btn" onClick={handleRestart}>
              Restart
            </button>
          </div>
        </div>
      </div>

      <div className="two-column-layout" ref={layoutRef}>
        <div
          className="listening-test-content"
          style={{
            width: `${contentWidth}%`,
            maxWidth: `${contentWidth}%`,
            flex: `0 0 ${contentWidth}%`,
          }}
        >
          <div className="part-tabs">
            <div
              className={`part-tab ${activePart === 1 ? "active" : ""}`}
              onClick={() => setActivePart(1)}
            >
              Part 1
            </div>
            <div
              className={`part-tab ${activePart === 2 ? "active" : ""}`}
              onClick={() => setActivePart(2)}
            >
              Part 2
            </div>
            <div
              className={`part-tab ${activePart === 3 ? "active" : ""}`}
              onClick={() => setActivePart(3)}
            >
              Part 3
            </div>
            <div
              className={`part-tab ${activePart === 4 ? "active" : ""}`}
              onClick={() => setActivePart(4)}
            >
              Part 4
            </div>
          </div>

          <div className="listening-instructions">{test.instructions}</div>

          <div className="listening-section-content">
            <div className="section-title">
              {test.sections[activeSection].title}
            </div>
            <div className="section-description">
              {test.sections[activeSection].description}
            </div>
          </div>
        </div>

        <div
          className={`resize-handle ${isResizing ? "active" : ""}`}
          onMouseDown={handleResizeStart}
          style={{ right: `${answerWidth}%` }}
        ></div>

        <div
          className="answer-section"
          style={{
            width: `${answerWidth}%`,
            maxWidth: `${answerWidth}%`,
            flex: `0 0 ${answerWidth}%`,
          }}
        >
          <h3>Questions</h3>

          <div className="test-pagination">
            {getAllQuestions().map((question) => (
              <button
                key={question.id}
                className={`question-number-btn ${activeQuestion === question.id ? "active" : ""} ${answers[question.id] ? "answered" : ""}`}
                onClick={() => {
                  setActiveQuestion(question.id);
                  findQuestionById(question.id);
                }}
              >
                {question.id}
              </button>
            ))}
          </div>

          <div className="question-section">
            {test.sections[activeSection].questions
              .filter((question) => activeQuestion === question.id)
              .map((question) => (
                <div key={question.id} className="question-item">
                  <span className="question-number">{question.id}.</span>
                  <span className="question-text">{question.text}</span>

                  {question.type === "mcq" && (
                    <div className="mcq-options">
                      {question.options.map((option, index) => (
                        <div key={index} className="mcq-option">
                          <input
                            type="radio"
                            id={`q${question.id}-${index}`}
                            name={`question-${question.id}`}
                            value={option.charAt(0)}
                            checked={answers[question.id] === option.charAt(0)}
                            onChange={() =>
                              handleAnswerChange(question.id, option.charAt(0))
                            }
                          />
                          <label htmlFor={`q${question.id}-${index}`}>
                            {option}
                          </label>
                        </div>
                      ))}
                    </div>
                  )}

                  {question.type === "fillblank" && (
                    <div className="fill-blank">
                      <input
                        type="text"
                        placeholder="Enter your answer"
                        value={answers[question.id] || ""}
                        onChange={(e) =>
                          handleAnswerChange(question.id, e.target.value)
                        }
                      />
                    </div>
                  )}
                </div>
              ))}
          </div>

          <div className="test-navigation">
            <button
              className="nav-btn"
              onClick={() => {
                const allQuestions = getAllQuestions();
                const currentIndex = allQuestions.findIndex(
                  (q) => q.id === activeQuestion,
                );
                if (currentIndex > 0) {
                  const prevQuestion = allQuestions[currentIndex - 1];
                  setActiveQuestion(prevQuestion.id);
                  findQuestionById(prevQuestion.id);
                }
              }}
              disabled={activeQuestion === 1}
            >
              Previous
            </button>

            <button
              className="nav-btn"
              onClick={() => {
                const allQuestions = getAllQuestions();
                const currentIndex = allQuestions.findIndex(
                  (q) => q.id === activeQuestion,
                );
                if (currentIndex < allQuestions.length - 1) {
                  const nextQuestion = allQuestions[currentIndex + 1];
                  setActiveQuestion(nextQuestion.id);
                  findQuestionById(nextQuestion.id);
                }
              }}
              disabled={activeQuestion === getAllQuestions().length}
            >
              Next
            </button>
          </div>

          <button className="submit-test-btn" onClick={handleSubmitTest}>
            Submit Test
          </button>
        </div>
      </div>
    </div>
  );
}
