import { useRef } from "react";

export const useDebounce = <T>(
  callback: (...args: T[]) => void,
  time: number,
) => {
  const timerRef = useRef<number>(null);

  return function (...args: T[]) {
    if (timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      callback(...args);
    }, time);
  };
};
