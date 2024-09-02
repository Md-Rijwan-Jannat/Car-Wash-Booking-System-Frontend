import { FC, useEffect, useState } from "react";

type TCountdownProps = {
  recentDate: string;
  recentTime: string;
};

const Countdown: FC<TCountdownProps> = ({ recentDate, recentTime }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setCurrentDate(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const parseDate = (dateString: string, timeString: string) => {
    const [day, month, year] = dateString.split("-").map(Number);
    const [hours, minutes] = timeString.split(":").map(Number);
    return new Date(year, month - 1, day, hours, minutes);
  };

  const getCountdown = (startDateTime: Date) => {
    const timeDiff = startDateTime.getTime() - currentDate.getTime();
    if (timeDiff <= 0) return "Start Vehicle Service";

    const hours = Math.floor(
      (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

    return `${hours}h ${minutes}m ${seconds}s`;
  };

  return <p>{getCountdown(parseDate(recentDate, recentTime))}</p>;
};

export default Countdown;
