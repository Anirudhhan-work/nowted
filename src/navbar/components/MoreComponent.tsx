import { Archive, Star, Trash } from "lucide-react";
import TabButton from "./TabButton";

const MoreComponent = () => {
  return (
    <section>
      <h3 className="text-sm text font-medium px-5 text-background-800">
        More
      </h3>
      <div className="flex flex-col gap-0.5 py-2">
        <TabButton
          path="folder/undermaintaince"
          icon={Star}
          label="Favorites"
        />
        <TabButton path="folder/undermaintaince" icon={Trash} label="Trash" />
        <TabButton
          path="folder/undermaintaince"
          icon={Archive}
          label="Archived Notes"
        />
      </div>
    </section>
  );
};

export default MoreComponent;
