import { useContext, useEffect, useState } from "react";

import { useParams, useSearchParams } from "react-router-dom";
import NotesCard, { NotesDetailsSkeleton } from "./NotesCard";
import toast from "react-hot-toast";
import { NoteContext } from "../../../context/Notes/NoteContext";

const NotesDetails = () => {
  const { folderId, folderName, category } = useParams();
  const [isNoteLoading, setIsNoteLoading] = useState(false);
  const [searhParams] = useSearchParams();
  const search = searhParams.get("search") || "";

  const context = useContext(NoteContext);
  if (!context) return toast.error("Some issue with the Note context");
  const {
    notesList,
    totalNotes,
    reRenderMidById,
    reRenderMidByCategory,
    reRenderBySearch,
  } = context;

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
    if (search) reRenderBySearch(search);
    else if (category) getNotesByCategory(category);
    else if (folderId) getNotesById(folderId);
  }, [folderId, category, search]);

  return (
    <section className="p-6 min-h-screen w-full bg-background-100">
      <h1 className="text-xl font-medium flex items-end justify-between">
        {folderName ||
          (category === "favorite" && "Favorite Notes") ||
          (category === "deleted" && "Trashed Notes") ||
          (category === "archived" && "Archived Notes") ||
          (category === "s" && "Searched Notes")}
        <span className="text-xs text-gray-500">{totalNotes} Notes</span>
      </h1>
      <div className="py-8 flex flex-col gap-6">
        {isNoteLoading ? (
          <>
            <NotesDetailsSkeleton />
            <NotesDetailsSkeleton />
            <NotesDetailsSkeleton />
            <NotesDetailsSkeleton />
          </>
        ) : (
          <>
            {notesList.length > 0 ? (
              notesList.map((note) => (
                <NotesCard
                  key={note.id}
                  note={note}
                  path={`note/${note.id}`}
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
          </>
        )}
      </div>
    </section>
  );
};

export default NotesDetails;
