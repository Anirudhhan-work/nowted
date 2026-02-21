import FolderComponent from "../navbar/components/FolderComponent";
import RecentComponent from "../navbar/components/RecentComponent";
import MoreComponent from "../navbar/components/MoreComponent";
import AddNoteButton from "../navbar/components/AddNoteButton";
import HeadComponent from "../navbar/components/HeadComponent";
import DarkModeComponent from "../navbar/components/DarkModeComponent";

const SideBar = () => {
  return (
    <nav className="py-8 h-full flex flex-col">
      <HeadComponent />
      <AddNoteButton />
      <RecentComponent />
      <FolderComponent />
      <MoreComponent />
      <DarkModeComponent />
    </nav>
  );
};

export default SideBar;
