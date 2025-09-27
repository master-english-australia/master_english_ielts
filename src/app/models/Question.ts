export enum QuestionType {
  MultipleChoice = "multiple_choice",
  Matching = "matching",
  TrueFalseNotGiven = "true_false_not_given",
  TextInput = "text_input",
  MultipleSelectChoice = "multiple_select_choice",
  AnswerQuestion = "answer_question",
  MultipleChoiceInput = "multiple_choice_input",
}

export interface Question {
  id: string;
  questionText?: string;
  options?: string[];
  correctAnswer: string;
}
