import { Answer } from "@/app/models/Answer";
import { Box } from "@mui/material";
import { QuestionGroup } from "../../../models/QuestionGroup";
import { ListeningQuestionRenderer } from "./ListeningQuestionRenderer";

interface TestLayoutProps {
  questionGroups: QuestionGroup[];
  seekTo: (timeInSeconds: number) => void;
  isSubmitted: boolean;
  correctAnswers: Answer[];
}

export const TestLayout = ({
  questionGroups,
  seekTo,
  isSubmitted,
  correctAnswers,
}: TestLayoutProps) => {
  return (
    <Box p={2} mx={2}>
      {questionGroups.map((group) => (
        <ListeningQuestionRenderer
          key={group.id}
          questionGroup={group}
          seekTo={seekTo}
          isSubmitted={isSubmitted}
          correctAnswers={correctAnswers}
        />
      ))}
    </Box>
  );
};
