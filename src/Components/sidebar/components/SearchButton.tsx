import { Search } from "lucide-react";

const SearchButton = () => {
  return (
    <div className="relative flex items-center justify-center py-8 text-background-700">
      <Search className="absolute left-8" size={20} />
      <input
        className="outline-none w-[90%] px-12 py-3 bg-background-100 rounded-sm "
        placeholder="Search note"
      />
    </div>
  );
};

export default SearchButton;
