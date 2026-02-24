import { Edit, Trash2 } from "lucide-react";

const OpenModal = ({
  x,
  y,
  handleDelete,
}: {
  x: number;
  y: number;
  handleDelete: () => void;
}) => {
  return (
    <div
      className="w-30  dark:bg-background-100  bg-zinc-200 p-4 absolute rounded-sm"
      style={{ top: `${y}px`, left: `${x}px` }}
    >
      <button className="flex justify-between items-center hover:text-primary">
        <p>Edit</p>
        <Edit size={15} />
      </button>
      <button
        className="flex w-full justify-between items-center hover:text-red-400 cursor-pointer"
        onClick={handleDelete}
      >
        <p>Delete</p>
        <Trash2 size={15} />
      </button>
    </div>
  );
};

export default OpenModal;
