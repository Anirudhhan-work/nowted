import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./Components/MainLayout";
import NotesPage from "./Components/notespage/NotesPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "folder/:folderId/:folderName", element: <NotesPage /> },
    ],
  },
]);
