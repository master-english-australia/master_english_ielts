import { Box } from "@mui/material";

interface ResizeHandleProps {
  contentWidth: number;
  onResizeStart: (e: React.MouseEvent) => void;
}

export const ResizeHandle = ({
  contentWidth,
  onResizeStart,
}: ResizeHandleProps) => {
  return (
    <Box
      width={2}
      mt={2}
      height="100%"
      bgcolor="grey.300"
      position="absolute"
      sx={{ transition: "background-color 0.2s ease", cursor: "col-resize" }}
      top={0}
      bottom={0}
      left={`${contentWidth}%`}
      onMouseDown={onResizeStart}
    />
  );
};
