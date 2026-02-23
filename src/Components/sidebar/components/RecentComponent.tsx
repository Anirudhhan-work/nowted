import { BookOpenIcon, FileText } from "lucide-react";
import TabButton from "./TabButton";
import { useEffect, useState } from "react";
import { getResentNotes } from "../../../features/notes/NotesAPI";
import type { NotesType } from "../../../features/notes/type";
import TabButtonSkeleton from "../../TabButtonSkeleton";

const RecentComponent = () => {
  const [recentNotesList, setRecentNotesList] = useState<NotesType[]>([]);
  const [isRecentNotesLoading, setIsRecentNotesLoading] = useState(false);

  useEffect(() => {
    const fetchRecentNotes = async () => {
      setIsRecentNotesLoading(true);
      try {
        const { recentNotes } = await getResentNotes();
        setRecentNotesList(recentNotes);
      } catch (e) {
        console.error(e); // TODO: Handle this
      } finally {
        setIsRecentNotesLoading(false);
      }
    };

    fetchRecentNotes();
  }, []);
  return (
    <section>
      <h3 className="text-sm text font-medium px-5 text-background-800">
        Recents
      </h3>
      <div className="flex flex-col gap-0.5 py-2">
        {isRecentNotesLoading && <TabButtonSkeleton Icon={FileText} />}
        {recentNotesList.map((notes) => (
          <TabButton
            key={notes.id}
            path={`folder/${notes.folderId}`} // more to be added
            icon={FileText}
            activeIcon={BookOpenIcon}
            label={notes.title}
          />
        ))}
      </div>
    </section>
  );
};

export default RecentComponent;
