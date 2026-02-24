import { Loader2, Trash2 } from "lucide-react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { deleteNoteById } from "../../../features/notes/NotesAPI";
import toast from "react-hot-toast";
import { useState } from "react";

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
  title,
  createdAt,
  preview,
  loading,
  path,
  id,
  reload,
}: {
  title: string;
  createdAt: string;
  preview: string;
  loading: boolean;
  path: string;
  id: string;
  reload?: (noteId: string) => void;
}) => {
  const [isNoteDeleting, setIsNoteDeleting] = useState(false);
  const { folderName, folderId } = useParams();
  const navigate = useNavigate();
  if (loading) return <NotesDetailsSkeleton />;

  const handleDeleteNoteById = async (e: React.MouseEvent<SVGSVGElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (!folderName || !folderId) return;

    try {
      setIsNoteDeleting(true);
      const res = await deleteNoteById(id);
      navigate(`/${folderName}/${folderId}`);
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
    <NavLink
      to={path}
      className={({ isActive }) =>
        `shadow-lg p-4 rounded-sm group ${isActive ? "dark:shadow-white/10 shadow-black/20 bg-background-700/10" : "bg-background-400  "}`
      }
    >
      <div className="flex justify-between items-center">
        <h3 className="font-medium text-lg">{title}</h3>
        {isNoteDeleting ? (
          <Loader2 size={20} className="hover:text-red-500 animate-spin" />
        ) : (
          <Trash2
            size={20}
            className="hover:text-red-500 hidden group-hover:block"
            onClick={handleDeleteNoteById}
          />
        )}
      </div>
      <div className="py-2 flex gap-2 text-sm">
        <p className="text-background-700/70">{date.toLocaleDateString()}</p>
        <p className="text-background-800 truncate">{preview}</p>
      </div>
    </NavLink>
  );
};

export { NotesDetailsSkeleton };

export default NotesCard;
