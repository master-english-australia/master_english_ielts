interface TaskPromptProps {
  id: string;
  contentWidth: number;
  promptTitle: string;
  promptContent: string;
}

export const TaskPrompt = ({
  id,
  contentWidth,
  promptTitle,
  promptContent,
}: TaskPromptProps) => {
  return (
    <div
      id={id}
      className="writing-test-content"
      style={{
        width: `${contentWidth}%`,
        maxWidth: `${contentWidth}%`,
        flex: `0 0 ${contentWidth}%`,
      }}
    >
      <div className="task-prompt">
        <h2>{promptTitle}</h2>
        <div dangerouslySetInnerHTML={{ __html: promptContent }} />
      </div>
    </div>
  );
};
