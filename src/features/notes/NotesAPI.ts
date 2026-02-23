import axiosInstance from "../../api/axios";
import type { RecentNotesResType } from "./type";

export const getResentNotes = async () => {
  const res = await axiosInstance.get<RecentNotesResType>("notes/recent");
  return res.data;
};
