import { CalendarDays, Ellipsis, Folder, Loader2 } from "lucide-react";
import { useContext, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import {
  deleteNoteById,
  getNoteById,
  patchNote,
  restoreNote,
} from "../../features/notes/NotesAPI";
import { type NotesType } from "../../features/notes/type";
import OpenModal from "../modal/OpenModal";
import RestoreComponent from "./components/RestoreComponent";
import { useDebounce } from "../../utils/hooks";
import { NoteContext } from "../../context/Notes/NoteContext";
import ConfirmationModal from "../modal/ConfirmationModal";

const NotesComponent = () => {
  const { noteId, category, folderId } = useParams();
  const [singleNote, setSingleNote] = useState<NotesType>();
  const [newFolderID, setNewFolderID] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showMoveModal, setShowMoveModal] = useState(false);
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
        if (!note.title) {
          titleRef.current?.focus();
        }
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

  const handleContentChange = useDebounce(
    async (title: string, content: string) => {
      if (!noteId) return;

      setSaving(true);
      try {
        await patchNote(noteId, { title: title, content: content });
        if (folderId) reRenderMidById(folderId);
        else if (category) reRenderMidByCategory(category);
      } catch (e) {
        if (e instanceof Error) {
          toast.error(e.message);
        } else {
          toast.error("Something went wrong");
        }
      } finally {
        setSaving(false);
      }
    },
    600,
  );

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
      setSingleNote((prev) => ({ ...prev!, deletedAt: "" }));
      if (folderId) await reRenderMidById(folderId);
      else if (category === "deleted") {
        navigate(
          `/${singleNote?.folder.name}/${singleNote?.folderId}/note/${noteId}`,
        );
      } else if (category) {
        await reRenderMidByCategory(category);
      }
    } catch (e) {
      if (e instanceof Error) {
        toast.error(e.message);
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  const handleFolderChange = async (newFolderId: string) => {
    if (!noteId) return;
    const selectedFolder = folderList.find(
      (folder) => folder.id === newFolderId,
    );

    try {
      await patchNote(noteId, { folderId: newFolderId });
      toast.success("Folder Changed Successfully");
      setSingleNote((prev) => ({
        ...prev!,
        folder: { ...prev!.folder, id: newFolderId },
      }));
      navigate(`/${selectedFolder?.name}/${newFolderId}/note/${noteId}`);
    } catch (e) {
      if (e instanceof Error) {
        toast.error(e.message);
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  const context = useContext(NoteContext);

  if (!context) {
    toast.error("Internal Issue");
    return null;
  }
  const { reRenderMidById, reRenderMidByCategory, folderList } = context;

  if (singleNote === undefined || !noteId) return null;

  if (category === "deleted" || showRestore || singleNote.deletedAt)
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
          className="text-3xl font-medium outline-none w-[90%]"
          value={singleNote.title}
          onChange={(e) => {
            if (e.target.value.trim().length > 80) {
              toast.error("Title Should not be more than 80 character");
              return;
            }
            setSingleNote((prev) => ({ ...prev!, title: e.target.value }));
            handleContentChange(e.target.value.trim(), singleNote.content);
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
            folderId={singleNote.folderId}
            folderName={singleNote.folder.name}
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
        <p className="text-sm font-medium underline text-color">
          {singleNote.createdAt.slice(0, 10)}
        </p>
      </div>
      <hr className="border-0.1 border-background-700/40" />
      <div className="flex items-center gap-18 pb-10 pt-4">
        <div className="text-background-700 flex items-center gap-5">
          <Folder size={20} />
          <h3 className="text-xs font-semibold tracking-wider">Folder</h3>
        </div>
        <select
          disabled={category === "archived"}
          className="h-10 text-sm font-medium underline outline-none cursor-pointer bg-background text-color"
          value={singleNote.folder.id}
          onChange={(e) => {
            setShowMoveModal(true);
            setNewFolderID(e.target.value);
          }}
        >
          {folderList?.map((folder) => (
            <option key={folder.id} value={folder.id} className="bg-background">
              {folder.name.slice(0, 20)}
            </option>
          ))}
        </select>
      </div>
      <textarea
        className="w-full outline-none resize-none h-[calc(100vh-32%)]"
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
      {showMoveModal && (
        <ConfirmationModal
          message="Are you sure you want to move this note to another folder?"
          onConfirm={() => {
            setShowMoveModal(false);
            handleFolderChange(newFolderID);
          }}
          onCancel={() => setShowMoveModal(false)}
          type="Move"
        />
      )}
    </section>
  );
};

export default NotesComponent;
