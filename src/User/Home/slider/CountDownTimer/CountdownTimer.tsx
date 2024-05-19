import React, { useState, useEffect } from "react";
import './CountDownTimer.css'
function CountdownTimer({ deadline }) {
  const calculateTimeLeft = (endDate) => {
    const difference = endDate.getTime() - Date.now();

    // Handle expired countdown
    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    const remainingDays = Math.floor(difference / (1000 * 60 * 60 * 24));
    const remainingHours = Math.floor(
      (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const remainingMinutes = Math.floor(
      (difference % (1000 * 60 * 60)) / (1000 * 60)
    );
    const remainingSeconds = Math.floor((difference % (1000 * 60)) / 1000);

    return {
      days: remainingDays,
      hours: remainingHours,
      minutes: remainingMinutes,
      seconds: remainingSeconds,
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(deadline));

  useEffect(() => {
    const timerId = setInterval(() => {
      setTimeLeft(calculateTimeLeft(deadline));
    }, 1000);

    return () => clearInterval(timerId);
  }, [deadline]);

  const formatTime = (time) => (time < 10 ? `0${time}` : time);

  return (
    <div className="countdown-timer">
      <div className="time-segment ">
        <span className="time-update">
          {formatTime(timeLeft.days)}
        </span>
        <span className="dateText">Ngày</span>
      </div>
      <div className="time-segment flex flex-col gap-2">
        <span className="time-update">{formatTime(timeLeft.hours)}</span>
        <span className="dateText">Giờ</span>
      </div>
      <div className="time-segment flex flex-col gap-2">
        <span className="time-update">{formatTime(timeLeft.minutes)}</span>
        <span className="dateText">Phút</span>
      </div>
      <div className="time-segment flex flex-col gap-2">
        <span className="time-update">{formatTime(timeLeft.seconds)}</span>
        <span className="dateText">Giây</span>
      </div>
    </div>
  );
}

export default CountdownTimer;
