import type { LucideIcon } from "lucide-react";

interface TabButtonProps {
  label: string;
  icon: LucideIcon;
}

const TabButton = ({ label, icon: Icon }: TabButtonProps) => {
  return (
    <button className="flex items-center gap-4 w-full px-5 py-2 text-zinc-400 cursor-pointer hover:bg-dark-400 text-sm font-medium">
      <Icon size={20} />
      {label}
    </button>
  );
};

export default TabButton;
