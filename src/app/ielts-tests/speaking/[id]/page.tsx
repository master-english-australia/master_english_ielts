"use client";

import { EmailSuccessDialog } from "@/app/components/EmailSuccessDialog";
import { NameInputDialog } from "@/app/components/NameInputDialog";
import { sendEmail } from "@/lib/api";
import { Box } from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { PartSwitcher } from "../../../components/PartSwitcher";
import { TaskRequirements } from "../../../components/TaskRequirements";
import { TestHeader } from "../../../components/TestHeader";
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
  const [showNameDialog, setShowNameDialog] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [currentPart, setCurrentPart] = useState(1);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);

  const handleSubmitEssay = () => {
    if (isSubmitted) return;
    setShowNameDialog(true);
  };

  const handlePrevQuestion = () => {
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
    <Box>
      <TestHeader timeLimit={900} />

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
        onAudioBlobReady={setAudioBlob}
      />

      <PartSwitcher
        currentPart={currentPart}
        totalParts={test.parts.length}
        isSubmitted={isSubmitted}
        onPartChange={(part) => {
          setCurrentPart(part);
          setCurrentQuestion(1);
        }}
        allParts={[]}
        correctAnswers={[]}
        userAnswers={{}}
      />

      <NameInputDialog
        open={showNameDialog}
        onClose={() => setShowNameDialog(false)}
        onSubmit={async (name) => {
          try {
            if (!audioBlob) return;
            const arrayBuffer = await audioBlob.arrayBuffer();
            const base64 = Buffer.from(arrayBuffer).toString("base64");
            await sendEmail({
              name,
              subject: `IELTS Speaking - ${name} - Part ${currentPart} Q${currentQuestion}`,
              message: `Speaking answer submitted by ${name}.\nPart: ${currentPart}\nQuestion: ${currentQuestion}`,
              attachments: [
                {
                  filename: `speaking_part${currentPart}_q${currentQuestion}.webm`,
                  content: base64,
                  contentType: audioBlob.type || "audio/webm",
                },
              ],
            });

            setShowSuccessDialog(true);
          } finally {
            setShowNameDialog(false);
            setIsSubmitted(true);
          }
        }}
      />

      <EmailSuccessDialog
        open={showSuccessDialog}
        onClose={() => setShowSuccessDialog(false)}
        onGoToList={() => router.push("/ielts-tests/speaking")}
      />
    </Box>
  );
}
