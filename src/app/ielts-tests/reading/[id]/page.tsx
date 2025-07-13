"use client";

import { Box } from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { PartSwitcher } from "../../../components/PartSwitcher";
import { TaskRequirements } from "../../../components/TaskRequirements";
import { TestHeader } from "../../../components/TestHeader";
import { Feedback } from "../../writing/types/feedback";
import { TestLayout } from "../components/TestLayout";
import { ReadingAnswerProvider } from "../hooks/useAnswerContext";
import { readingTest2 } from "../mockData";

export default function ReadingTestPage() {
  const params = useParams();
  const router = useRouter();
  const testId = params.id as string;
  const test = readingTest2;

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

  if (!test) {
    return <div>Loading test data...</div>;
  }

  const currentPartData = test.parts[currentPart - 1];

  return (
    <ReadingAnswerProvider>
      <Box>
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
            setCurrentQuestion(1);
          }}
        />
      </Box>
    </ReadingAnswerProvider>
  );
}
