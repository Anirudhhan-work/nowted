import { Folder, FolderOpen, FolderPlus } from "lucide-react";
import TabButton from "./TabButton";
import { useEffect, useState } from "react";
import { getFolders } from "../../features/folders/folderAPI";
import type { FolderType } from "../../features/folders/type";
import TabButtonSkeleton from "../../Components/TabButtonSkeleton";

const FolderComponent = () => {
  const [folderList, setFolderList] = useState<FolderType[]>([]);
  const [isFolderLoading, setIsFolderLoading] = useState(false);

  useEffect(() => {
    const fetchFolders = async () => {
      setIsFolderLoading(true);
      try {
        const { folders } = await getFolders();
        setFolderList(folders);
      } catch (e) {
        console.error("THIS", e); //TODO: handle errors better
      } finally {
        setIsFolderLoading(false);
      }
    };

    fetchFolders();
  }, []);

  return (
    <section className="py-6">
      <div className="flex justify-between px-5 items-center text-background-800">
        <h3 className="text-sm font-medium">Folders</h3>
        <FolderPlus size={20} />
      </div>

      <div className="flex flex-col gap-0.5 py-2">
        <TabButton icon={FolderOpen} label={"Personal"} />
        {folderList.map((folder) => (
          <TabButton key={folder.id} icon={Folder} label={folder.name} />
        ))}
        {isFolderLoading && <TabButtonSkeleton Icon={Folder} />}
      </div>
    </section>
  );
};

export default FolderComponent;
