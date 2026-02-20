import { Search } from "lucide-react";
import logo from "../assets/nowtedlogo.svg";
import FolderComponent from "../navbar/components/FolderComponent";
import RecentComponent from "../navbar/components/RecentComponent";
import MoreComponent from "../navbar/components/MoreComponent";
import AddNoteButton from "../navbar/components/AddNoteButton";
import DarkMode from "../navbar/components/DarkMode";

const SideBar = () => {
  return (
    <nav className="bg-dark w-[18%] py-8 h-screen flex flex-col">
      <section className="flex justify-between items-center px-5">
        <img src={logo} alt="nowted logo" />
        <Search className="text-gray-400" />
      </section>
      <AddNoteButton />
      <RecentComponent />
      <FolderComponent />
      <MoreComponent />
      <DarkMode />
    </nav>
  );
};

export default SideBar;
