import { useRef } from "react";

export const useDebounce = (
  callback: (title: string, content: string) => void,
  time: number,
) => {
  const timerRef = useRef<number>(null);

  return function (title: string, content: string) {
    if (timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      callback(title, content);
    }, time);
  };
};
