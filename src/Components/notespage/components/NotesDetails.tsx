import { useEffect, useState } from "react";
import type { NotesType } from "../../../features/notes/type";
import { getNotesByFolderId } from "../../../features/notes/NotesAPI";
import { useParams } from "react-router-dom";
import NotesCard from "./NotesCard";

const NotesDetails = () => {
  const [notesList, setNotesList] = useState<NotesType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { folderId } = useParams();
  const { folderName } = useParams();

  useEffect(() => {
    if (!folderId) return;
    const fetchNotesByFolderId = async (folderId: string) => {
      setIsLoading(true);
      try {
        const { notes } = await getNotesByFolderId(folderId);
        setNotesList(notes);
        console.log(notes);
      } catch (e) {
        console.log("fdds ");
        console.log(e, "Error Message"); //TODO: should handle this error
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotesByFolderId(folderId);
  }, [folderId]);

  return (
    <section className="p-6 h-screen">
      <h1 className="text-xl font-medium">{folderName}</h1>
      <div className="py-8 h-full flex flex-col gap-6">
        {notesList.map((note) => (
          <NotesCard
            key={note.id}
            loading={isLoading}
            title={note.title}
            createdAt={note.createdAt}
            preview={note.preview}
          />
        ))}
      </div>
    </section>
  );
};

export default NotesDetails;
