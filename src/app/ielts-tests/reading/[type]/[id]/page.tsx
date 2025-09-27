"use client";

import { useAnswers } from "@/app/hooks/useAnswers";
import { useScoreCalculator } from "@/app/hooks/useScoreCalculator";
import { useTestDetail } from "@/app/hooks/useTestDetail";
import { QuestionGroup } from "@/app/models/QuestionGroup";
import { QuestionPart } from "@/app/models/QuestionPart";
import { Box } from "@mui/material";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { CommonLoading } from "../../../../components/CommonLoading";
import { PartSwitcher } from "../../../../components/PartSwitcher";
import { TaskRequirements } from "../../../../components/TaskRequirements";
import { TestHeader } from "../../../../components/TestHeader";
import { TestResult } from "../../../../components/TestResult";
import { TestLayout } from "../../components/TestLayout";
import {
  ReadingAnswerProvider,
  useReadingAnswers,
} from "../../hooks/useAnswerContext";

function ReadingTestContent() {
  const params = useParams();
  const testId = params.id as string;
  const type = (params.type as string | undefined)?.toLowerCase();
  const isAcademic = type === "academic";
  const { state } = useReadingAnswers();
  const { data: test } = useTestDetail({
    part: "reading",
    id: testId,
    isAcademic,
  });
  const answers = useAnswers({ part: "reading", id: testId, isAcademic });

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
    return <CommonLoading />;
  }

  const currentPartData = test.parts[currentPart - 1];

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

      <TestHeader timeLimit={3600} />

      <TaskRequirements
        currentPart={currentPart}
        instructions={currentPartData.instruction}
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
          currentPart={currentPart}
          isSubmitted={isSubmitted}
          promptContent={currentPartData.content_html}
          questionGroups={currentPartData.question_groups as QuestionGroup[]}
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
            onPartChange={(part: number) => {
              setCurrentPart(part);
            }}
            onSubmit={handleSubmit}
            allParts={test.parts as QuestionPart[]}
            correctAnswers={answers}
            userAnswers={state}
          />
        </Box>
      </Box>
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
