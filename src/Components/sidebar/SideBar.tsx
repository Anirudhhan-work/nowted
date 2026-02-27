import DarkModeComponent from "./components/DarkModeComponent";
import FolderComponent from "./components/FolderComponent";
import HeadComponent from "./components/HeadComponent";
import MoreComponent from "./components/MoreComponent";
import RecentComponent from "./components/RecentComponent";

const SideBar = () => {
  return (
    <nav className="py-8 h-full flex flex-col">
      <HeadComponent />
      <RecentComponent />
      <FolderComponent />
      <MoreComponent />
      <DarkModeComponent />
    </nav>
  );
};

export default SideBar;
