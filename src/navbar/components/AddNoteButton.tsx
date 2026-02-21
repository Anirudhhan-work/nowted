import { Plus } from "lucide-react";

const AddNoteButton = () => {
  return (
    <section className="flex justify-center py-8 px-5">
      <button className="flex gap-5 font-medium text-md justify-center items-center bg-background-500 w-full rounded-xs py-3 cursor-pointer dark:hover:bg-zinc-700/50 hover:bg-zinc-800 transition duration-200">
        <Plus /> New Note
      </button>
    </section>
  );
};

export default AddNoteButton;
