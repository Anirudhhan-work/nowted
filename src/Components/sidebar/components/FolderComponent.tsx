import { Folder, FolderOpen, FolderPlus } from "lucide-react";
import TabButton from "./TabButton";
import { useEffect, useState } from "react";
import { getFolders } from "../../../features/folders/folderAPI";
import type { FolderType } from "../../../features/folders/type";
import TabButtonSkeleton from "../../TabButtonSkeleton";
import { useNavigate } from "react-router-dom";

const FolderComponent = () => {
  const [folderList, setFolderList] = useState<FolderType[]>([]);
  const [isFolderLoading, setIsFolderLoading] = useState(false);
  const navigation = useNavigate();

  useEffect(() => {
    const fetchFolders = async () => {
      setIsFolderLoading(true);
      try {
        const { folders } = await getFolders();
        setFolderList(folders);
        navigation(`/folder/${folders[0].id}/${folders[0].name}`);
      } catch (e) {
        console.error("THIS", e); //TODO: handle errors better
      } finally {
        setIsFolderLoading(false);
      }
    };

    fetchFolders();
  }, [navigation]);

  return (
    <section className="py-6">
      <div className="flex justify-between px-5 items-center text-background-800 py-2">
        <h3 className="text-sm font-medium">Folders</h3>
        <FolderPlus size={20} />
      </div>

      <div className="flex flex-col gap-0.5 lg:h-[75%] overflow-y-auto scrollbar py-1">
        {folderList.map((folder) => (
          <TabButton
            path={`folder/${folder.id}/${folder.name}`}
            key={folder.id}
            icon={Folder}
            label={folder.name}
            activeIcon={FolderOpen}
            editable={true}
          />
        ))}
        {isFolderLoading && <TabButtonSkeleton Icon={Folder} />}
      </div>
    </section>
  );
};

export default FolderComponent;
