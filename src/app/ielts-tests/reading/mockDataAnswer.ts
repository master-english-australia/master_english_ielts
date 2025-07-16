import { Answer } from "@/app/models/Answer";
import { readingTest2 } from "./mockData";

export const readingMockDataAnswer: Answer[] = [];

readingTest2.parts.forEach((part) => {
  part.question_groups.forEach((group) => {
    group.questions.forEach((question) => {
      const questionNumber = parseInt(question.id);
      const correctAnswer = question.correctAnswer;

      if (correctAnswer) {
        readingMockDataAnswer.push({
          number: questionNumber,
          answers: [correctAnswer],
        });
      }
    });
  });
});
