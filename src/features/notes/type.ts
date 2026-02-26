import type { FolderType } from "../folders/type";

export interface NotesType {
  id: string;
  folderId: string;
  title: string;
  isFavorite: boolean;
  isArchived: boolean;
  createdAt: string;
  updatedAt: string;
  content: string;
  deletedAt: null | string;
  preview: string;
  folder: FolderType;
}

export interface RecentNotesResType {
  recentNotes: NotesType[];
}

export interface NotesResType {
  notes: NotesType[];
  total: number;
}

export interface SingleNoteResType {
  note: NotesType;
}

export interface CreateNoteType {
  id: string;
}
