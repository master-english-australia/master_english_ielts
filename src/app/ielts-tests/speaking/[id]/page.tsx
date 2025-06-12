"use client";

import "@/styles/writing-test.css";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { PartSwitcher } from "../../components/PartSwitcher";
import { TaskRequirements } from "../../components/TaskRequirements";
import { TestHeader } from "../../components/TestHeader";
import { Feedback } from "../../writing/types/feedback";
import { TestLayout } from "../components/TestLayout";
import { speakingTests } from "../mockData";

export default function SpeakingTestPage() {
  const params = useParams();
  const router = useRouter();
  const testId = params.id as string;
  const test = speakingTests[testId as keyof typeof speakingTests];

  useEffect(() => {
    if (!test) {
      console.error(`Invalid test ID: ${testId}`);
      router.push("/ielts-tests/speaking");
    }
  }, [test, testId, router]);

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [currentPart, setCurrentPart] = useState(1);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [feedback, setFeedback] = useState<Feedback | null>(null);

  const handleSubmitEssay = () => {
    if (isSubmitted) return;
    setIsSubmitted(true);
  };

  const handlePrevQuestion = () => {
    const currentPartData = test.parts[currentPart - 1];
    if (currentQuestion > 1) {
      setCurrentQuestion(currentQuestion - 1);
    } else if (currentPart > 1) {
      const prevPartData = test.parts[currentPart - 2];
      setCurrentPart(currentPart - 1);
      setCurrentQuestion(prevPartData.questions.length);
    }
  };

  const handleNextQuestion = () => {
    const currentPartData = test.parts[currentPart - 1];
    if (currentQuestion < currentPartData.questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else if (currentPart < test.parts.length) {
      setCurrentPart(currentPart + 1);
      setCurrentQuestion(1);
    }
  };

  if (!test) {
    return <div>Loading test data...</div>;
  }

  const currentPartData = test.parts[currentPart - 1];
  const currentQuestionData = currentPartData.questions[currentQuestion - 1];
  const isFirstQuestion = currentPart === 1 && currentQuestion === 1;
  const isLastQuestion =
    currentPart === test.parts.length &&
    currentQuestion === currentPartData.questions.length;

  return (
    <div className="writing-test-page">
      <TestHeader timeLimit={test.timeLimit} onTimeUp={handleSubmitEssay} />

      <TaskRequirements
        currentPart={currentPart}
        instructions={currentPartData.instructions}
      />

      <TestLayout
        questionNumber={currentQuestionData.id}
        questionText={currentQuestionData.text}
        onPrev={handlePrevQuestion}
        onNext={handleNextQuestion}
        onSubmit={handleSubmitEssay}
        isFirst={isFirstQuestion}
        isLast={isLastQuestion}
        isSubmitted={isSubmitted}
      />

      <PartSwitcher
        currentPart={currentPart}
        totalParts={test.parts.length}
        isSubmitted={isSubmitted}
        onPartChange={(part) => {
          setCurrentPart(part);
          setCurrentQuestion(1);
        }}
      />
    </div>
  );
}
