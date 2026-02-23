import NotesDetails from "./components/NotesDetails";
import NotesTemplate from "./components/NotesTemplate";

const NotesPage = () => {
  return (
    <section className="flex">
      <div className="bg-background-100 lg:w-180 w-[30%] h-screen">
        <NotesDetails />
      </div>
      <NotesTemplate />
    </section>
  );
};

export default NotesPage;
