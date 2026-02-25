import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./Components/MainLayout";
import NotesPage from "./Components/notespage/NotesPage";
import NotesComponent from "./Components/NotesComponent/NotesComponent";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: ":folderName/:folderId",
        element: <NotesPage />,
        children: [{ path: "note/:noteId", element: <NotesComponent /> }],
      },
      {
        path: ":category",
        element: <NotesPage />,
        children: [{ path: "note/:noteId", element: <NotesComponent /> }],
      },
    ],
  },
]);
