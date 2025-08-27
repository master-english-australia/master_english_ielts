import { Button, ButtonProps } from "@mui/material";
import { Colors } from "@/app/consts/colors";

export default function CommonButton(props: ButtonProps) {
  const { sx, children, ...rest } = props;

  return (
    <Button
      {...rest}
      sx={{
        padding: "0.5rem 1rem",
        border: `1px solid ${Colors.BORDER}`,
        backgroundColor: Colors.WHITE,
        borderRadius: "4px",
        cursor: "pointer",
        transition: "all 0.2s",
        minWidth: "2.5rem",
        textAlign: "center",
        fontSize: "1rem",
        color: Colors.TEXT_DEFAULT,
        textTransform: "none",
        marginRight: "0.5rem",
        "&:hover": { backgroundColor: Colors.BACKGROUND_HOVER },
        ...sx,
      }}
    >
      {children}
    </Button>
  );
}
