import { FileText } from "lucide-react";

const NotesTemplate = () => {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <FileText size={90} strokeWidth={0.5} />
      <h1 className="text-2xl font-bold py-2">Select a note to view</h1>
      <p className="text-center text-sm py-2 text-background-700">
        Choose a note from the list on the left to view its contents, or create
        a <br /> new note to add to your collection.
      </p>
    </div>
  );
};

export default NotesTemplate;
