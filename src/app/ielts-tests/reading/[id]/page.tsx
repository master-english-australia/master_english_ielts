'use client';

import '@/styles/writing-test.css';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { PartSwitcher } from '../../components/PartSwitcher';
import { TaskRequirements } from '../../components/TaskRequirements';
import { TestHeader } from '../../components/TestHeader';
import { Feedback } from '../../writing/types/feedback';
import { TestLayout } from '../components/TestLayout';
import { readingTests } from '../mockData';

export default function ReadingTestPage() {
  const params = useParams();
  const router = useRouter();
  const testId = params.id as string;
  const test = readingTests;
  
  useEffect(() => {
    if (!test) {
      console.error(`Invalid test ID: ${testId}`);
      router.push('/ielts-tests/speaking');
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

  const handlePrevQuestion = () => {
    const currentPartData = test.parts[currentPart - 1];
    if (currentQuestion > 1) {
      setCurrentQuestion(currentQuestion - 1);
    } else if (currentPart > 1) {
      const prevPartData = test.parts[currentPart - 2];
      setCurrentPart(currentPart - 1);
      setCurrentQuestion(prevPartData.question_groups.length);
    }
  };

  const handleNextQuestion = () => {
    const currentPartData = test.parts[currentPart - 1];
    if (currentQuestion < currentPartData.question_groups.length) {
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
  const currentQuestionData = currentPartData.question_groups[currentQuestion - 1];
  const isFirstQuestion = currentPart === 1 && currentQuestion === 1;
  const isLastQuestion = currentPart === test.parts.length && currentQuestion === currentPartData.question_groups.length;

  return (
    <div className="writing-test-page">
      <TestHeader 
        timeLimit={test.time_limit} 
        onTimeUp={handleSubmitEssay} 
      />
      
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
    </div>
  );
} 