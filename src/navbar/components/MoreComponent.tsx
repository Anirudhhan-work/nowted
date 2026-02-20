import { Archive, Star, Trash } from "lucide-react";
import TabButton from "./TabButton";

const MoreComponent = () => {
  return (
    <section className="text-dark-600">
      <h3 className="text-sm text font-medium px-5">More</h3>
      <div className="flex flex-col gap-2 py-2">
        <TabButton icon={Star} label="Favorites" />
        <TabButton icon={Trash} label="Trash" />
        <TabButton icon={Archive} label="Archived Notes" />
      </div>
    </section>
  );
};

export default MoreComponent;
