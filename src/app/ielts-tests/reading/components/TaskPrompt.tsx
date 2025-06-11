interface TaskPromptProps {
  id: string;
  contentWidth: number;
  promptTitle: string;
  promptContent: string;
}

export const TaskPrompt = ({ 
  id,
  contentWidth, 
  promptContent 
}: TaskPromptProps) => {
  return (
    <div 
      id={id}
      className="writing-test-content"
      style={{
        width: `${contentWidth}%`,
        maxWidth: `${contentWidth}%`,
        flex: `0 0 ${contentWidth}%`
      }}
    >
      <div className="task-prompt">
        <div dangerouslySetInnerHTML={{ __html: promptContent }} />
      </div>
    </div>
  );
}; 