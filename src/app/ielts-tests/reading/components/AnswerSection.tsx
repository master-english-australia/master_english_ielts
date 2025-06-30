import { Box } from "@mui/material";
import { QuestionRenderer } from "../../../components/QuestionRenderer";
import { QuestionGroup } from "../../models/QuestionGroup";

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
      id={id}
      className="answer-section"
      style={{
        width: `${answerWidth}%`,
        maxWidth: `${answerWidth}%`,
        flex: `0 0 ${answerWidth}%`,
      }}
    >
      {questionGroups.map((group) => (
        <QuestionRenderer key={group.id} questionGroup={group} />
      ))}
    </Box>
  );
};
