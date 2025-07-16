import { useEffect, useState } from "react";
import {
  LISTENING_SCORE_TABLE,
  READING_SCORE_TABLE,
} from "../consts/bandscores";
import { Answer } from "../models/Answer";
import { IeltsSection } from "../models/IeltsTest";

export function useScoreCalculator(
  userAnswers: Record<number, string>,
  correctAnswers: Answer[],
  ieltsSection: IeltsSection,
) {
  const [correctCount, setCorrectCount] = useState<number>(0);
  const [bandScore, setBandScore] = useState<number>(0);

  const calculateBandScore = (
    correctCount: number,
    section: IeltsSection,
  ): number => {
    const scoreTable =
      section === "listening" ? LISTENING_SCORE_TABLE : READING_SCORE_TABLE;

    const scoreEntry = scoreTable.find(
      (entry) =>
        correctCount >= entry.minCorrect && correctCount <= entry.maxCorrect,
    );

    return scoreEntry ? scoreEntry.bandScore : 0;
  };

  const calculateScore = () => {
    if (!userAnswers || !correctAnswers) {
      setCorrectCount(0);
      setBandScore(0);
      return;
    }

    let correctCount = 0;
    const totalQuestions = Object.keys(userAnswers).length;

    Object.entries(userAnswers).forEach(([questionNumber, userAnswer]) => {
      const qNum = parseInt(questionNumber);
      const correctAnswer = correctAnswers.find(
        (answer) => answer.number === qNum,
      );

      if (correctAnswer) {
        const normalizedUserAnswer = userAnswer?.trim().toLowerCase() || "";

        const isCorrect = correctAnswer.answers.some(
          (answer) => answer.trim().toLowerCase() === normalizedUserAnswer,
        );

        if (isCorrect) {
          correctCount++;
        }
      }
    });

    const bandScore = calculateBandScore(correctCount, ieltsSection);

    setCorrectCount(correctCount);
    setBandScore(bandScore);
  };

  useEffect(() => {
    calculateScore();
  }, [userAnswers, correctAnswers, ieltsSection]);

  return {
    correctCount,
    bandScore,
    calculateScore,
  };
}
