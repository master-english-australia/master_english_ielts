import React from "react";
import { AnswerState } from "../contexts/createAnswerContext";
import { QuestionGroup } from "../models/QuestionGroup";
import { MatchingQuestion } from "./MatchingQuestion";
import { MultipleChoiceQuestion } from "./MultipleChoiceQuestion";
import { TextInputQuestion } from "./TextInputQuestion";
import { TrueFalseNotGivenQuestion } from "./TrueFalseNotGivenQuestion";

type Props = {
  questionGroup: QuestionGroup;
  onChangeAnswer: (questionNumber: number, value: string) => void;
  state: AnswerState;
};

export const QuestionTypeRenderer: React.FC<Props> = ({
  questionGroup,
  onChangeAnswer,
  state,
}) => {
  switch (questionGroup.questionType) {
    case "multiple_choice":
      return (
        <MultipleChoiceQuestion
          questionGroup={questionGroup}
          onChangeAnswer={onChangeAnswer}
          answerState={state}
        />
      );
    case "true_false_not_given":
      return (
        <TrueFalseNotGivenQuestion
          questionGroup={questionGroup}
          onChangeAnswer={onChangeAnswer}
          answerState={state}
        />
      );
    case "text_input":
      return (
        <TextInputQuestion
          questionGroup={questionGroup}
          onChangeAnswer={onChangeAnswer}
          answerState={state}
        />
      );
    case "matching":
      return (
        <MatchingQuestion
          questionGroup={questionGroup}
          onChangeAnswer={onChangeAnswer}
          answerState={state}
        />
      );
    default:
      return <div>Unsupported question type</div>;
  }
};
