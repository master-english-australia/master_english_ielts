"use client";

import { useTestDetail } from "@/app/hooks/useTestDetail";
import { Box } from "@mui/material";
import { useParams } from "next/navigation";
import { useState } from "react";
import { CommonLoading } from "../../../components/CommonLoading";
import { PartSwitcher } from "../../../components/PartSwitcher";
import { TaskRequirements } from "../../../components/TaskRequirements";
import { TestHeader } from "../../../components/TestHeader";
import { TestLayout } from "../components/TestLayout";

export default function SpeakingTestPage() {
  const params = useParams();
  const testId = params.id as string;
  const { data: test } = useTestDetail({ part: "speaking", id: testId });

  type SpeakingQuestion = { id: number; text: string; followups?: string[] };
  type SpeakingPart = { id: number | string; questions: SpeakingQuestion[] };
  const parts = (((test as any) || {}).parts || []) as SpeakingPart[];

  const [currentPart, setCurrentPart] = useState(1);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);

  const handleSubmitEssay = () => {
    try {
      if (!audioBlob) return;
      const base = `speaking_part${currentPart}_q${currentQuestion}`;
      const filename = `${base}.mp3`;

      const mp3Blob =
        audioBlob.type === "audio/mpeg"
          ? audioBlob
          : new Blob([audioBlob], { type: "audio/mpeg" });

      downloadBlobAsFile(mp3Blob, filename);
    } catch (e) {
      if (typeof window !== "undefined") {
        console.error(e);
        window.alert("Failed to download the MP3. Please try again.");
      }
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestion > 1) {
      setCurrentQuestion(currentQuestion - 1);
    } else if (currentPart > 1) {
      const prevPartData = parts[currentPart - 2];
      setCurrentPart(currentPart - 1);
      setCurrentQuestion(prevPartData?.questions.length || 1);
    }
  };

  const handleNextQuestion = () => {
    const currentPartData = parts[currentPart - 1];
    if (currentQuestion < (currentPartData?.questions.length || 0)) {
      setCurrentQuestion(currentQuestion + 1);
    } else if (currentPart < parts.length) {
      setCurrentPart(currentPart + 1);
      setCurrentQuestion(1);
    }
  };

  if (!test) {
    return <CommonLoading />;
  }

  function downloadBlobAsFile(blob: Blob, filename: string) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  const currentPartData = parts[currentPart - 1];
  const currentQuestionData = currentPartData?.questions[currentQuestion - 1];
  const isFirstQuestion = currentPart === 1 && currentQuestion === 1;
  const isLastQuestion =
    currentPart === parts.length &&
    currentQuestion === (currentPartData?.questions.length || 0);
  const partQuestions = currentPartData?.questions || [];
  const startQuestionId = partQuestions[0]?.id ?? currentQuestionData.id;
  const endQuestionId =
    partQuestions[partQuestions.length - 1]?.id ?? currentQuestionData.id;

  return (
    <Box>
      <TestHeader timeLimit={900} />

      <TaskRequirements
        currentPart={currentPart}
        instructions={`Answer questions ${startQuestionId}-${endQuestionId}`}
      />

      <TestLayout
        questionNumber={currentQuestionData.id}
        questionText={currentQuestionData.text}
        followups={currentQuestionData.followups}
        onPrev={handlePrevQuestion}
        onNext={handleNextQuestion}
        onSubmit={handleSubmitEssay}
        isFirst={isFirstQuestion}
        isLast={isLastQuestion}
        isSubmitted={false}
        onAudioBlobReady={setAudioBlob}
      />

      <PartSwitcher
        currentPart={currentPart}
        totalParts={parts.length}
        isSubmitted={false}
        onPartChange={(part) => {
          setCurrentPart(part);
          setCurrentQuestion(1);
        }}
        allParts={[]}
        correctAnswers={[]}
        userAnswers={{}}
      />
    </Box>
  );
}
