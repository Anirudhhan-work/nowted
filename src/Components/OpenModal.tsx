import { Archive, Star, Trash } from "lucide-react";
import { useEffect, useRef } from "react";

const OpenModal = ({
  handleDelete,
  onClose,
}: {
  handleDelete: () => void;
  onClose: () => void;
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  return (
    <div
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
      <button onClick={handleDelete} className="modal-item">
        <Trash size={20} />
        <span>Delete</span>
      </button>
    </div>
  );
};

export default OpenModal;
