import { Box } from "@mui/material";
import { QuestionGroup } from "../../../models/QuestionGroup";
import { ListeningQuestionRenderer } from "./ListeningQuestionRenderer";

interface TestLayoutProps {
  questionGroups: QuestionGroup[];
  seekTo: (timeInSeconds: number) => void;
  isSubmitted: boolean;
}

export const TestLayout = ({
  questionGroups,
  seekTo,
  isSubmitted,
}: TestLayoutProps) => {
  return (
    <Box p={2} mx={2}>
      {questionGroups.map((group) => (
        <ListeningQuestionRenderer
          key={group.id}
          questionGroup={group}
          seekTo={seekTo}
          isSubmitted={isSubmitted}
        />
      ))}
    </Box>
  );
};
