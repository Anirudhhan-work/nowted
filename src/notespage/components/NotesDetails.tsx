import { useEffect, useState } from "react";
import type { NotesType } from "../../features/notes/type";
import { getNotesByFolderId } from "../../features/notes/NotesAPI";
import { useParams } from "react-router-dom";

const NotesDetails = () => {
  const [notesList, setNotesList] = useState<NotesType[]>([]);
  const { folderId } = useParams();

  useEffect(() => {
    if (!folderId) return;
    const fetchNotesByFolderId = async (folderId: string) => {
      try {
        const { notes } = await getNotesByFolderId(folderId);
        setNotesList(notes);
        console.log(notes);
      } catch (e) {
        console.log(e, "Error Message"); //TODO: should handle this error
      }
    };

    fetchNotesByFolderId(folderId);
  }, [folderId]);

  return <div>NotesDetails</div>;
};

export default NotesDetails;
