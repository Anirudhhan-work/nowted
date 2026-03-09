import axiosInstance from "../../api/axios";
import {
  type SingleNoteResType,
  type NotesResType,
  type RecentNotesResType,
  type CreateNoteType,
  type PatchNoteType,
} from "./type";

export const getResentNotes = async () => {
  const res = await axiosInstance.get<RecentNotesResType>("notes/recent");
  return res.data;
};

export const getNotesByFolderId = async (
  folderId: string,
  page = 1,
  limit = 10,
  signal?: AbortSignal,
) => {
  const res = await axiosInstance.get<NotesResType>("notes", {
    signal,
    params: { folderId, page, limit },
  });

  return res.data;
};

export const getNoteById = async (noteId: string, signal?: AbortSignal) => {
  const res = await axiosInstance.get<SingleNoteResType>(`notes/${noteId}`, {
    signal,
  });
  return res.data;
};

export const deleteNoteById = async (noteId: string) => {
  const res = await axiosInstance.delete<string>(`notes/${noteId}`);
  return res.data;
};
export const getNotesByCategory = async (
  category: string,
  page = 1,
  limit = 10,
  signal?: AbortSignal,
) => {
  const res = await axiosInstance.get<NotesResType>("notes", {
    signal,
    params: {
      [category]: true,
      page,
      limit,
    },
  });
  return res.data;
};

export const createNote = async (
  folderId: string,
  title: string,
  content: string,
) => {
  const res = await axiosInstance.post<CreateNoteType>(`notes`, {
    folderId,
    title,
    content,
  });

  return res.data;
};

export const patchNote = async (noteId: string, details: PatchNoteType) => {
  const res = await axiosInstance.patch<string>(`notes/${noteId}`, details);
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
