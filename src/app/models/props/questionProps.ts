import { AnswerState } from "../../contexts/createAnswerContext";
import { Answer } from "../Answer";
import { QuestionGroup } from "../QuestionGroup";

export type QuestionProps = {
  questionGroup: QuestionGroup;
  onChangeAnswer: (questionNumber: number, value: string) => void;
  answerState: AnswerState;
  correctAnswers: Answer[];
  isSubmitted: boolean;
};
