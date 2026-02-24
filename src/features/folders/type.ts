import type { AxiosError } from "axios";

export interface FolderType {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface FolderResType {
  folders: FolderType[];
}

export interface ErrorType extends AxiosError {
  error: string;
  message: string;
}
