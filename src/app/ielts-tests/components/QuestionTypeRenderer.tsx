import React from "react";
import { QuestionGroup } from "../models/QuestionGroup";
import { MatchingQuestion } from "./MatchingQuestion";
import { MultipleChoiceQuestion } from "./MultipleChoiceQuestion";
import { TextInputQuestion } from "./TextInputQuestion";
import { TrueFalseNotGivenQuestion } from "./TrueFalseNotGivenQuestion";

type Props = {
  questionGroup: QuestionGroup;
};

export const QuestionTypeRenderer: React.FC<Props> = ({ questionGroup }) => {
  switch (questionGroup.questionType) {
    case "multiple_choice":
      return <MultipleChoiceQuestion questionGroup={questionGroup} />;
    case "true_false_not_given":
      return <TrueFalseNotGivenQuestion questionGroup={questionGroup} />;
    case "text_input":
      return <TextInputQuestion questionGroup={questionGroup} />;
    case "matching":
      return <MatchingQuestion questionGroup={questionGroup} />;
    default:
      return <div>Unsupported question type</div>;
  }
};
