// QuestionRenderer.tsx
import { Box } from '@mui/material';
import React from 'react';
import { QuestionNumbers } from '../../components/QuestionNumbers';
import { QuestionGroup } from '../../models/QuestionGroup';
import { MatchingQuestion } from './MatchingQuestion';
import { MultipleChoiceQuestion } from './MultipleChoiceQuestion';
import { TextInputQuestion } from './TextInputQuestion';
import { TrueFalseNotGivenQuestion } from './TrueFalseNotGivenQuestion';

type Props = {
  questionGroup: QuestionGroup;
};

export const QuestionRenderer: React.FC<Props> = ({ questionGroup }) => {
  let component = null

  switch (questionGroup.questionType) {
    case 'multiple_choice':
      component = <MultipleChoiceQuestion questionGroup={questionGroup} />;
      break;
    case 'true_false_not_given':
      component = <TrueFalseNotGivenQuestion questionGroup={questionGroup} />;
      break;
    case 'text_input':
      component = <TextInputQuestion questionGroup={questionGroup} />;
      break;
    case 'matching':
      component = <MatchingQuestion questionGroup={questionGroup} />;
      break;
    default:
      component = <div>Unsupported question type</div>;
  }

  return (
    <Box mb={8}>
      <QuestionNumbers questions={questionGroup.questions} />
      {component}
    </Box>
  );
};