import { Search } from "lucide-react";
import { useState, type ChangeEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDebounce } from "../../../utils/hooks";

const SearchBar = () => {
  const [searchInput, setSearchInput] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const handleSearch = useDebounce((e: ChangeEvent<HTMLInputElement>) => {
    const search = e.target.value;

    const params = new URLSearchParams(location.search);

    if (search) {
      params.set("search", search);
    } else {
      params.delete("search");
      navigate("/");
      return;
    }

    navigate(`/s?${params}`);
  }, 500);

  return (
    <div className="relative flex items-center justify-center py-8 text-background-700">
      <Search className="absolute left-8" size={20} />
      <input
        value={searchInput}
        onChange={(e) => {
          setSearchInput(e.target.value);
          handleSearch(e);
        }}
        className="outline-none w-[90%] px-12 py-3 bg-background-100 rounded-sm "
        placeholder="Search note"
      />
    </div>
  );
};

export default SearchBar;
