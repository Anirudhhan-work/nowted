import { Outlet, useParams } from "react-router-dom";
import NotesDetails from "./components/NotesDetails";
import NotesTemplate from "./components/NotesTemplate";

const NotesPage = () => {
  const { noteId } = useParams();
  return (
    <section className="flex h-screen overflow-hidden">
      <div className="lg:w-[30.7%] w-[40%] h-screen overflow-y-auto scrollbar">
        <NotesDetails />
      </div>

      <div className="flex-1">{noteId ? <Outlet /> : <NotesTemplate />}</div>
    </section>
  );
};

export default NotesPage;
