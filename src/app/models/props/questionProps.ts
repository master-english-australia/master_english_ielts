import { QuestionGroup } from "../QuestionGroup";

export type QuestionProps = {
  questionGroup: QuestionGroup;
  onChangeAnswer: (questionNumber: number, value: string) => void;
};
