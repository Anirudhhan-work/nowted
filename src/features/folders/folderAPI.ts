import axiosInstance from "../../api/axios";
import type { FolderResType } from "./type";

export const getFolders = async () => {
  const response = await axiosInstance<FolderResType>("/folders");
  return response.data;
};

export const renameFolder = async (folderId: string, name: string) => {
  const response = await axiosInstance.patch<string>(`/folders/${folderId}`, {
    name,
  });
  return response.data;
};
