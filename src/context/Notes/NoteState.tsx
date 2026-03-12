import { useCallback, useState, type ReactNode } from "react";
import { NoteContext } from "./NoteContext";
import type { NotesType } from "../../features/notes/type";
import {
  getNotesByCategory,
  getNotesByFolderId,
  getSearchNote,
} from "../../features/notes/NotesAPI";
import toast from "react-hot-toast";
import type { FolderType } from "../../features/folders/type";

export const NoteProvider = ({ children }: { children: ReactNode }) => {
  const [notesList, setNotesList] = useState<NotesType[]>([]);
  const [totalNotes, setTotalNotes] = useState(0);
  const [folderList, setFolderList] = useState<FolderType[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [categoryPage, setCategoryPage] = useState(1);
  const [categoryHasMore, setCategoryHasMore] = useState(true);

  const setFolderListState = useCallback((folders: FolderType[]) => {
    setFolderList(folders);
  }, []);

  const reRenderMidById = useCallback(
    async (folderId: string, pageNumber = 1) => {
      try {
        const { notes, total } = await getNotesByFolderId(
          folderId,
          pageNumber,
          10,
        );

        if (pageNumber === 1) {
          setNotesList(notes);
        } else {
          setNotesList((prev) => [...prev, ...notes]);
        }

        setTotalNotes(total);
        setHasMore(notes?.length === 10);
        setPage(pageNumber);
      } catch (e) {
        if (e instanceof Error) {
          if (e.message === "canceled") return;
          toast.error(e.message);
        } else toast.error("Something went wrong");
      }
    },
    [],
  );

  const reRenderMidByCategory = useCallback(
    async (category: string, pageNumber = 1) => {
      try {
        const { notes, total } = await getNotesByCategory(
          category,
          pageNumber,
          10,
        );

        if (pageNumber === 1) {
          setNotesList(notes);
        } else {
          setNotesList((prev) => [...prev, ...notes]);
        }

        setTotalNotes(total);
        setCategoryHasMore(notes?.length === 10);
        setCategoryPage(pageNumber);
      } catch (e) {
        if (e instanceof Error) {
          if (e.message === "canceled") return;
          toast.error(e.message);
        } else toast.error("Something went wrong");
      }
    },
    [],
  );
  const reRenderBySearch = useCallback(async (search: string) => {
    if (!search || search.trim() === "") {
      setNotesList([]);
      setTotalNotes(0);
      return;
    }

    try {
      const { notes } = await getSearchNote(search.trim());
      setNotesList(notes);
      setTotalNotes(notes?.length);
    } catch (e) {
      if (e instanceof Error) {
        toast.error(e.message);
      } else {
        toast.error("something went wrong");
      }
    }
  }, []);

  return (
    <NoteContext.Provider
      value={{
        folderList,
        setFolderListState,
        notesList,
        totalNotes,
        reRenderMidById,
        reRenderMidByCategory,
        reRenderBySearch,
        page,
        hasMore,
        categoryPage,
        categoryHasMore,
      }}
    >
      {children}
    </NoteContext.Provider>
  );
};
