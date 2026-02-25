import { Plus } from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { createNote } from "../../../features/notes/NotesAPI";
import { NoteContext } from "../../../context/Notes/NoteContext";
import { useContext, useState } from "react";

const AddNoteButton = () => {
  const { folderId, folderName } = useParams();
  const [isNoteAdding, setIsNoteAdding] = useState(false);
  const navigate = useNavigate();
  const context = useContext(NoteContext);
  if (!context) return toast.error("Some issue with the Note context");
  const { reRenderMidById } = context;

  const fetchCreateNote = async () => {
    if (!folderId || !folderName) return toast.error("Please select a folder");
    setIsNoteAdding(true);

    try {
      const res = await createNote(folderId, "", "", false, false);
      reRenderMidById(folderId);
      await navigate(`${folderName}/${folderId}/note/${res.id}`);
      toast.success("Note Created Successfully");
    } catch (e) {
      if (e instanceof Error) toast.error(e.message);
      else toast.error("Something went wrong");
    } finally {
      setIsNoteAdding(false);
    }
  };

  return (
    <section className="flex justify-center py-8 px-5 text-white">
      <button
        onClick={fetchCreateNote}
        className={`add-btn ${isNoteAdding && "animate-pulse"}`}
      >
        <Plus /> New Note
      </button>
    </section>
  );
};

export default AddNoteButton;
