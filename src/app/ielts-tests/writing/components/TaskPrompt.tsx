import { Box } from "@mui/material";

interface TaskPromptProps {
  id: string;
  contentWidth: number;
  promptContent: string;
}

export const TaskPrompt = ({
  id,
  contentWidth,
  promptContent,
}: TaskPromptProps) => {
  return (
    <Box
      id={id}
      style={{
        width: `${contentWidth}%`,
        maxWidth: `${contentWidth}%`,
        flex: `0 0 ${contentWidth}%`,
      }}
    >
      <Box>
        <Box
          sx={{
            "& ul": {
              display: "table",
              marginLeft: "60px",
              marginRight: "auto",
              textAlign: "left",
            },
            "& ul li": {
              textAlign: "left",
            },
          }}
          dangerouslySetInnerHTML={{ __html: promptContent }}
        />
      </Box>
    </Box>
  );
};
