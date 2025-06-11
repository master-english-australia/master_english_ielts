import { Question } from "./Question";

export interface QuestionGroup {
  id: string;
  instruction: string;
  questionType: string;
  questions: Question[];
  questionText?: string;
}

