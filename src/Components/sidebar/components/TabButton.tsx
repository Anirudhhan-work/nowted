import { Loader2, Trash2, type LucideIcon } from "lucide-react";
import { useRef, useState, type MouseEvent } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  deleteFolder,
  renameFolder,
} from "../../../features/folders/folderAPI";
import toast from "react-hot-toast";

interface TabButtonProps {
  path: string;
  label: string;
  icon: LucideIcon;
  activeIcon?: LucideIcon;
  editable?: boolean;
  reloadData?: () => void;
  folderId?: string;
}

const TabButton = ({
  path,
  label,
  icon: Icon,
  activeIcon: ActiveIcon,
  editable = false,
  reloadData,
  folderId,
}: TabButtonProps) => {
  const [input, setInput] = useState(label);
  const [edit, setEdit] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleBlur = async () => {
    if (!folderId) {
      setEdit(false);
      return;
    }

    if (input.trim() === label || input.trim().length === 0) {
      setInput(label);
      setEdit(false);
      return;
    }
    try {
      const res = await renameFolder(folderId, input.trim());
      toast.success(res);
      navigate(`/${encodeURIComponent(input.trim())}/${folderId}`);
    } catch (e) {
      if (e instanceof Error) {
        toast.error(e.message);
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setEdit(false);
    }
  };

  const handleDoubleClick = (e: MouseEvent) => {
    e.preventDefault();
    setEdit(true);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  const handleDeleteFolder = async () => {
    if (!folderId) return toast.error("Invalid Folder Id");
    setIsDeleting(true);
    try {
      const res = await deleteFolder(folderId);
      toast.success(res);
      reloadData?.();
    } catch (e) {
      if (e instanceof Error) {
        toast.error(e.message);
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <NavLink
      to={path}
      onDoubleClick={handleDoubleClick}
      className={({ isActive }) =>
        `tab-btn group ${isActive ? "bg-primary rounded-sm text-white" : "hover:bg-background-400 text-background-700"}`
      }
    >
      {({ isActive }) => (
        <>
          {isActive && ActiveIcon ? (
            <ActiveIcon size={20} />
          ) : (
            <Icon size={20} />
          )}
          {editable && edit ? (
            <input
              type="text"
              value={input}
              ref={inputRef}
              className="outline-none bg-transparent w-full"
              onBlur={() => handleBlur()}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  inputRef.current?.blur();
                }
              }}
              onChange={(e) => setInput(e.target.value)}
            />
          ) : (
            <span className="flex justify-between w-full items-center">
              <p className="truncate">{input}</p>
              {editable && !isDeleting && (
                <Trash2
                  size={17}
                  className="group-hover:block hover:text-red-500 hidden"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleDeleteFolder();
                  }}
                />
              )}
              {isDeleting && (
                <Loader2 size={20} className="animate-spin text-red-500" />
              )}
            </span>
          )}
        </>
      )}
    </NavLink>
  );
};

export default TabButton;
