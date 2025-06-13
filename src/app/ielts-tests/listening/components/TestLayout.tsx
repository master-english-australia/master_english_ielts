import { Box } from "@mui/material";
import { QuestionRenderer } from "../../components/QuestionRenderer";
import { QuestionGroup } from "../../models/QuestionGroup";

interface TestLayoutProps {
  questionGroups: QuestionGroup[];
}

export const TestLayout = ({ questionGroups }: TestLayoutProps) => {
  return (
    <Box>
      {questionGroups.map((group) => (
        <QuestionRenderer key={group.id} questionGroup={group} />
      ))}
    </Box>
  );
};
