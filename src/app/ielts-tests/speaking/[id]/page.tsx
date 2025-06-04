'use client';

import '@/styles/writing-test.css';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { PartSwitcher } from '../../components/PartSwitcher';
import { TaskRequirements } from '../../components/TaskRequirements';
import { TestHeader } from '../../components/TestHeader';
import { writingTests } from '../../writing/mockData';
import { Feedback } from '../../writing/types/feedback';
import { TestLayout } from '../components/TestLayout';

export default function SpeakingTestPage() {
  const params = useParams();
  const router = useRouter();
  const testId = params.id as string;
  const test = writingTests;
  
  useEffect(() => {
    if (!test) {
      console.error(`Invalid test ID: ${testId}`);
      router.push('/ielts-tests/speaking');
    }
  }, [test, testId, router]);

  
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [currentPart, setCurrentPart] = useState(1);
  const [feedback, setFeedback] = useState<Feedback | null>(null);

  const handleSubmitEssay = () => {
    if (isSubmitted) return;
    setIsSubmitted(true);
  };

  if (!test) {
    return <div>Loading test data...</div>;
  }

  return (
    <div className="writing-test-page">
      <TestHeader 
        timeLimit={test.timeLimit} 
        onTimeUp={handleSubmitEssay} 
      />
      
      <TaskRequirements
        currentPart={currentPart}
        instructions={test.part1.instructions}
      />
      
      <TestLayout
        questionNumber={1}
        questionText="What is your name?"
        onPrev={() => {}}
        onNext={() => {}}
        onSubmit={() => {}}
        isFirst={true}
        isLast={true}
        isSubmitted={isSubmitted}
      />

      <PartSwitcher
        currentPart={currentPart}
        totalParts={3}
        isSubmitted={isSubmitted}
        onPartChange={(part) => setCurrentPart(part)}
      />
    </div>
  );
} 