import { Headset } from "@mui/icons-material";
import { Button } from "@mui/material";

interface ResumeSoundButtonProps {
  onClick: () => void;
}

export const ResumeSoundButton = ({ onClick }: ResumeSoundButtonProps) => {
  return (
    <Button
      startIcon={<Headset sx={{ color: "black" }} />}
      sx={{
        border: "1px solid #c0c0c0",
        borderRadius: 1,
        p: 1,
        textTransform: "none",
        color: "black",
      }}
      onClick={onClick}
    >
      Listen From Here
    </Button>
  );
};
