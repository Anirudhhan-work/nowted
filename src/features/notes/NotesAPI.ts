import axiosInstance from "../../api/axios";
import {
  type SingleNoteResType,
  type NotesResType,
  type RecentNotesResType,
  type CreateNoteType,
} from "./type";

export const getResentNotes = async () => {
  const res = await axiosInstance.get<RecentNotesResType>("notes/recent");
  return res.data;
};

export const getNotesByFolderId = async (folderId: string) => {
  const res = await axiosInstance.get<NotesResType>("notes", {
    params: { folderId },
  });
  return res.data;
};

export const getNoteById = async (noteId: string) => {
  const res = await axiosInstance.get<SingleNoteResType>(`notes/${noteId}`);
  return res.data;
};

export const deleteNoteById = async (noteId: string) => {
  const res = await axiosInstance.delete<string>(`notes/${noteId}`);
  return res.data;
};

export const getNotesByCategory = async (category: string) => {
  if (category === "deleted") {
    const res = await axiosInstance.get<NotesResType>(
      "notes?deleted=true&limit=all",
    );
    return res.data;
  }
  const res = await axiosInstance.get<NotesResType>("notes", {
    params: { [category]: true },
  });
  return res.data;
};

export const createNote = async (
  folderId: string,
  title: string,
  content: string,
  isFavorite: boolean,
  isArchived: boolean,
) => {
  const res = await axiosInstance.post<CreateNoteType>(`notes`, {
    folderId,
    title,
    content,
    isFavorite,
    isArchived,
  });

  return res.data;
};

export const patchFavNote = async (noteId: string, isFavorite: boolean) => {
  const res = await axiosInstance.patch<string>(`notes/${noteId}`, {
    isFavorite,
  });
  return res.data;
};

export const patchArchivedNote = async (
  noteId: string,
  isArchived: boolean,
) => {
  const res = await axiosInstance.patch<string>(`notes/${noteId}`, {
    isArchived,
  });
  return res.data;
};

export const patchNote = async (
  noteId: string,
  title: string,
  content: string,
) => {
  const res = await axiosInstance.patch<string>(`notes/${noteId}`, {
    title,
    content,
  });
  return res.data;
};

export const restoreNote = async (noteId: string) => {
  const res = await axiosInstance.post<string>(`notes/${noteId}/restore`);
  return res.data;
};

export const getSearchNote = async (search: string) => {
  const res = await axiosInstance.get<NotesResType>(`notes`, {
    params: { search },
  });
  return res.data;
};
