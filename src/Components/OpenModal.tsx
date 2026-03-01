import { Archive, Loader2, PackageOpen, Star, Trash } from "lucide-react";
import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { NoteContext } from "../context/Notes/NoteContext";
import toast from "react-hot-toast";
import { patchArchivedNote, patchFavNote } from "../features/notes/NotesAPI";

const OpenModal = ({
  handleDelete,
  noteId,
  isFavorite,
  isArchived,
  onClose,
}: {
  handleDelete: () => Promise<void>;
  isFavorite: boolean;
  noteId: string;
  isArchived: boolean;
  onClose: () => void;
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const { folderId, category, folderName } = useParams();
  const [isFav, setIsFav] = useState(isFavorite);
  const [isArchive, setIsArchive] = useState(isArchived);
  const navigate = useNavigate();

  useEffect(() => {
    modalRef.current?.focus();
  }, []);

  const context = useContext(NoteContext);

  if (!context) {
    toast.error("Internal Issue");
    return null;
  }
  const { reRenderMidById, reRenderMidByCategory } = context;

  const fetchPatchFavNote = async () => {
    try {
      const res = await patchFavNote(noteId, !isFav);
      setIsFav((prev) => !prev);
      if (category) await reRenderMidByCategory(category);
      else if (folderId) await reRenderMidById(folderId);

      toast.success(res);
    } catch (e) {
      if (e instanceof Error) {
        toast.error(e.message);
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  const fetchPatchArchivedNote = async () => {
    try {
      const res = await patchArchivedNote(noteId, !isArchive);
      setIsArchive((prev) => !prev);
      if (category) {
        await reRenderMidByCategory(category);
        navigate(`/${category}`);
      }
      if (folderId && folderName) {
        await reRenderMidById(folderId);
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

  return (
    <div
      tabIndex={-1}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
          onClose();
        }
      }}
      ref={modalRef}
      className="absolute right-13 top-22 mt-2 w-60 bg-zinc-200 dark:bg-background-100 rounded-md shadow-lg p-2 z-50"
    >
      <button
        className="modal-item hover:text-color text-background-800"
        onClick={fetchPatchFavNote}
      >
        {isFav ? (
          <>
            <Star size={20} fill="var(--color-color)" />
            <span>Unfavorite</span>
          </>
        ) : (
          <>
            <Star size={20} />
            <span>Add to favorites</span>
          </>
        )}
      </button>
      <button
        className="modal-item hover:text-color text-background-800"
        onClick={fetchPatchArchivedNote}
      >
        {isArchive ? (
          <>
            <PackageOpen size={20} />
            <span>UnArchive</span>
          </>
        ) : (
          <>
            <Archive size={20} />
            <span>Archived</span>
          </>
        )}
      </button>

      <hr className="border-01 border-background-700/10 mt-4 mb-4" />

      <button
        disabled={isDeleting}
        onClick={async () => {
          setIsDeleting(true);
          try {
            await handleDelete();

            if (category) await reRenderMidByCategory(category);
            else if (folderId) await reRenderMidById(folderId);
          } finally {
            setIsDeleting(false);
          }
        }}
        className="modal-item hover:text-red-600"
      >
        {isDeleting ? (
          <Loader2 className="animate-spin text-red-500 " size={20} />
        ) : (
          <Trash size={20} />
        )}
        <span>Delete</span>
      </button>
    </div>
  );
};

export default OpenModal;
