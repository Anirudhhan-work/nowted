import { Search } from "lucide-react";
import logo from "../../assets/nowtedlogo.svg";
import { ThemeContext } from "../../context/theme/ThemeContext";
import { useContext } from "react";
const HeadComponent = () => {
  const context = useContext(ThemeContext);
  if (!context) throw console.error("Some issue with the Theme context");
  const { darkMode } = context;

  return (
    <section
      className={`flex justify-between items-center px-5 ${!darkMode && "invert-75"}`}
    >
      <img src={logo} alt="nowted logo" />
      <Search className="text-background-800" />
    </section>
  );
};

export default HeadComponent;
