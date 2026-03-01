import { Search } from "lucide-react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDebounce } from "../../../utils/hooks";

const SearchBar = () => {
  const [searchInput, setSearchInput] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const handleSearch = useDebounce((searchValue: string) => {
    const params = new URLSearchParams(location.search);

    if (searchValue.trim()) {
      params.set("search", searchValue);
      navigate(`/s?${params}`);
    } else {
      params.delete("search");
      navigate("/");
    }
  }, 500);

  return (
    <div className="relative flex items-center justify-center py-8 text-background-700">
      <Search className="absolute left-8" size={20} />
      <input
        value={searchInput}
        onChange={(e) => {
          setSearchInput(e.target.value);
          handleSearch(e.target.value);
        }}
        className="outline-none w-[90%] px-12 py-3 bg-background-100 rounded-sm "
        placeholder="Search note"
      />
    </div>
  );
};

export default SearchBar;
