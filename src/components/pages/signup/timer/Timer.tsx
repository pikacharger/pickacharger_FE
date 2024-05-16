import * as S from "./Timer.style";

import { useState, useEffect, SetStateAction, Dispatch } from "react";

interface TimerProps {
  minutes: number;
  setIsTimeOver?: Dispatch<SetStateAction<boolean>>;
}

const INTERVAL = 1000;

export default function Timer({ minutes, setIsTimeOver }: TimerProps) {
  const minutesInMs = minutes * 60 * 1000;
  const [time, setTime] = useState(minutesInMs);

  const timerMinutes = String(Math.floor((time / (1000 * 60)) % 60)).padStart(
    2,
    "0"
  );
  const timerSecond = String(Math.floor((time / 1000) % 60)).padStart(2, "0");

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prev) => {
        if (prev <= INTERVAL) {
          clearInterval(timer);
          if (setIsTimeOver) {
            setIsTimeOver(true);
          }
          return 0;
        }
        return prev - INTERVAL;
      });
    }, INTERVAL);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <S.Container>
      <S.Text>
        {timerMinutes} : {timerSecond}
      </S.Text>
    </S.Container>
  );
}
