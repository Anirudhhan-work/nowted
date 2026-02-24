import type { LucideIcon } from "lucide-react";
import { useRef, useState, type MouseEvent } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import {
  deleteFolder,
  renameFolder,
} from "../../../features/folders/folderAPI";
import OpenModal from "../../OpenModal";

interface TabButtonProps {
  path: string;
  label: string;
  icon: LucideIcon;
  activeIcon?: LucideIcon;
  editable?: boolean;
  reloadData?: () => void;
}

const TabButton = ({
  path,
  label,
  icon: Icon,
  activeIcon: ActiveIcon,
  editable = false,
  reloadData,
}: TabButtonProps) => {
  const [input, setInput] = useState(label);
  const [edit, setEdit] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { folderId } = useParams();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [xy, setXy] = useState([0, 0]);

  const handleBlur = async () => {
    if (!folderId) return;

    if (input.trim() === label) return;
    if (input.trim().length === 0) return console.log("dont send empty");
    const res = await renameFolder(folderId, input); //TODO: handle try catch and toast
    navigate(`/folder/${folderId}/${input}`);
    console.log(res);
    setEdit(false);
  };

  const handleDoubleClick = (e: MouseEvent) => {
    e.preventDefault();
    setEdit(true);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  const handleDeleteFolder = async () => {
    if (!folderId) return console.log("invalid folder id"); //TODO: ADD toast and try catch
    const res = await deleteFolder(folderId);
    reloadData?.();
    console.log(res);
  };

  const setModal = (e: MouseEvent) => {
    e.preventDefault();
    setXy([e.pageX, e.pageY]);
    setIsModalOpen(true);
  };
  return (
    <NavLink
      to={path}
      onDoubleClick={handleDoubleClick}
      className={({ isActive }) =>
        `tab-btn ${isActive ? "bg-primary rounded-sm text-white" : "hover:bg-background-400 text-background-700"}`
      }
      onContextMenu={(e) => {
        setModal(e);
      }}
    >
      {({ isActive }) => (
        <>
          {isModalOpen && (
            <OpenModal x={xy[0]} y={xy[1]} handleDelete={handleDeleteFolder} />
          )}
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
            <p>{input}</p>
          )}
        </>
      )}
    </NavLink>
  );
};

export default TabButton;
