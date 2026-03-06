import { useContext, useEffect, useRef, useState, useCallback } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import NotesCard from "./NotesCard";
import toast from "react-hot-toast";
import { NoteContext } from "../../../context/Notes/NoteContext";
import NotesDetailsSkeleton from "../../skeleton/NotesDetailsSkeleton";

const NotesDetails = () => {
  const { folderId, folderName, category } = useParams();
  const [isNoteLoading, setIsNoteLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search") || "";

  const loaderRef = useRef<HTMLDivElement>(null);

  const context = useContext(NoteContext);
  if (!context) return toast.error("Some issue with the Note context");

  const {
    notesList,
    totalNotes,
    reRenderMidById,
    reRenderMidByCategory,
    reRenderBySearch,
    page,
    hasMore,
    categoryPage,
    categoryHasMore,
  } = context;

  const getNotesById = async (folderId: string, pageNumber = 1) => {
    if (pageNumber === 1) setIsNoteLoading(true);
    await reRenderMidById(folderId, pageNumber);
    if (pageNumber === 1) setIsNoteLoading(false);
  };

  const canLoadMore = folderId ? hasMore : categoryHasMore;
  const currentPage = folderId ? page : categoryPage;

  const getNotesByCategory = async (category: string, pageNumber = 1) => {
    if (pageNumber === 1) setIsNoteLoading(true);
    await reRenderMidByCategory(category, pageNumber);
    if (pageNumber === 1) setIsNoteLoading(false);
  };

  /* eslint-disable react-hooks/rules-of-hooks */
  const handleLoadMore = useCallback(() => {
    if (!canLoadMore || isNoteLoading) return;

    if (folderId) getNotesById(folderId, currentPage + 1);
    else if (category) getNotesByCategory(category, currentPage + 1);
  }, [canLoadMore, isNoteLoading, folderId, category, currentPage]);

  useEffect(() => {
    const sentinel = loaderRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) handleLoadMore();
      },
      { threshold: 0.1 },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [handleLoadMore]);

  useEffect(() => {
    if (search) reRenderBySearch(search);
    else if (category) getNotesByCategory(category);
    else if (folderId) getNotesById(folderId, 1);
  }, [folderId, category, search]);

  return (
    <section className="h-screen w-full bg-background-100 flex flex-col">
      <div className="flex items-end justify-between p-6 pt-10">
        <h1 className="text-xl font-medium truncate w-[60%]">
          {folderName ||
            (category === "favorite" && "Favorite Notes") ||
            (category === "deleted" && "Trashed Notes") ||
            (category === "archived" && "Archived Notes") ||
            (category === "s" && "Searched Notes")}
        </h1>
        <span className="text-xs text-gray-500">{totalNotes} Notes</span>
      </div>

      <div className="flex flex-col gap-6 overflow-y-auto scrollbar-mid flex-1 px-6">
        {isNoteLoading ? (
          <>
            <NotesDetailsSkeleton />
            <NotesDetailsSkeleton />
            <NotesDetailsSkeleton />
            <NotesDetailsSkeleton />
          </>
        ) : (
          <>
            {notesList?.length > 0 ? (
              <>
                {notesList.map((note) => (
                  <NotesCard
                    key={note.id}
                    note={note}
                    path={
                      category === "s"
                        ? `/${note.folder.name}/${note.folderId}/note/${note.id}`
                        : `note/${note.id}`
                    }
                    reload={() =>
                      (folderId && reRenderMidById(folderId)) ||
                      (category && reRenderMidByCategory(category))
                    }
                  />
                ))}

                <div ref={loaderRef} className="py-2">
                  {!hasMore && notesList.length > 0 && (
                    <p className="text-center text-xs text-background-700 pb-4">
                      All notes loaded
                    </p>
                  )}
                </div>
              </>
            ) : (
              <div className="h-10 flex justify-center items-center">
                <p className="text-sm text-background-700">Nothing to show</p>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default NotesDetails;
