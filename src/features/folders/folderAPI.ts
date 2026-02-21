import axiosInstance from "../../api/axios";
import type { FolderResType } from "./type";

export const getFolders = async () => {
  const response = await axiosInstance<FolderResType>("/folders");
  return response.data;
};
