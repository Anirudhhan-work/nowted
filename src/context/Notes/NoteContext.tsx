import { createContext } from "react";
import type { NotesType } from "../../features/notes/type";
import type { FolderType } from "../../features/folders/type";

type NoteContextType = {
  notesList: NotesType[];
  folderList: FolderType[];
  totalNotes: number;
  setFolderListState: (folders: FolderType[]) => void;
  reRenderMidById: (folderId: string) => Promise<void>;
  reRenderMidByCategory: (category: string) => Promise<void>;
  reRenderBySearch: (search: string) => Promise<void>;
};

export const NoteContext = createContext<NoteContextType | undefined>(
  undefined,
);
