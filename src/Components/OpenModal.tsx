import { Archive, ArchiveRestore, Loader2, Star, Trash } from "lucide-react";
import { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { NoteContext } from "../context/Notes/NoteContext";
import toast from "react-hot-toast";

const OpenModal = ({
  handleDelete,
  handleRestore,
  onClose,
}: {
  handleDelete: () => Promise<void>;
  handleRestore: () => Promise<void>;
  onClose: () => void;
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const { folderId, category } = useParams();

  useEffect(() => {
    modalRef.current?.focus();
  }, []);

  const context = useContext(NoteContext);

  if (!context) return toast.error("Internal Issue");
  const { reRenderMidById, reRenderMidByCategory } = context;

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
      <button className="modal-item">
        <Star size={20} />
        <span>Add to favorites</span>
      </button>
      <button className="modal-item">
        <Archive size={20} />
        <span>Archived</span>
      </button>
      <hr className="border-01 border-background-700/10 mt-4 mb-4" />
      {folderId ||
        (category !== "deleted" && (
          <button
            onClick={async () => {
              setIsDeleting(true);
              await handleDelete();
              if (category) await reRenderMidByCategory(category);
              if (folderId) await reRenderMidById(folderId);
              setIsDeleting(false);
            }}
            className="modal-item hover:text-red-600"
          >
            {isDeleting ? (
              <Loader2 className="animate-spin text-red-500" size={20} />
            ) : (
              <Trash size={20} />
            )}
            <span>Delete</span>
          </button>
        ))}
      {category === "deleted" && (
        <button
          onClick={async () => {
            setIsDeleting(true);
            await handleRestore();
            await reRenderMidByCategory(category);
            setIsDeleting(false);
          }}
          className="modal-item hover:text-red-600"
        >
          {isDeleting ? (
            <Loader2 className="animate-spin text-red-500" size={20} />
          ) : (
            <ArchiveRestore size={20} />
          )}
          <span>Resotre</span>
        </button>
      )}
    </div>
  );
};

export default OpenModal;
