import { Folder, FolderOpen, FolderPlus } from "lucide-react";
import TabButton from "./TabButton";

const FolderComponent = () => {
  return (
    <section className="py-6">
      <div className="flex justify-between px-5 items-center text-background-800">
        <h3 className="text-sm font-medium">Folders</h3>
        <FolderPlus size={20} />
      </div>
      <div className="flex flex-col gap-2 py-2">
        <TabButton icon={FolderOpen} label={"Folder Name"} />
        <TabButton icon={Folder} label={"Folder Name"} />
        <TabButton icon={Folder} label={"Folder Name"} />
        <TabButton icon={Folder} label={"Folder Name"} />
        <TabButton icon={Folder} label={"Folder Name"} />
      </div>
    </section>
  );
};

export default FolderComponent;
