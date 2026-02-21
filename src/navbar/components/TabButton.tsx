import type { LucideIcon } from "lucide-react";

interface TabButtonProps {
  label: string;
  icon: LucideIcon;
}

const TabButton = ({ label, icon: Icon }: TabButtonProps) => {
  return (
    <button className="tab-btn">
      <Icon size={20} />
      {label}
    </button>
  );
};

export default TabButton;
