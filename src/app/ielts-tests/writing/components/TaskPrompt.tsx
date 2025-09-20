import { Box } from "@mui/material";

interface TaskPromptProps {
  id: string;
  contentWidth: number;
  promptContent: string;
  imageUrl?: string;
}

export const TaskPrompt = ({
  id,
  contentWidth,
  promptContent,
  imageUrl,
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
        {imageUrl && (
          <Box
            component="img"
            src={imageUrl}
            alt="Task Prompt"
            loading="lazy"
            sx={{
              width: "70%",
              height: "auto",
              mt: 2,
              borderRadius: 1,
              display: "block",
              mx: "auto",
              pt: 2,
            }}
          />
        )}
      </Box>
    </Box>
  );
};
