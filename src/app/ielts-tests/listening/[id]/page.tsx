"use client";

import { useAudio } from "@/app/hooks/useAudio";
import "@/styles/writing-test.css";
import { Box } from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { PartSwitcher } from "../../../components/PartSwitcher";
import { TestHeader } from "../../../components/TestHeader";
import { ListeningTastRequirement } from "../components/ListeningTastRequirement";
import { TestLayout } from "../components/TestLayout";
import { mocktest } from "../mockData";

export default function ListeningTestPage() {
  const params = useParams();
  const router = useRouter();
  const testId = params.id as string;
  const test = mocktest;

  useEffect(() => {
    if (!test) {
      console.error(`Invalid test ID: ${testId}`);
      router.push("/ielts-tests/listening");
    }
  }, [test, testId, router]);

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [currentPart, setCurrentPart] = useState(1);
  const [currentQuestion, setCurrentQuestion] = useState(1);

  const handleSubmitEssay = () => {
    if (isSubmitted) return;
    setIsSubmitted(true);
  };

  if (!test) {
    return <div>Loading test data...</div>;
  }

  const currentPartData = test.parts[currentPart - 1];
  const { isPlaying, duration, currentTime, play, pause, toggle, seekTo } =
    useAudio(currentPartData.audio_url);

  return (
    <Box>
      <TestHeader timeLimit={test.time_limit} onTimeUp={handleSubmitEssay} />

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
    </Box>
  );
}
