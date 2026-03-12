import { useRef } from "react";
import { useContext } from "react";
import { NoteContext } from "../context/Notes/NoteContext";

export const useDebounce = <T>(
  callback: (...args: T[]) => void,
  time: number,
) => {
  const timerRef = useRef<ReturnType<typeof setTimeout>>(null);

  return function (...args: T[]) {
    if (timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      callback(...args);
    }, time);
  };
};

export const useNotes = () => {
  const context = useContext(NoteContext);

  if (!context) {
    throw new Error("something went wrong");
  }

  return context;
};
