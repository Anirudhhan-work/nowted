import { Sun } from "lucide-react";

const DarkMode = () => {
  return (
    <footer className="mt-auto px-10 flex text-sm items-center justify-center text-dark-700 gap-5">
      <p>Dark</p>
      <Sun className="cursor-pointer" />
      <p>Light</p>
    </footer>
  );
};

export default DarkMode;
