'use client';

import '@/styles/writing-test.css';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { PartSwitcher } from '../../components/PartSwitcher';
import { TaskRequirements } from '../../components/TaskRequirements';
import { TestHeader } from '../../components/TestHeader';
import { TestLayout } from '../../speaking/components/TestLayout';
import { writingTests } from '../mockData';
import { Feedback } from '../types/feedback';
import { calculateFeedback } from '../utils/feedbackHandler';
import { countWords } from '../utils/wordCounter';

export default function WritingTestPage() {
  const params = useParams();
  const router = useRouter();
  const testId = params.id as string;
  const test = writingTests;
  
  useEffect(() => {
    if (!test) {
      console.error(`Invalid test ID: ${testId}`);
      router.push('/ielts-tests/writing');
    }
  }, [test, testId, router]);

  const [part1Essay, setPart1Essay] = useState('');
  const [part2Essay, setPart2Essay] = useState('');
  const [wordCount, setWordCount] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [currentPart, setCurrentPart] = useState<'part1' | 'part2'>('part1');
  const [feedback, setFeedback] = useState<Feedback | null>(null);

  const handleSubmitEssay = () => {
    if (isSubmitted) return;
    setFeedback(calculateFeedback(wordCount));
    setIsSubmitted(true);
  };

  useEffect(() => {
    const currentEssay = currentPart === 'part1' ? part1Essay : part2Essay;
    setWordCount(countWords(currentEssay));
  }, [currentPart, part1Essay, part2Essay]);

  const handleEssayChange = (part: 'part1' | 'part2', value: string) => {
    if (part === 'part1') {
      setPart1Essay(value);
    } else {
      setPart2Essay(value);
    }
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
        instructions={test[currentPart].instructions}
      />
      
      <TestLayout
        currentPart={currentPart}
        promptTitle={test[currentPart].promptTitle}
        promptContent={test[currentPart].promptContent}
        isSubmitted={isSubmitted}
        part1Essay={part1Essay}
        part2Essay={part2Essay}
        wordCount={wordCount}
        feedback={feedback}
        onEssayChange={handleEssayChange}
      />

      <PartSwitcher
        currentPart={currentPart}
        isSubmitted={isSubmitted}
        onPartChange={setCurrentPart}
        onSubmit={handleSubmitEssay}
      />
    </div>
  );
} 