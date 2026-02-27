import { Folder, RotateCcw } from "lucide-react";

const RestoreComponent = ({
  title,
  handleRestore,
  folderName,
}: {
  title: string;
  handleRestore: () => Promise<void>;
  folderName: string;
}) => {
  return (
    <section className="p-12 pb-0 w-full flex justify-center items-center flex-col gap-5 min-h-screen">
      <RotateCcw size={90} strokeWidth={0.5} />
      <h1 className="text-3xl font-medium">Restore “{title}”</h1>
      <p className="text-center text-background-700">
        Don't want to lose this note? It's not too late! Just click the
        'Restore' <br /> button and it will be added back to your list. It's
        that simple.
      </p>
      <div className="flex items-center gap-10">
        <div className="text-background-700 flex items-center gap-5">
          <Folder size={20} />
          <h3 className="text-xs font-semibold tracking-wider">Folder</h3>
        </div>
        <p className="text-white text-sm font-medium underline">{folderName}</p>
      </div>
      <button
        onClick={handleRestore}
        className="bg-primary text-white rounded-md py-2 px-8 cursor-pointer"
      >
        Restore
      </button>
    </section>
  );
};

export default RestoreComponent;
