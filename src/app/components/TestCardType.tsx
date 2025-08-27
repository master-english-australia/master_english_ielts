import { Box, Skeleton } from "@mui/material";

export const TestCardType = ({
  type,
  isLoading,
}: {
  type: string;
  isLoading: boolean;
}) => {
  if (isLoading)
    return (
      <Skeleton
        width={80}
        height={28}
        sx={{ borderRadius: "4px" }}
        variant="rounded"
      />
    );
  return (
    <Box
      width={80}
      height={28}
      sx={{
        backgroundColor: "#f0f0f0",
        borderRadius: "4px",
        fontSize: "0.8rem",
        color: "#666",
        textAlign: "center",
        lineHeight: "28px",
      }}
    >
      {type}
    </Box>
  );
};
