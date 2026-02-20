import { FileText } from "lucide-react";
import TabButton from "./TabButton";

const RecentComponent = () => {
  return (
    <section className="text-dark-600">
      <h3 className="text-sm text font-medium px-5">Recents</h3>
      <div className="flex flex-col gap-2 py-2">
        <TabButton icon={FileText} label={"Project proposal"} />
        <TabButton icon={FileText} label={"Project proposal"} />
        <TabButton icon={FileText} label={"Project proposal"} />
      </div>
    </section>
  );
};

export default RecentComponent;
