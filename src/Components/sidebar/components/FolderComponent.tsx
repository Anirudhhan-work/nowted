import { Folder, FolderOpen, FolderPlus } from "lucide-react";
import TabButton from "./TabButton";
import { useCallback, useContext, useEffect, useState } from "react";
import { createFolder, getFolders } from "../../../features/folders/folderAPI";
import TabButtonSkeleton from "../../skeleton/TabButtonSkeleton";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { NoteContext } from "../../../context/Notes/NoteContext";

const FolderComponent = () => {
  const [isFolderLoading, setIsFolderLoading] = useState(false);
  const [isCreatingFolder, setIsCreatingFolder] = useState(false);
  const navigation = useNavigate();
  const { folderName, category } = useParams();

  const context = useContext(NoteContext);

  if (!context) {
    toast.error("Internal Issue");
    return null;
  }

  const { folderList, setFolderListState } = context;

  /* eslint-disable react-hooks/rules-of-hooks */
  const fetchFolders = useCallback(async () => {
    setIsFolderLoading(true);
    try {
      const { folders } = await getFolders();
      setFolderListState(folders);
    } catch (e) {
      if (e instanceof Error) {
        toast.error(e.message);
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setIsFolderLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFolders();
  }, [fetchFolders]);

  useEffect(() => {
    if (!folderList?.length) return;

    const firstFolder = folderList[0];

    if (
      !folderName &&
      !(
        category === "favorite" ||
        category === "deleted" ||
        category === "archived" ||
        category === "s"
      )
    ) {
      navigation(`/${firstFolder.name}/${firstFolder.id}`);
    }
  }, [folderList, folderName, category, navigation]);

  const handleCreateFolder = async () => {
    if (isCreatingFolder) return;
    setIsCreatingFolder(true);

    try {
      const res = await createFolder("Untitled");
      toast.success(res);
      await fetchFolders();
    } catch (e) {
      if (e instanceof Error) {
        toast.error(e.message);
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setIsCreatingFolder(false);
    }
  };

  return (
    <section className="py-4 min-h-0 flex flex-col">
      <div className="flex justify-between px-5 items-center text-background-800 py-2">
        <h3 className="text-sm font-medium">Folders</h3>
        <FolderPlus
          size={20}
          onClick={() => handleCreateFolder()}
          className="cursor-pointer"
        />
      </div>

      <div className="flex flex-col gap-0.5 min-h-0 overflow-y-auto scrollbar py-1">
        {folderList?.map((folder) => (
          <TabButton
            path={`/${encodeURIComponent(folder.name)}/${folder.id}`}
            key={folder.id}
            icon={Folder}
            label={folder.name}
            activeIcon={FolderOpen}
            editable={true}
            reloadData={fetchFolders}
            folderId={folder.id}
          />
        ))}
        {isFolderLoading && (
          <>
            <TabButtonSkeleton Icon={Folder} />
            <TabButtonSkeleton Icon={Folder} />
            <TabButtonSkeleton Icon={Folder} />
          </>
        )}
      </div>
    </section>
  );
};

export default FolderComponent;
