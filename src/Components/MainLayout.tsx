import { useContext } from "react";
import { ThemeContext } from "../context/theme/ThemeContext";
import { Outlet } from "react-router-dom";
import SideBar from "./sidebar/SideBar";

const MainLayout = () => {
  const context = useContext(ThemeContext);

  if (!context) throw console.error("Some issue with the Theme context");

  const { darkMode } = context;

  return (
    <div
      className={`w-full bg-background h-screen dark:text-white flex  text-blue ${darkMode && "dark"}`}
    >
      <div className="w-[18%]">
        <SideBar />
      </div>
      <div className="overflow-y-auto w-[82%]">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
