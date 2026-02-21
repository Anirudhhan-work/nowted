import Notes from "../notespage/components/Notes";
import NotesDetails from "../notespage/components/NotesDetails";

const NotesPage = () => {
  return (
    <section className="flex">
      <div className="bg-background-100 w-[30%] h-screen">
        <NotesDetails />
      </div>
      <Notes />
    </section>
  );
};

export default NotesPage;
