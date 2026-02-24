import { useEffect, useState } from "react";
import type { NotesType } from "../../../features/notes/type";
import { getNotesByFolderId } from "../../../features/notes/NotesAPI";
import { useParams } from "react-router-dom";
import NotesCard from "./NotesCard";
import toast from "react-hot-toast";

const NotesDetails = () => {
  const [notesList, setNotesList] = useState<NotesType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { folderId, folderName } = useParams();

  useEffect(() => {
    if (!folderId) return;
    const fetchNotesByFolderId = async (folderId: string) => {
      setIsLoading(true);
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
        setIsLoading(false);
      }
    };

    fetchNotesByFolderId(folderId);
  }, [folderId]);

  return (
    <section className="p-6 h-screen bg-background-100">
      <h1 className="text-xl font-medium">{folderName}</h1>
      <div className="py-8 flex flex-col gap-6">
        {notesList.length > 0 ? (
          notesList.map((note) => (
            <NotesCard
              path={`note/${note.id}`}
              key={note.id}
              loading={isLoading}
              title={note.title}
              createdAt={note.createdAt}
              preview={note.preview}
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
