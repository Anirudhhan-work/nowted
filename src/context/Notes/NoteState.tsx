import { useState, type ReactNode } from "react";
import { NoteContext } from "./NoteContext";
import type { NotesType } from "../../features/notes/type";
import {
  getNotesByCategory,
  getNotesByFolderId,
} from "../../features/notes/NotesAPI";
import toast from "react-hot-toast";

export const NoteProvider = ({ children }: { children: ReactNode }) => {
  const [notesList, setNotesList] = useState<NotesType[]>([]);

  const reRenderMidById = async (folderId: string) => {
    try {
      const { notes } = await getNotesByFolderId(folderId);
      setNotesList(notes);
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
      const { notes } = await getNotesByCategory(category);
      setNotesList(notes);
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
        reRenderMidById,
        reRenderMidByCategory,
      }}
    >
      {children}
    </NoteContext.Provider>
  );
};
