import { Outlet, useParams } from "react-router-dom";
import NotesDetails from "./components/NotesDetails";
import NotesTemplate from "./components/NotesTemplate";

const NotesPage = () => {
  const { noteId } = useParams();
  return (
    <section className="flex h-screen">
      <div className="lg:w-[28.7%] w-[40%]">
        <NotesDetails />
      </div>

      <div className="flex-1 h-screen">
        {noteId ? <Outlet /> : <NotesTemplate />}
      </div>
    </section>
  );
};

export default NotesPage;
