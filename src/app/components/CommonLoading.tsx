import { Box, CircularProgress } from "@mui/material";
import { Colors } from "../consts/colors";

export const CommonLoading = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <CircularProgress sx={{ color: Colors.PRIMARY }} />
    </Box>
  );
};
