import { useEffect, useState } from "react";
import type { NotesType } from "../../../features/notes/type";
import {
  getNotesByCategory,
  getNotesByFolderId,
} from "../../../features/notes/NotesAPI";
import { useParams } from "react-router-dom";
import NotesCard from "./NotesCard";
import toast from "react-hot-toast";

const NotesDetails = () => {
  const [notesList, setNotesList] = useState<NotesType[]>([]);
  const [IsNoteLoading, setIsNoteLoading] = useState(false);
  const { folderId, folderName, category } = useParams();

  const fetchNotesByFolderId = async (folderId: string) => {
    setIsNoteLoading(true);
    try {
      const { notes } = await getNotesByFolderId(folderId);
      setNotesList(notes);
    } catch (e) {
      if (e instanceof Error) {
        toast.error(e.message);
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setIsNoteLoading(false);
    }
  };

  const fetchNotesByCategory = async (category: string) => {
    setIsNoteLoading(true);
    try {
      const { notes } = await getNotesByCategory(category);
      setNotesList(notes);
    } catch (e) {
      if (e instanceof Error) {
        toast.error(e.message);
      } else {
        toast.error("something went wrong");
      }
    } finally {
      setIsNoteLoading(false);
    }
  };

  useEffect(() => {
    if (category) fetchNotesByCategory(category);
    if (folderId) fetchNotesByFolderId(folderId);
  }, [folderId, category]);

  return (
    <section className="p-6 min-h-screen bg-background-100">
      <h1 className="text-xl font-medium">{folderName || category}</h1>
      <div className="py-8 flex flex-col gap-6">
        {notesList.length > 0 ? (
          notesList.map((note) => (
            <NotesCard
              key={note.id}
              note={note}
              path={`note/${note.id}`}
              loading={IsNoteLoading}
              reload={() =>
                (folderId && fetchNotesByFolderId(folderId)) ||
                (category && fetchNotesByCategory(category))
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
