import { useEffect, useRef, useState, useCallback } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import NotesCard from "./NotesCard";
import NotesDetailsSkeleton from "../../skeleton/NotesDetailsSkeleton";
import { useNotes } from "../../../utils/hooks";

const NotesDetails = () => {
  const { folderId, folderName, category } = useParams();
  const [isNoteLoading, setIsNoteLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search") || "";

  const loaderRef = useRef<HTMLDivElement>(null);

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
  } = useNotes();

  const getNotesById = useCallback(
    async (folderId: string, pageNumber = 1) => {
      if (pageNumber === 1) setIsNoteLoading(true);
      await reRenderMidById(folderId, pageNumber);
      if (pageNumber === 1) setIsNoteLoading(false);
    },
    [reRenderMidById],
  );

  const canLoadMore = folderId ? hasMore : categoryHasMore;
  const currentPage = folderId ? page : categoryPage;

  const getNotesByCategory = useCallback(
    async (category: string, pageNumber = 1) => {
      if (pageNumber === 1) setIsNoteLoading(true);
      await reRenderMidByCategory(category, pageNumber);
      if (pageNumber === 1) setIsNoteLoading(false);
    },
    [reRenderMidByCategory],
  );

  const handleLoadMore = useCallback(() => {
    if (!canLoadMore || isNoteLoading) return;

    if (folderId) getNotesById(folderId, currentPage + 1);
    else if (category) getNotesByCategory(category, currentPage + 1);
  }, [
    canLoadMore,
    isNoteLoading,
    folderId,
    category,
    currentPage,
    getNotesByCategory,
    getNotesById,
  ]);

  useEffect(() => {
    const controller = new AbortController();
    if (search) reRenderBySearch(search);
    else if (category) getNotesByCategory(category);
    else if (folderId) getNotesById(folderId);

    return () => controller.abort();
  }, [
    folderId,
    category,
    search,
    getNotesByCategory,
    getNotesById,
    reRenderBySearch,
  ]);

  useEffect(() => {
    if (!loaderRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) handleLoadMore();
      },
      { threshold: 0.1 },
    );

    observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [handleLoadMore]);

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

                <div ref={loaderRef} className="py-5">
                  {canLoadMore ? (
                    <p className="text-xs text-background-700 text-center ">
                      loading...
                    </p>
                  ) : (
                    <p className="text-xs text-background-700 text-center ">
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
