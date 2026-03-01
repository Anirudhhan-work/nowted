import { Search } from "lucide-react";
import logo from "../../../assets/nowtedlogo.svg";
import { ThemeContext } from "../../../context/theme/ThemeContext";
import { useContext, useState } from "react";
import AddNoteButton from "./AddNoteButton";
import SearchBar from "./SearchBar";
import toast from "react-hot-toast";
const HeadComponent = () => {
  const [showSearchBar, setShowSearchBar] = useState(false);
  const context = useContext(ThemeContext);
  if (!context) {
    toast.error("Some issue with the Theme context");
    return null;
  }
  const { darkMode } = context;

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
