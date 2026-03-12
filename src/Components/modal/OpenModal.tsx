import { Archive, Loader2, PackageOpen, Star, Trash } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { patchNote } from "../../features/notes/NotesAPI";
import ConfirmationModal from "./ConfirmationModal";
import { useNotes } from "../../utils/hooks";

const OpenModal = ({
  handleDelete,
  noteId,
  isFavorite,
  isArchived,
  onClose,
  folderName,
  folderId,
}: {
  handleDelete: () => Promise<void>;
  isFavorite: boolean;
  noteId: string;
  folderId: string;
  folderName: string;
  isArchived: boolean;
  onClose: () => void;
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const { category } = useParams();
  const [isFav, setIsFav] = useState(isFavorite);
  const [isArchive, setIsArchive] = useState(isArchived);
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    modalRef.current?.focus();
  }, []);

  const confirmDelete = async () => {
    setIsDeleting(true);
    try {
      await handleDelete();

      if (category) await reRenderMidByCategory(category);
      else if (folderId) await reRenderMidById(folderId);
    } catch (e) {
      if (e instanceof Error) toast.error(e.message);
      else toast.error("Something went wrong");
    } finally {
      setIsDeleting(false);
    }
  };

  const { reRenderMidById, reRenderMidByCategory } = useNotes();

  const fetchPatchFavNote = async () => {
    try {
      await patchNote(noteId, { isFavorite: !isFav });
      setIsFav((prev) => !prev);
      if (category === "favorite") {
        await reRenderMidByCategory(category);
        if (category) navigate(`/${category}`);
      }
      toast.success(`Note marked as ${isFav ? "unfavorite" : "Favorite"}`);
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
      await patchNote(noteId, { isArchived: !isArchive });
      setIsArchive((prev) => !prev);
      if (category === "archived") {
        navigate(`/${folderName}/${folderId}/note/${noteId}`);
      } else if (category) {
        await reRenderMidByCategory(category);
        navigate(`/${category}`);
      } else if (folderId && folderName) {
        await reRenderMidById(folderId);
        navigate(`/${folderName}/${folderId}`);
      }
      toast.success(
        `Note ${isArchived ? "Unarchived" : "Archived"} successfully`,
      );
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
        className="modal-item hover:text-color hover:bg-background/80 text-background-800"
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
        className="modal-item hover:text-color hover:bg-background/80 text-background-800"
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
        onClick={() => setShowDeleteModal(true)}
        className="modal-item hover:text-red-600"
      >
        {isDeleting ? (
          <Loader2 className="animate-spin text-red-500 " size={20} />
        ) : (
          <Trash size={20} />
        )}
        <span>Delete</span>
      </button>
      {showDeleteModal && (
        <ConfirmationModal
          message="Are you sure you want to delete this note?"
          onConfirm={() => {
            setShowDeleteModal(false);
            confirmDelete();
          }}
          onCancel={() => setShowDeleteModal(false)}
          type="Note"
        />
      )}
    </div>
  );
};

export default OpenModal;
