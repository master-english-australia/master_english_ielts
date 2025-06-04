interface TaskRequirementsProps {
  currentPart: number;
  instructions: string;
}

export const TaskRequirements = ({ 
  currentPart, 
  instructions 
}: TaskRequirementsProps) => {
  return (
    <div className="task-requirements-banner">
      <div className="task-part">Part {currentPart}</div>
      <div className="task-requirement">
        You should spend about {currentPart === 1 ? '20' : '40'} minutes on this task. Write at least {instructions.replace(/[^0-9]/g, '')} words.
      </div>
    </div>
  );
}; 