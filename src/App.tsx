import { useContext } from "react";
import SideBar from "./Components/SideBar";
import { ThemeContext } from "./context/theme/ThemeContext";

const App = () => {
  const context = useContext(ThemeContext);

  if (!context) throw console.error("Some issue with the Theme context");

  const { darkMode } = context;

  return (
    <div
      className={`w-full h-screen text-white text-blue ${darkMode && "dark"}`}
    >
      <SideBar />
    </div>
  );
};

export default App;
