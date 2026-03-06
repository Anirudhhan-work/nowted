import { Folder, History } from "lucide-react";
import { useState } from "react";

const RestoreComponent = ({
  title,
  handleRestore,
  folderName,
}: {
  title: string;
  handleRestore: () => Promise<void>;
  folderName: string;
}) => {
  const [isRestoring, setIsRestoring] = useState(false);

  return (
    <section className="p-12 pb-0 w-full flex justify-center items-center flex-col gap-5 min-h-screen">
      <History size={90} strokeWidth={0.5} />
      <div className="w-full flex justify-center">
        <h1 className="text-3xl font-medium truncate">Restore “{title}”</h1>
      </div>
      <p className="text-center text-background-700">
        Don't want to lose this note? It's not too late! Just click the
        'Restore' <br /> button and it will be added back to your list. It's
        that simple.
      </p>
      <div className="flex items-center justify-center gap-10 w-full">
        <div className="text-background-700 flex items-center gap-5">
          <Folder size={20} />
          <h3 className="text-xs font-semibold tracking-wider">Folder</h3>
        </div>
        <p className="text-color text-sm font-medium underline truncate">
          {folderName}
        </p>
      </div>
      <button
        disabled={isRestoring}
        onClick={async () => {
          setIsRestoring(true);
          await handleRestore();
          setIsRestoring(false);
        }}
        className={`bg-primary text-white rounded-md py-2 px-8 cursor-pointer ${isRestoring && "animate-pulse"}`}
      >
        {isRestoring ? "Restoring.." : "Restore"}
      </button>
    </section>
  );
};

export default RestoreComponent;
