import { useState, type ReactNode } from "react";
import { ThemeContext } from "./ThemeContext";

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const key = "nowted-theme";
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem(key) === "dark" || false;
  });

  const toggleDarkMode = () => {
    if (darkMode) {
      localStorage.setItem(key, "light");
    } else {
      localStorage.setItem(key, "dark");
    }

    setDarkMode((prev) => !prev);
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};
