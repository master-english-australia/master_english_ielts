interface TaskRequirementsProps {
  currentPart: 'part1' | 'part2';
  instructions: string;
}

export const TaskRequirements = ({ 
  currentPart, 
  instructions 
}: TaskRequirementsProps) => {
  return (
    <div className="task-requirements-banner">
      <div className="task-part">Part {currentPart === 'part1' ? '1' : '2'}</div>
      <div className="task-requirement">
        You should spend about {currentPart === 'part1' ? '20' : '40'} minutes on this task. Write at least {instructions.replace(/[^0-9]/g, '')} words.
      </div>
    </div>
  );
}; 