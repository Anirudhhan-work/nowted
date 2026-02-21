import type { LucideIcon } from "lucide-react";

const TabButtonSkeleton = ({ Icon }: { Icon: LucideIcon }) => {
  return (
    <>
      <button className="tab-btn animate-pulse text-background-400">
        <Icon size={20} />
        <div className="h-4 w-1/2 bg-background-400 rounded-2xl"></div>
      </button>
      <button className="tab-btn animate-pulse text-background-400">
        <Icon size={20} />
        <div className="h-4 w-1/2 bg-background-400 rounded-2xl"></div>
      </button>
      <button className="tab-btn animate-pulse text-background-400">
        <Icon size={20} />
        <div className="h-4 w-1/2 bg-background-400 rounded-2xl"></div>
      </button>
    </>
  );
};

export default TabButtonSkeleton;
