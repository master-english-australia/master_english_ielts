interface ResizeHandleProps {
  isResizing: boolean;
  answerWidth: number;
  onResizeStart: (e: React.MouseEvent) => void;
}

export const ResizeHandle = ({ 
  isResizing, 
  answerWidth, 
  onResizeStart 
}: ResizeHandleProps) => {
  return (
    <div 
      className={`resize-handle ${isResizing ? 'active' : ''}`} 
      onMouseDown={onResizeStart}
      style={{ right: `${answerWidth}%` }}
    />
  );
}; 