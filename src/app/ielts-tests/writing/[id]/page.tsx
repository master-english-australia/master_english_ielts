"use client";

import { EmailSuccessDialog } from "@/app/components/EmailSuccessDialog";
import { NameInputDialog } from "@/app/components/NameInputDialog";
import { useEmail } from "@/app/ielts-tests/writing/hooks/useEmail";
import { Box } from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CommonLoading } from "../../../components/CommonLoading";
import { PartSwitcher } from "../../../components/PartSwitcher";
import { TaskRequirements } from "../../../components/TaskRequirements";
import { TestHeader } from "../../../components/TestHeader";
import { TestLayout } from "../components/TestLayout";
import { writingTests } from "../mockData";
import { countWords } from "../utils/wordCounter";

export default function WritingTestPage() {
  const params = useParams();
  const router = useRouter();
  const testId = params.id as string;
  const test = writingTests;

  useEffect(() => {
    if (!test) {
      console.error(`Invalid test ID: ${testId}`);
      router.push("/ielts-tests/writing");
    }
  }, [test, testId, router]);

  const [part1Essay, setPart1Essay] = useState("");
  const [part2Essay, setPart2Essay] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [currentPart, setCurrentPart] = useState(1);
  const [showNameDialog, setShowNameDialog] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const { sendEmailAsync } = useEmail();

  const handleSubmitEssay = async () => {
    if (isSubmitted) return;
    setShowNameDialog(true);
  };

  const handleNameSubmit = async (userName: string) => {
    const isSuccess = await sendEmailAsync(
      part1Essay,
      part2Essay,
      test.part1.promptContent,
      test.part2.promptContent,
      test.id.toString(),
      userName,
    );

    if (isSuccess) {
      setIsSubmitted(true);
      setShowNameDialog(false);
      setShowSuccessDialog(true);
    }
  };

  const handleNameDialogClose = () => {
    setShowNameDialog(false);
  };

  useEffect(() => {
    const currentEssay = currentPart === 1 ? part1Essay : part2Essay;
    setWordCount(countWords(currentEssay));
  }, [currentPart]);

  const handleEssayChange = (part: number, value: string) => {
    if (part === 1) {
      setPart1Essay(value);
    } else {
      setPart2Essay(value);
    }
    const count = value.trim().split(/\s+/).filter(Boolean).length;
    setWordCount(count);
  };

  if (!test) {
    return <CommonLoading />;
  }

  return (
    <Box>
      <TestHeader timeLimit={3600} />

      <TaskRequirements
        currentPart={currentPart}
        instructions={test.part1.instructions}
      />

      <TestLayout
        currentPart={currentPart}
        promptTitle={test.part1.promptTitle}
        promptContent={test.part1.promptContent}
        isSubmitted={isSubmitted}
        part1Essay={part1Essay}
        part2Essay={part2Essay}
        wordCount={wordCount}
        onEssayChange={handleEssayChange}
      />

      <PartSwitcher
        currentPart={currentPart}
        totalParts={2}
        isSubmitted={isSubmitted}
        onPartChange={setCurrentPart}
        onSubmit={handleSubmitEssay}
        allParts={[]}
        correctAnswers={[]}
        userAnswers={{}}
      />

      <NameInputDialog
        open={showNameDialog}
        onClose={handleNameDialogClose}
        onSubmit={handleNameSubmit}
      />

      <EmailSuccessDialog
        open={showSuccessDialog}
        onClose={() => setShowSuccessDialog(false)}
        onGoToList={() => router.push("/ielts-tests/writing")}
      />
    </Box>
  );
}
