import { useEffect, useState, type ReactNode } from "react";
import { ThemeContext } from "./ThemeContext";

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const key = "nowted-theme";
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const fetchTheme = () => {
      setDarkMode(localStorage.getItem(key) === "dark");
    };
    fetchTheme();
  }, []);

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
