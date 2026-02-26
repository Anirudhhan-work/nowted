import { useContext, useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import NotesCard from "./NotesCard";
import toast from "react-hot-toast";
import { NoteContext } from "../../../context/Notes/NoteContext";

const NotesDetails = () => {
  const { folderId, folderName, category } = useParams();
  const [isNoteLoading, setIsNoteLoading] = useState(false);

  const context = useContext(NoteContext);
  if (!context) return toast.error("Some issue with the Note context");
  const { notesList, totalNotes, reRenderMidById, reRenderMidByCategory } =
    context;

  const getNotesById = async (folderId: string) => {
    if (!context) return;

    setIsNoteLoading(true);
    await reRenderMidById(folderId);
    setIsNoteLoading(false);
  };

  const getNotesByCategory = async (category: string) => {
    if (!context) return;

    setIsNoteLoading(true);
    await reRenderMidByCategory(category);
    setIsNoteLoading(false);
  };

  /* eslint-disable react-hooks/rules-of-hooks */
  useEffect(() => {
    if (category) getNotesByCategory(category);
    if (folderId) getNotesById(folderId);
  }, [folderId, category]);

  return (
    <section className="p-6 min-h-screen bg-background-100">
      <h1 className="text-xl font-medium flex items-end justify-between">
        {folderName ||
          (category === "favorite" && "Favorite Notes") ||
          (category === "deleted" && "Trashed Notes") ||
          (category === "archived" && "Archived Notes")}
        <span className="text-xs text-gray-500">{totalNotes} Notes</span>
      </h1>
      <div className="py-8 flex flex-col gap-6">
        {notesList.length > 0 ? (
          notesList.map((note) => (
            <NotesCard
              key={note.id}
              note={note}
              path={`note/${note.id}`}
              loading={isNoteLoading}
              reload={() =>
                (folderId && reRenderMidById(folderId)) ||
                (category && reRenderMidByCategory(category))
              }
            />
          ))
        ) : (
          <div className="h-10 flex justify-center items-center ">
            <p className="text-sm text-background-700">Nothing to show</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default NotesDetails;
