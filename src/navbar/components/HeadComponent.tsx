import { Search } from "lucide-react";
import logo from "../../assets/nowtedlogo.svg";
const HeadComponent = () => {
  return (
    <section className="flex justify-between items-center px-5">
      <img src={logo} alt="nowted logo" />
      <Search className="text-background-700" />
    </section>
  );
};

export default HeadComponent;
