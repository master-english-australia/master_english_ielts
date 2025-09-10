import { Box } from "@mui/material";

interface TaskPromptProps {
  id: string;
  contentWidth: number;
  promptTitle: string;
  promptContent: string;
}

export const TaskPrompt = ({
  id,
  contentWidth,
  promptContent,
}: TaskPromptProps) => {
  return (
    <Box
      position="relative"
      id={id}
      width={`${contentWidth}%`}
      maxWidth={`${contentWidth}%`}
      flex={`0 0 ${contentWidth}%`}
      sx={{ overflowY: "auto", height: "100%", overscrollBehavior: "contain" }}
    >
      <Box dangerouslySetInnerHTML={{ __html: promptContent }} />
    </Box>
  );
};
