import { FileText } from "lucide-react";
import TabButton from "./TabButton";

const RecentComponent = () => {
  return (
    <section>
      <h3 className="text-sm text font-medium px-5 text-background-800">
        Recents
      </h3>
      <div className="flex flex-col gap-0.5 py-2">
        <TabButton
          path="folder/under maintaince"
          icon={FileText}
          label={"Project proposal"}
        />
        <TabButton
          path="folder/under maintaince"
          icon={FileText}
          label={"Project proposal"}
        />
        <TabButton
          path="folder/under maintaince"
          icon={FileText}
          label={"Project proposal"}
        />
      </div>
    </section>
  );
};

export default RecentComponent;
