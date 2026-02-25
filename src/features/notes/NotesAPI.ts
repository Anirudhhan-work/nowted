import axiosInstance from "../../api/axios";
import {
  type SingleNoteResType,
  type NotesResType,
  type RecentNotesResType,
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
  const res = await axiosInstance.get<NotesResType>("notes", {
    params: { [category]: true },
  });
  return res.data;
};

export const patchNote = async (
  noteId: string,
  folderId: string,
  title: string,
  content: string,
  isFavorite: boolean,
  isArchived: boolean,
) => {
  const res = await axiosInstance.patch<string>(`notes/${noteId}`, {
    folderId,
    title,
    content,
    isFavorite,
    isArchived,
  });
  return res.data;
};
