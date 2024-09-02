import { Chip } from "@nextui-org/react";
import React, { useEffect, useState } from "react";

interface CountdownTimerProps {
  targetTime: Date;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetTime }) => {
  const [timeRemaining, setTimeRemaining] = useState<number>(
    () => targetTime.getTime() - new Date().getTime()
  );

  useEffect(() => {
    const calculateTimeRemaining = () => {
      const now = new Date();
      const remaining = targetTime.getTime() - now.getTime();
      console.log("Current Time:", now);
      console.log("Target Time:", targetTime);
      console.log("Time Remaining (ms):", remaining);
      setTimeRemaining(remaining);
    };

    calculateTimeRemaining(); // Initial calculation

    const interval = setInterval(calculateTimeRemaining, 1000);

    return () => clearInterval(interval);
  }, [targetTime]);

  if (timeRemaining <= 0) {
    return <span>Time is up!</span>;
  }

  const hours = Math.floor((timeRemaining / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((timeRemaining / (1000 * 60)) % 60);
  const seconds = Math.floor((timeRemaining / 1000) % 60);

  return (
    <Chip color="warning" variant="faded" size="sm">
      <div className="flex items-center gap-1">
        {hours}
        <p>h</p> {minutes} <p>m</p> {seconds}
        <p>s</p>
      </div>
    </Chip>
  );
};

export default CountdownTimer;
