const NotesDetailsSkeleton = () => {
  return (
    <div className="p-4 h-25 bg-background-400 rounded-sm">
      <h3 className="font-medium bg-background-700 w-1/2 h-1/4 rounded-2xl animate-pulse"></h3>
      <div className="pt-4 flex gap-2 text-sm">
        <p className="bg-background-700/70 w-1/3 h-2 rounded-2xl animate-pulse"></p>
        <p className="bg-background-800 w-full h-2 rounded-2xl animate-pulse"></p>
      </div>
    </div>
  );
};

export default NotesDetailsSkeleton;
