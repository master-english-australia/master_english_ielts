import { Box } from "@mui/material";
import { QuestionGroup } from "../../../models/QuestionGroup";
import { ReadingQuestionRenderer } from "./QuestionRenderer";

interface AnswerSectionProps {
  id: string;
  answerWidth: number;
  isSubmitted: boolean;
  questionGroups: QuestionGroup[];
}

export const AnswerSection = ({
  id,
  answerWidth,
  questionGroups,
}: AnswerSectionProps) => {
  return (
    <Box
      position="relative"
      id={id}
      width={`${answerWidth}%`}
      maxWidth={`${answerWidth}%`}
      flex={`0 0 ${answerWidth}%`}
    >
      {questionGroups.map((group) => (
        <ReadingQuestionRenderer key={group.id} questionGroup={group} />
      ))}
    </Box>
  );
};
