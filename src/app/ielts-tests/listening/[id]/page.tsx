"use client";

import { useAudio } from "@/app/hooks/useAudio";
import { useScoreCalculator } from "@/app/hooks/useScoreCalculator";
import { Box } from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CommonLoading } from "../../../components/CommonLoading";
import { PartSwitcher } from "../../../components/PartSwitcher";
import { TestHeader } from "../../../components/TestHeader";
import { TestResult } from "../../../components/TestResult";
import { ListeningTastRequirement } from "../components/ListeningTastRequirement";
import { TestLayout } from "../components/TestLayout";
import {
  ListeningAnswerProvider,
  useListeningAnswers,
} from "../hooks/useAnswerContext";
import { mocktest } from "../mockData";
import { mocktestAnswer } from "../mockDataAnswer";

function ListeningTestContent() {
  const params = useParams();
  const router = useRouter();
  const { state } = useListeningAnswers();
  const { bandScore, correctCount } = useScoreCalculator(
    state,
    mocktestAnswer,
    "listening",
  );
  const testId = params.id as string;
  const test = mocktest;

  useEffect(() => {
    if (!test) {
      console.error(`Invalid test ID: ${testId}`);
      router.push("/ielts-tests/listening");
    }
  }, [test, testId, router]);

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isResultModalOpen, setIsResultModalOpen] = useState(false);
  const [currentPart, setCurrentPart] = useState(1);
  const [currentQuestion, setCurrentQuestion] = useState(1);

  const handleSubmit = () => {
    if (isSubmitted) return;
    setIsSubmitted(true);
    setIsResultModalOpen(true);
  };

  if (!test) {
    return <CommonLoading />;
  }

  const currentPartData = test.parts[currentPart - 1];
  const { isPlaying, duration, currentTime, play, pause, toggle, seekTo } =
    useAudio(currentPartData.audio_url);

  return (
    <Box>
      {isResultModalOpen && (
        <TestResult
          userAnswers={state}
          correctAnswers={mocktestAnswer}
          bandScore={bandScore}
          correctCount={correctCount}
          currentTime={currentTime}
          close={() => setIsResultModalOpen(false)}
        />
      )}

      <TestHeader timeLimit={2400} />

      <ListeningTastRequirement
        currentPart={currentPart}
        instructions={currentPartData.instruction}
        isPlaying={isPlaying}
        toggle={toggle}
        duration={duration}
        currentTime={currentTime}
        play={play}
        pause={pause}
        seekTo={seekTo}
      />

      <TestLayout
        questionGroups={currentPartData.question_groups}
        seekTo={seekTo}
        isSubmitted={isSubmitted}
        correctAnswers={mocktestAnswer}
      />

      <PartSwitcher
        currentPart={currentPart}
        totalParts={test.parts.length}
        isSubmitted={isSubmitted}
        onPartChange={(part) => {
          setCurrentPart(part);
          setCurrentQuestion(1);
        }}
        onSubmit={handleSubmit}
        correctAnswers={mocktestAnswer}
        allParts={test.parts}
        userAnswers={state}
      />
    </Box>
  );
}

export default function ListeningTestPage() {
  return (
    <ListeningAnswerProvider>
      <ListeningTestContent />
    </ListeningAnswerProvider>
  );
}
