import { Folder, FolderOpen, FolderPlus } from "lucide-react";
import TabButton from "./TabButton";
import { useEffect, useState } from "react";
import { createFolder, getFolders } from "../../../features/folders/folderAPI";
import type { FolderType } from "../../../features/folders/type";
import TabButtonSkeleton from "../../TabButtonSkeleton";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const FolderComponent = () => {
  const [folderList, setFolderList] = useState<FolderType[]>([]);
  const [isFolderLoading, setIsFolderLoading] = useState(false);
  const navigation = useNavigate();

  const fetchFolders = async () => {
    setIsFolderLoading(true);
    try {
      const { folders } = await getFolders();
      setFolderList(folders);
      if (folders[0].name && folders[0].id) {
        navigation(`/${folders[0].name}/${folders[0].id}`);
      }
    } catch (e) {
      if (e instanceof Error) {
        toast.error(e.message);
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setIsFolderLoading(false);
    }
  };

  useEffect(() => {
    fetchFolders();
  }, []);

  const handleCreateFolder = async () => {
    try {
      const res = await createFolder("Untitled0");
      toast.success(res);
      await fetchFolders();
      fetchFolders();
    } catch (e) {
      if (e instanceof Error) {
        toast.error(e.message);
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <section className="py-6">
      <div className="flex justify-between px-5 items-center text-background-800 py-2">
        <h3 className="text-sm font-medium">Folders</h3>
        <FolderPlus
          size={20}
          onClick={() => handleCreateFolder()}
          className="cursor-pointer"
        />
      </div>

      <div className="flex flex-col gap-0.5 lg:h-52 overflow-y-auto scrollbar py-1">
        {folderList.map((folder) => (
          <TabButton
            path={`${folder.name}/${folder.id}`}
            key={folder.id}
            icon={Folder}
            label={folder.name}
            activeIcon={FolderOpen}
            editable={true}
            reloadData={fetchFolders}
          />
        ))}
        {isFolderLoading && <TabButtonSkeleton Icon={Folder} />}
      </div>
    </section>
  );
};

export default FolderComponent;
