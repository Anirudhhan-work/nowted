import { createContext } from "react";
import type { NotesType } from "../../features/notes/type";

type NoteContextType = {
  notesList: NotesType[];
  totalNotes: number;
  reRenderMidById: (folderId: string) => Promise<void>;
  reRenderMidByCategory: (category: string) => Promise<void>;
  reRenderBySearch: (search: string) => Promise<void>;
};

export const NoteContext = createContext<NoteContextType | undefined>(
  undefined,
);
