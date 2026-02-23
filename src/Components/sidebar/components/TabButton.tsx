import type { LucideIcon } from "lucide-react";
import { useRef, useState, type MouseEvent } from "react";
import { NavLink, useParams } from "react-router-dom";
import { renameFolder } from "../../../features/folders/folderAPI";

interface TabButtonProps {
  path: string;
  label: string;
  icon: LucideIcon;
  activeIcon?: LucideIcon;
  editable?: boolean;
}

const TabButton = ({
  path,
  label,
  icon: Icon,
  activeIcon: ActiveIcon,
  editable = false,
}: TabButtonProps) => {
  const [input, setInput] = useState(label);
  const [edit, setEdit] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { folderId } = useParams();

  const handleBlur = async () => {
    if (!folderId) return;

    if (input.trim() === label) return;
    if (input.trim().length === 0) return console.log("dont send empty");
    const res = await renameFolder(folderId, input);
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
  return (
    <NavLink
      to={path}
      onDoubleClick={handleDoubleClick}
      className={({ isActive }) =>
        `tab-btn ${isActive ? "bg-primary rounded-sm text-white" : "hover:bg-background-400 text-background-700"}`
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
            <p>{input}</p>
          )}
        </>
      )}
    </NavLink>
  );
};

export default TabButton;
