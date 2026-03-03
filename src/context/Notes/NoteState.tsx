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

  const setFolderListState = (folders: FolderType[]) => {
    setFolderList(folders);
  };

  const reRenderMidById = useCallback(async (folderId: string) => {
    console.log("Id chal pada");
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
  }, []);

  const reRenderMidByCategory = useCallback(async (category: string) => {
    console.log("Category chal pada");

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
  }, []);

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
      }}
    >
      {children}
    </NoteContext.Provider>
  );
};
