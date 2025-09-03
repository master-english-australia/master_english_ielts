import { useEffect, useState } from "react";

export function useTimer(timeLimit: number) {
  const [timeLeft, setTimeLeft] = useState(timeLimit);
  const [overtime, setOvertime] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timeLeft > 0) {
      interval = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    } else {
      interval = setInterval(() => setOvertime((o) => o + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [timeLeft]);

  return { timeLeft: Math.max(0, timeLeft), overtime: timeLeft <= 0 ? overtime : 0 };
}

export function formatTime(sec: number) {
  const m = Math.floor(sec / 60)
    .toString()
    .padStart(2, "0");
  const s = (sec % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}
