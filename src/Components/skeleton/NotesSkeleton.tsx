const NotesSkeleton = () => {
  return (
    <section className="p-12 pb-0 w-full overflow-y-auto scrollbar h-screen animate-pulse">
      {/* Title */}
      <div className="flex justify-between items-center">
        <div className="h-10 w-[70%] bg-background-700/30 rounded"></div>
        <div className="h-8 w-8 bg-background-700/30 rounded-full"></div>
      </div>

      {/* Date */}
      <div className="flex items-center gap-20 pt-10 pb-4">
        <div className="flex items-center gap-5">
          <div className="h-5 w-5 bg-background-700/30 rounded"></div>
          <div className="h-4 w-12 bg-background-700/30 rounded"></div>
        </div>
        <div className="h-4 w-24 bg-background-700/30 rounded"></div>
      </div>

      <hr className="border-0.1 border-background-700/40" />

      {/* Folder */}
      <div className="flex items-center gap-18 pb-10 pt-4">
        <div className="flex items-center gap-5">
          <div className="h-5 w-5 bg-background-700/30 rounded"></div>
          <div className="h-4 w-14 bg-background-700/30 rounded"></div>
        </div>
        <div className="h-4 w-40 bg-background-700/30 rounded"></div>
      </div>

      {/* Content */}
      <div className="space-y-4">
        <div className="h-4 w-full bg-background-700/30 rounded"></div>
        <div className="h-4 w-[95%] bg-background-700/30 rounded"></div>
        <div className="h-4 w-[90%] bg-background-700/30 rounded"></div>
        <div className="h-4 w-[85%] bg-background-700/30 rounded"></div>
        <div className="h-4 w-[92%] bg-background-700/30 rounded"></div>
        <div className="h-4 w-[80%] bg-background-700/30 rounded"></div>
        <div className="h-4 w-[95%] bg-background-700/30 rounded"></div>
        <div className="h-4 w-[90%] bg-background-700/30 rounded"></div>
        <div className="h-4 w-[85%] bg-background-700/30 rounded"></div>
        <div className="h-4 w-[92%] bg-background-700/30 rounded"></div>
      </div>
    </section>
  );
};

export default NotesSkeleton;
