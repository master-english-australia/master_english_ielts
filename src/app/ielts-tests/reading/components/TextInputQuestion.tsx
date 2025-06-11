// TextInputQuestion.tsx
import { Box } from '@mui/material';
import React from 'react';
import { QuestionGroup } from '../../models/QuestionGroup';
import { HtmlInlineQuestionParser } from '../../utils/HtmlInlineQuestionParser';

type Props = {
  questionGroup: QuestionGroup;
};

export const TextInputQuestion: React.FC<Props> = ({ questionGroup }) => {
  return (
    <Box padding={2} border={1} borderColor="grey.400" borderRadius={1}>
      <div style={{  }} dangerouslySetInnerHTML={{ __html: questionGroup.instruction }} />
      <HtmlInlineQuestionParser htmlText={questionGroup.questionText || ''} questions={questionGroup.questions} />
    </Box>
  );
};
