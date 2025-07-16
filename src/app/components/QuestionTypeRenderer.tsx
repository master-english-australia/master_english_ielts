import React from "react";
import { AnswerState } from "../contexts/createAnswerContext";
import { Answer } from "../models/Answer";
import { QuestionGroup } from "../models/QuestionGroup";
import { MatchingQuestion } from "./MatchingQuestion";
import { MultipleChoiceQuestion } from "./MultipleChoiceQuestion";
import { TextInputQuestion } from "./TextInputQuestion";
import { TrueFalseNotGivenQuestion } from "./TrueFalseNotGivenQuestion";

type Props = {
  questionGroup: QuestionGroup;
  onChangeAnswer: (questionNumber: number, value: string) => void;
  state: AnswerState;
  isSubmitted: boolean;
  correctAnswers: Answer[];
};

export const QuestionTypeRenderer: React.FC<Props> = ({
  questionGroup,
  onChangeAnswer,
  state,
  isSubmitted,
  correctAnswers,
}) => {
  switch (questionGroup.questionType) {
    case "multiple_choice":
      return (
        <MultipleChoiceQuestion
          questionGroup={questionGroup}
          onChangeAnswer={onChangeAnswer}
          answerState={state}
          isSubmitted={isSubmitted}
          correctAnswers={correctAnswers}
        />
      );
    case "true_false_not_given":
      return (
        <TrueFalseNotGivenQuestion
          questionGroup={questionGroup}
          onChangeAnswer={onChangeAnswer}
          answerState={state}
          isSubmitted={isSubmitted}
          correctAnswers={correctAnswers}
        />
      );
    case "text_input":
      return (
        <TextInputQuestion
          questionGroup={questionGroup}
          onChangeAnswer={onChangeAnswer}
          answerState={state}
          isSubmitted={isSubmitted}
          correctAnswers={correctAnswers}
        />
      );
    case "matching":
      return (
        <MatchingQuestion
          questionGroup={questionGroup}
          onChangeAnswer={onChangeAnswer}
          answerState={state}
          isSubmitted={isSubmitted}
          correctAnswers={correctAnswers}
        />
      );
    default:
      return <div>Unsupported question type</div>;
  }
};
