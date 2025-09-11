"use client";

import { useAnswers } from "@/app/hooks/useAnswers";
import { useAudio } from "@/app/hooks/useAudio";
import { useScoreCalculator } from "@/app/hooks/useScoreCalculator";
import { useStoragePublicUrl } from "@/app/hooks/useStoragePublicUrl";
import { useTestDetail } from "@/app/hooks/useTestDetail";
import { QuestionGroup } from "@/app/models/QuestionGroup";
import { QuestionPart } from "@/app/models/QuestionPart";
import { Box } from "@mui/material";
import { useParams } from "next/navigation";
import { useState } from "react";
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
// Fetch questions/answers from Supabase like the Reading implementation

function ListeningTestContent() {
  const params = useParams();
  const { state } = useListeningAnswers();
  const testId = params.id as string;
  const { data: test } = useTestDetail({ part: "listening", id: testId });
  const answers = useAnswers({ part: "listening", id: testId });
  const { bandScore, correctCount } = useScoreCalculator(
    state,
    answers,
    "listening",
  );

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isResultModalOpen, setIsResultModalOpen] = useState(false);
  const [currentPart, setCurrentPart] = useState(1);

  const handleSubmit = () => {
    if (isSubmitted) return;
    setIsSubmitted(true);
    setIsResultModalOpen(true);
  };

  const currentPartData = test?.parts[currentPart - 1];
  const audioUrl = useStoragePublicUrl(
    "ielts-tests",
    currentPartData?.audio_url,
  );
  const { isPlaying, duration, currentTime, play, pause, toggle, seekTo } =
    useAudio(audioUrl ?? "");

  if (!test || !currentPartData) {
    return <CommonLoading />;
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        overflow: "hidden",
        "& p": { fontSize: "0.8rem" },
      }}
    >
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

      <Box
        sx={{
          flex: 1,
          minHeight: 0,
          overflow: "hidden",
          position: "relative",
          pb: 0,
          "--overlay-h": "180px",
        }}
      >
        <TestLayout
          questionGroups={currentPartData.question_groups as QuestionGroup[]}
          seekTo={seekTo}
          isSubmitted={isSubmitted}
          correctAnswers={answers}
        />

        <Box
          sx={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 10,
          }}
        >
          <PartSwitcher
            currentPart={currentPart}
            totalParts={test.parts.length}
            isSubmitted={isSubmitted}
            onPartChange={(part) => {
              setCurrentPart(part);
            }}
            onSubmit={handleSubmit}
            correctAnswers={answers}
            allParts={test.parts as QuestionPart[]}
            userAnswers={state}
          />
        </Box>
      </Box>
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
