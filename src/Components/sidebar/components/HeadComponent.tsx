import { Search } from "lucide-react";
import logo from "../../../assets/nowtedlogo.svg";
import { ThemeContext } from "../../../context/theme/ThemeContext";
import { useContext, useState } from "react";
import AddNoteButton from "./AddNoteButton";
import SearchBar from "./SearchBar";
const HeadComponent = () => {
  const context = useContext(ThemeContext);
  if (!context) throw console.error("Some issue with the Theme context");
  const { darkMode } = context;

  const [showSearchBar, setShowSearchBar] = useState(false);

  return (
    <section>
      <div
        className={`flex justify-between items-center px-5 ${!darkMode && "invert-75"}`}
      >
        <img src={logo} alt="nowted logo" />
        <Search
          className="text-background-800 cursor-pointer"
          onClick={() => setShowSearchBar((prev) => !prev)}
        />
      </div>
      {showSearchBar ? <SearchBar /> : <AddNoteButton />}
    </section>
  );
};

export default HeadComponent;
