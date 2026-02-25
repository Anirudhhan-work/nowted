import { createContext } from "react";
import type { NotesType } from "../../features/notes/type";

type NoteContextType = {
  notesList: NotesType[];
  reRenderMidById: (folderId: string) => Promise<void>;
  reRenderMidByCategory: (category: string) => Promise<void>;
};

export const NoteContext = createContext<NoteContextType | undefined>(
  undefined,
);
