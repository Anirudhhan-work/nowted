import type { LucideIcon } from "lucide-react";
import { NavLink } from "react-router-dom";

interface TabButtonProps {
  path: string;
  label: string;
  icon: LucideIcon;
  activeIcon?: LucideIcon;
}

const TabButton = ({
  path,
  label,
  icon: Icon,
  activeIcon: ActiveIcon,
}: TabButtonProps) => {
  return (
    <NavLink
      to={path}
      className={({ isActive }) =>
        `tab-btn ${isActive ? "bg-primary rounded-sm text-white" : "hover:bg-background-400 text-background-700"}`
      }
    >
      {({ isActive }) => (
        <>
          {isActive && ActiveIcon ? (
            <ActiveIcon size={20} />
          ) : (
            <Icon size={20} />
          )}
          {label}
        </>
      )}
    </NavLink>
  );
};

export default TabButton;
