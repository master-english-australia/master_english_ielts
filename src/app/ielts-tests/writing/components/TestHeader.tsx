import { formatTime, useTimer } from '../utils/timerHandler';

interface TestHeaderProps {
  timeLimit: number;
  onTimeUp: () => void;
}

export const TestHeader = ({ timeLimit, onTimeUp }: TestHeaderProps) => {
  const timer = useTimer(timeLimit, onTimeUp);

  return (
    <div className="writing-test-header">
      <span className="writing-test-timer">
        <span className="timer-icon">⏱</span>
        {formatTime(timer)}
      </span>
    </div>
  );
}; 