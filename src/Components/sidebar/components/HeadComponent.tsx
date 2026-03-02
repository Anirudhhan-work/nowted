import { Search } from "lucide-react";
import logo from "../../../assets/nowtedlogo.svg";
import { useState } from "react";
import AddNoteButton from "./AddNoteButton";
import SearchBar from "./SearchBar";
import { useParams } from "react-router-dom";
const HeadComponent = () => {
  const { category } = useParams();
  const [showSearchBar, setShowSearchBar] = useState(category === "s");

  return (
    <section>
      <div
        className={`flex justify-between items-center dark:invert-0 invert-75 px-5`}
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
