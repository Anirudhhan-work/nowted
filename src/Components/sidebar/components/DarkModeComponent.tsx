import { Moon, Sun } from "lucide-react";
import { ThemeContext } from "../../../context/theme/ThemeContext";
import { useContext } from "react";
import toast from "react-hot-toast";

const DarkModeComponent = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    toast.error("Some issue with the Theme context");
    return null;
  }
  const { darkMode, toggleDarkMode } = context;
  return (
    <section className="flex gap-5 justify-center font-medium text-sm">
      <p
        className="text-zinc-600 dark:text-white cursor-pointer"
        onClick={() => {
          if (darkMode) toggleDarkMode();
        }}
      >
        Light
      </p>
      {darkMode ? (
        <button onClick={toggleDarkMode} className="cursor-pointer">
          <Sun />
        </button>
      ) : (
        <button onClick={toggleDarkMode} className="text-black cursor-pointer">
          <Moon />
        </button>
      )}
      <p
        className="dark:text-zinc-500 text-black cursor-pointer"
        onClick={() => {
          if (!darkMode) toggleDarkMode();
        }}
      >
        Dark
      </p>
    </section>
  );
};

export default DarkModeComponent;
