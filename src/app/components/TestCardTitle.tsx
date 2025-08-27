import { Box, Skeleton } from "@mui/material";

export const TestCardTitle = ({
  title,
  isLoading,
}: {
  title: string;
  isLoading: boolean;
}) => {
  if (isLoading)
    return (
      <>
        <Skeleton variant="text" width="85%" height={28} />
        <Skeleton variant="text" width="60%" height={28} sx={{ mb: 1 }} />
      </>
    );
  return (
    <Box
      component="h3"
      mb={1}
      sx={{
        fontSize: "1.1rem",
      }}
    >
      {title}
    </Box>
  );
};
