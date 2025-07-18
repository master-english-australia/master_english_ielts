import { Answer } from "@/app/models/Answer";
import { Box } from "@mui/material";
import { QuestionGroup } from "../../../models/QuestionGroup";
import { ReadingQuestionRenderer } from "./QuestionRenderer";

interface AnswerSectionProps {
  id: string;
  answerWidth: number;
  isSubmitted: boolean;
  questionGroups: QuestionGroup[];
  correctAnswers: Answer[];
}

export const AnswerSection = ({
  id,
  answerWidth,
  isSubmitted,
  questionGroups,
  correctAnswers,
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
        <ReadingQuestionRenderer
          key={group.id}
          questionGroup={group}
          isSubmitted={isSubmitted}
          correctAnswers={correctAnswers}
        />
      ))}
    </Box>
  );
};
