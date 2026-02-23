import axiosInstance from "../../api/axios";
import type { NotesResType, RecentNotesResType } from "./type";

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
