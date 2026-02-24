import { Outlet, useParams } from "react-router-dom";
import NotesDetails from "./components/NotesDetails";
import NotesTemplate from "./components/NotesTemplate";

const NotesPage = () => {
  const { noteId } = useParams();
  if (noteId)
    return (
      <section className="flex h-screen overflow-hidden">
        <div className="lg:w-180 w-[30%] h-screen overflow-y-auto scrollbar">
          <NotesDetails />
        </div>
        {/* <NotesTemplate /> */}
        <Outlet />
      </section>
    );
  return (
    <section className="flex h-screen overflow-hidden">
      <div className="lg:w-180 w-[30%] h-screen overflow-y-auto scrollbar">
        <NotesDetails />
      </div>
      <NotesTemplate />
    </section>
  );
};

export default NotesPage;
