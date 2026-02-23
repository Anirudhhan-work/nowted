const NotesDetailsSkeleton = () => {
  return (
    <div className="w-full p-4 h-25 bg-background-400 rounded-sm">
      <h3 className="font-medium bg-background-700 w-1/2 h-1/4 rounded-2xl animate-pulse"></h3>
      <div className="pt-4 flex gap-2 text-sm">
        <p className="bg-background-700/70 w-1/3 h-2 rounded-2xl animate-pulse"></p>
        <p className="bg-background-800 w-full h-2 rounded-2xl animate-pulse"></p>
      </div>
    </div>
  );
};

const NotesCard = ({
  title,
  createdAt,
  preview,
  loading,
}: {
  title: string;
  createdAt: string;
  preview: string;
  loading: boolean;
}) => {
  if (loading) return <NotesDetailsSkeleton />;
  const date = new Date(createdAt);
  return (
    <div className="w-full p-4 bg-background-400 rounded-sm">
      <h3 className="font-medium text-lg">{title}</h3>
      <div className="py-2 flex gap-2 text-sm">
        <p className="text-background-700/70">{date.toLocaleDateString()}</p>
        <p className="text-background-800 truncate">{preview}</p>
      </div>
    </div>
  );
};

export { NotesDetailsSkeleton };

export default NotesCard;
