import { Loader2, Trash2 } from "lucide-react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { deleteNoteById } from "../../../features/notes/NotesAPI";
import toast from "react-hot-toast";
import { useState } from "react";
import type { NotesType } from "../../../features/notes/type";

const NotesDetailsSkeleton = () => {
  return (
    <div className="p-4 h-25 bg-background-400 rounded-sm">
      <h3 className="font-medium bg-background-700 w-1/2 h-1/4 rounded-2xl animate-pulse"></h3>
      <div className="pt-4 flex gap-2 text-sm">
        <p className="bg-background-700/70 w-1/3 h-2 rounded-2xl animate-pulse"></p>
        <p className="bg-background-800 w-full h-2 rounded-2xl animate-pulse"></p>
      </div>
    </div>
  );
};

const NotesCard = ({
  note,
  path,
  reload,
}: {
  note: NotesType;
  path: string;
  reload?: (noteId: string) => void;
}) => {
  const [isNoteDeleting, setIsNoteDeleting] = useState(false);
  const { folderName, folderId, category } = useParams();
  const navigate = useNavigate();
  const { id, title, createdAt, preview } = note;

  const handleDeleteNoteById = async () => {
    try {
      setIsNoteDeleting(true);
      const res = await deleteNoteById(id);
      if (folderName || folderId) {
        navigate(`/${folderName}/${folderId}`);
      }
      if (category) {
        navigate(`/${category}`);
      }
      reload?.(id);
      toast.success(res);
    } catch (e) {
      if (e instanceof Error) {
        toast.error(e.message);
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setIsNoteDeleting(false);
    }
  };

  const date = new Date(createdAt);
  return (
    <NavLink to={path}>
      {({ isActive }) => (
        <div
          className={`shadow-lg p-4 rounded-sm group ${
            isActive
              ? "bg-primary text-white shadow-black/20"
              : "bg-background-400 hover:bg-background-500/40"
          }`}
        >
          <div className="flex justify-between items-center">
            <h3 className="font-medium text-lg truncate">{title}</h3>
            {isNoteDeleting ? (
              <Loader2 size={20} className="hover:text-red-500 animate-spin" />
            ) : (
              <div className="flex gap-5 items-center">
                {category !== "deleted" && (
                  <Trash2
                    size={20}
                    className="hover:text-red-500 hidden group-hover:block"
                    onClick={handleDeleteNoteById}
                  />
                )}
              </div>
            )}
          </div>

          <div className="py-2 flex gap-2 text-sm">
            <p
              className={`${isActive ? "text-white/65" : "text-background-700/70"}`}
            >
              {date.toLocaleDateString()}
            </p>
            <p
              className={`truncate ${
                isActive ? "text-white" : "text-background-800"
              }`}
            >
              {preview}
            </p>
          </div>
        </div>
      )}
    </NavLink>
  );
};

export { NotesDetailsSkeleton };

export default NotesCard;
