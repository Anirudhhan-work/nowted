import { CalendarDays, Ellipsis, Folder } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import {
  deleteNoteById,
  getNoteById,
  restoreNote,
} from "../../features/notes/NotesAPI";
import { type NotesType } from "../../features/notes/type";
import OpenModal from "../OpenModal";

const NotesComponent = () => {
  const { folderName, folderId, noteId, category } = useParams();
  const [singleNote, setSingleNote] = useState<NotesType>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSingeNote = async () => {
      if (!noteId) return toast.error("Something went wrong");
      try {
        const { note } = await getNoteById(noteId);
        setSingleNote(note);
      } catch (e) {
        if (e instanceof Error) {
          console.log(e.message);
        } else {
          toast.error("Something went wrong");
        }
      }
    };

    fetchSingeNote();
  }, [noteId]);

  const deleteNote = async () => {
    if (!noteId) return;
    try {
      const res = await deleteNoteById(noteId);
      if (folderId && folderName) {
        navigate(`/${folderName}/${folderId}`);
      }

      toast.success(res);
    } catch (e) {
      if (e instanceof Error) {
        toast.error(e.message);
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  const fetchRestoreNote = async () => {
    if (!noteId) return;

    try {
      const res = await restoreNote(noteId);
      toast.success(res);
      if (category) {
        navigate(`/${category}`);
      }
    } catch (e) {
      if (e instanceof Error) {
        toast.error(e.message);
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <section className="p-12 w-full overflow-y-auto scrollbar">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-medium">{singleNote?.title}</h1>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsModalOpen((prev) => !prev);
          }}
          className="p-1 border rounded-full border-background-700 text-background-700 cursor-pointer"
        >
          <Ellipsis />
        </button>

        {isModalOpen && (
          <OpenModal
            handleDelete={deleteNote}
            handleRestore={fetchRestoreNote}
            onClose={() => setIsModalOpen(false)}
          />
        )}
      </div>
      <div className="flex items-center gap-20 pt-10 pb-4">
        <div className="text-background-700 flex items-center gap-5">
          <CalendarDays size={20} />
          <h3 className="text-xs font-semibold tracking-wider">Date</h3>
        </div>
        <p className="text-white text-sm font-medium underline ">
          {singleNote?.createdAt.slice(0, 10)}
        </p>
      </div>
      <hr className="border-0.1 border-background-700/40" />
      <div className="flex items-center gap-18 pb-10 pt-4">
        <div className="text-background-700 flex items-center gap-5">
          <Folder size={20} />
          <h3 className="text-xs font-semibold tracking-wider">Folder</h3>
        </div>
        <p className="text-white text-sm font-medium underline">
          {singleNote?.folder.name}
        </p>
      </div>
      <p>{singleNote?.content}</p>
      <div className="relative"></div>
    </section>
  );
};

export default NotesComponent;
