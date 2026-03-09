import { createContext } from "react";
import type { NotesType } from "../../features/notes/type";
import type { FolderType } from "../../features/folders/type";

type NoteContextType = {
  notesList: NotesType[];
  folderList: FolderType[];
  totalNotes: number;
  page: number;
  hasMore: boolean;
  categoryPage: number;
  categoryHasMore: boolean;
  setFolderListState: (folders: FolderType[]) => void;
  reRenderMidById: (
    folderId: string,
    page?: number,
    signal?: AbortSignal,
  ) => Promise<void>;
  reRenderMidByCategory: (
    category: string,
    page?: number,
    signal?: AbortSignal,
  ) => Promise<void>;
  reRenderBySearch: (search: string) => Promise<void>;
};

export const NoteContext = createContext<NoteContextType | undefined>(
  undefined,
);
