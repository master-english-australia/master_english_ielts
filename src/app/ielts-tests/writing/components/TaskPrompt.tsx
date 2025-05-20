interface TaskPromptProps {
  contentWidth: number;
  promptTitle: string;
  promptContent: string;
}

export const TaskPrompt = ({ 
  contentWidth, 
  promptTitle, 
  promptContent 
}: TaskPromptProps) => {
  return (
    <div 
      className="writing-test-content"
      style={{
        width: `${contentWidth}%`,
        maxWidth: `${contentWidth}%`,
        flex: `0 0 ${contentWidth}%`
      }}
    >
      <div className="task-prompt">
        <h2>{promptTitle}</h2>
        <div dangerouslySetInnerHTML={{ __html: promptContent }} />
      </div>
    </div>
  );
}; 