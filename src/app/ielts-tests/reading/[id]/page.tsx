"use client";

import { useScoreCalculator } from "@/app/hooks/useScoreCalculator";
import { Box } from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { PartSwitcher } from "../../../components/PartSwitcher";
import { TaskRequirements } from "../../../components/TaskRequirements";
import { TestHeader } from "../../../components/TestHeader";
import { TestResult } from "../../../components/TestResult";
import { TestLayout } from "../components/TestLayout";
import { ReadingAnswerProvider, useReadingAnswers } from "../hooks/useAnswerContext";
import { readingTest2 } from "../mockData";
import { readingMockDataAnswer } from "../mockDataAnswer";

function ReadingTestContent() {
  const params = useParams();
  const router = useRouter();
  const { state } = useReadingAnswers();
  const { bandScore, correctCount } = useScoreCalculator(
    state,
    readingMockDataAnswer,
    "reading"
  );
  const testId = params.id as string;
  const test = readingTest2;

  useEffect(() => {
    if (!test) {
      console.error(`Invalid test ID: ${testId}`);
      router.push("/ielts-tests/reading");
    }
  }, [test, testId, router]);

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isResultModalOpen, setIsResultModalOpen] = useState(false);
  const [currentPart, setCurrentPart] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleSubmit = () => {
    if (isSubmitted) return;
    setIsSubmitted(true);
    setIsResultModalOpen(true);
  };

  if (!test) {
    return <div>Loading test data...</div>;
  }

  const currentPartData = test.parts[currentPart - 1];

  return (
    <Box>
      {isResultModalOpen && (
        <TestResult
          userAnswers={state}
          correctAnswers={readingMockDataAnswer}
          bandScore={bandScore}
          correctCount={correctCount}
          currentTime={currentTime}
          close={() => setIsResultModalOpen(false)}
        />
      )}

      <TestHeader timeLimit={test.time_limit} />

      <TaskRequirements
        currentPart={currentPart}
        instructions={currentPartData.instruction}
      />

      <TestLayout
        currentPart={currentPart}
        isSubmitted={isSubmitted}
        promptContent={currentPartData.content_html}
        questionGroups={currentPartData.question_groups}
      />

      <PartSwitcher
        currentPart={currentPart}
        totalParts={test.parts.length}
        isSubmitted={isSubmitted}
        onPartChange={(part) => {
          setCurrentPart(part);
        }}
        onSubmit={handleSubmit}
      />
    </Box>
  );
}

export default function ReadingTestPage() {
  return (
    <ReadingAnswerProvider>
      <ReadingTestContent />
    </ReadingAnswerProvider>
  );
}
