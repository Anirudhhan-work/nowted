import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./Components/MainLayout";
import NotesPage from "./Components/NotesPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [{ index: true, element: <NotesPage /> }],
  },
]);
