import { useState, type ReactNode } from "react";
import { NoteContext } from "./NoteContext";
import type { NotesType } from "../../features/notes/type";
import {
  getNotesByCategory,
  getNotesByFolderId,
  getSearchNote,
} from "../../features/notes/NotesAPI";
import toast from "react-hot-toast";

export const NoteProvider = ({ children }: { children: ReactNode }) => {
  const [notesList, setNotesList] = useState<NotesType[]>([]);
  const [totalNotes, setTotalNotes] = useState(0);

  const reRenderMidById = async (folderId: string) => {
    try {
      const { notes, total } = await getNotesByFolderId(folderId);
      setNotesList(notes);
      setTotalNotes(total);
    } catch (e) {
      if (e instanceof Error) {
        toast.error(e.message);
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  const reRenderMidByCategory = async (category: string) => {
    try {
      const { notes, total } = await getNotesByCategory(category);
      setNotesList(notes);
      setTotalNotes(total);
    } catch (e) {
      if (e instanceof Error) {
        toast.error(e.message);
      } else {
        toast.error("something went wrong");
      }
    }
  };

  const reRenderBySearch = async (search: string) => {
    if (!search || search.trim() === "") {
      setNotesList([]);
      setTotalNotes(0);
      return;
    }

    try {
      const { notes, total } = await getSearchNote(search);
      setNotesList(notes);
      setTotalNotes(total);
    } catch (e) {
      if (e instanceof Error) {
        toast.error(e.message);
      } else {
        toast.error("something went wrong");
      }
    }
  };

  return (
    <NoteContext.Provider
      value={{
        notesList,
        totalNotes,
        reRenderMidById,
        reRenderMidByCategory,
        reRenderBySearch,
      }}
    >
      {children}
    </NoteContext.Provider>
  );
};
