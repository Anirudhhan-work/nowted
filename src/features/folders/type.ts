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
