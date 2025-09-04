"use client";

import { useAnswers } from "@/app/hooks/useAnswers";
import { useScoreCalculator } from "@/app/hooks/useScoreCalculator";
import { useTestDetail } from "@/app/hooks/useTestDetail";
import { QuestionGroup } from "@/app/models/QuestionGroup";
import { QuestionPart } from "@/app/models/QuestionPart";
import { Box } from "@mui/material";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { PartSwitcher } from "../../../components/PartSwitcher";
import { TaskRequirements } from "../../../components/TaskRequirements";
import { TestHeader } from "../../../components/TestHeader";
import { TestResult } from "../../../components/TestResult";
import { TestLayout } from "../components/TestLayout";
import {
  ReadingAnswerProvider,
  useReadingAnswers,
} from "../hooks/useAnswerContext";

function ReadingTestContent() {
  const params = useParams();
  const testId = params.id as string;
  const { state } = useReadingAnswers();
  const { data: test } = useTestDetail({ part: "reading", id: testId });
  const answers = useAnswers({ part: "reading", id: testId });

  const { bandScore, correctCount } = useScoreCalculator(
    state,
    answers,
    "reading",
  );
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isResultModalOpen, setIsResultModalOpen] = useState(false);
  const [currentPart, setCurrentPart] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime((prev) => prev + 1);
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
    <Box sx={{ "& p": { fontSize: "0.8rem" } }}>
      {isResultModalOpen && (
        <TestResult
          userAnswers={state}
          correctAnswers={answers}
          bandScore={bandScore}
          correctCount={correctCount}
          currentTime={currentTime}
          close={() => setIsResultModalOpen(false)}
        />
      )}

      <TestHeader timeLimit={3600} />

      <TaskRequirements
        currentPart={currentPart}
        instructions={currentPartData.instruction}
      />

      <TestLayout
        currentPart={currentPart}
        isSubmitted={isSubmitted}
        promptContent={currentPartData.content_html}
        questionGroups={currentPartData.question_groups as QuestionGroup[]}
        correctAnswers={answers}
      />

      <PartSwitcher
        currentPart={currentPart}
        totalParts={test.parts.length}
        isSubmitted={isSubmitted}
        onPartChange={(part) => {
          setCurrentPart(part);
        }}
        onSubmit={handleSubmit}
        allParts={test.parts as QuestionPart[]}
        correctAnswers={answers}
        userAnswers={state}
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
