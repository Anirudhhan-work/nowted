import { CalendarDays, Ellipsis, Folder, Loader2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import {
  deleteNoteById,
  getNoteById,
  patchNote,
  restoreNote,
} from "../../features/notes/NotesAPI";
import { type NotesType } from "../../features/notes/type";
import OpenModal from "../OpenModal";
import RestoreComponent from "./components/RestoreComponent";
import { useDebounce } from "../../utils/Debounce";

const NotesComponent = () => {
  const { noteId, category } = useParams();
  const [singleNote, setSingleNote] = useState<NotesType>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showRestore, setShowRestore] = useState(false);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();
  const titleRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchSingeNote = async () => {
      if (!noteId) return toast.error("Something went wrong");
      try {
        const { note } = await getNoteById(noteId);
        setShowRestore(false);
        setSingleNote(note);
      } catch (e) {
        if (e instanceof Error) {
          toast.error(e.message);
        } else {
          toast.error("Something went wrong");
        }
      }
    };

    fetchSingeNote();
  }, [noteId]);

  // const handleContentChange = useDebounce((value: string) => {
  //   console.log("Test wokringn ");
  //   setSingleNote((prev) => ({ ...prev!, content: value }));

  //   toast.success("Updating");
  // }, 1000);

  const handleContentChange = useDebounce(async (title, content) => {
    setSaving(true);
    try {
      await patchNote(noteId!, title, content);
      // toast.success("saving...");
    } catch (e) {
      if (e instanceof Error) {
        toast.error(e.message);
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setSaving(false);
    }
  }, 500);

  const deleteNote = async () => {
    if (!noteId) return;
    try {
      await deleteNoteById(noteId);

      setShowRestore(true);
      toast.success("Note Deleted Successfully");
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
      await restoreNote(noteId);
      setShowRestore(false);
      toast.success("Note Restored Successfully");
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
  if (singleNote === undefined || !noteId) return;

  if (category === "deleted" || showRestore)
    return (
      <RestoreComponent
        title={singleNote.title || "Untitled Note"}
        handleRestore={fetchRestoreNote}
        folderName={singleNote.folder.name || ""}
      />
    );
  return (
    <section className="p-12 pb-0 w-full overflow-y-auto scrollbar h-screen">
      <div className="flex justify-between items-center">
        <input
          type="text"
          ref={titleRef}
          className="text-3xl font-medium outline-none"
          value={singleNote.title}
          onChange={(e) => {
            setSingleNote((prev) => ({ ...prev!, title: e.target.value }));
            handleContentChange(e.target.value, singleNote.title);
          }}
        />
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
            isFavorite={singleNote.isFavorite}
            noteId={noteId}
            isArchived={singleNote.isArchived}
            handleDelete={deleteNote}
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
          {singleNote.createdAt.slice(0, 10)}
        </p>
      </div>
      <hr className="border-0.1 border-background-700/40" />
      <div className="flex items-center gap-18 pb-10 pt-4">
        <div className="text-background-700 flex items-center gap-5">
          <Folder size={20} />
          <h3 className="text-xs font-semibold tracking-wider">Folder</h3>
        </div>
        <p className="text-white text-sm font-medium underline">
          {singleNote.folder.name}
        </p>
      </div>
      <textarea
        className="w-full outline-none resize-none h-[calc(100vh-30%)]"
        value={singleNote.content}
        onChange={(e) => {
          setSingleNote((prev) => ({ ...prev!, content: e.target.value }));
          handleContentChange(singleNote.title, e.target.value);
        }}
      />
      <div className="relative"></div>
      {saving && (
        <div className="absolute top-215 right-10 flex items-center gap-2 text-background-700">
          <Loader2 size={15} className="animate-spin" />
          saving..
        </div>
      )}
    </section>
  );
};

export default NotesComponent;
