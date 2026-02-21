import { Moon, Sun } from "lucide-react";
import { ThemeContext } from "../../context/theme/ThemeContext";
import { useContext } from "react";

const DarkModeComponent = () => {
  const context = useContext(ThemeContext);
  if (!context) throw console.error("Some issue with the Theme context");
  const { darkMode, toggleDarkMode } = context;
  return (
    <section className="flex gap-5 justify-center font-medium mt-auto text-sm">
      <p className="text-zinc-600 dark:text-white">Light</p>
      {darkMode ? (
        <button onClick={toggleDarkMode} className="cursor-pointer">
          <Sun />
        </button>
      ) : (
        <button onClick={toggleDarkMode} className="text-black cursor-pointer">
          <Moon />
        </button>
      )}
      <p className="dark:text-zinc-500 text-black">Dark</p>
    </section>
  );
};

export default DarkModeComponent;
