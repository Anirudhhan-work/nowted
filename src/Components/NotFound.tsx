import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <section className="w-full h-screen flex flex-col items-center justify-center text-center bg-background text-color">
      <div className="flex flex-col items-center gap-6">
        <div className="p-6 rounded-full border border-background-700 text-background-700">
          <X size={50} />
        </div>

        <h1 className="text-5xl font-semibold tracking-wide">404</h1>

        <h2 className="text-xl font-medium text-background-700">
          Page Not Found
        </h2>
        <button
          onClick={() => navigate("/")}
          className="mt-4 px-6 py-2 rounded-lg bg-primary text-white hover:opacity-90 transition cursor-pointer"
        >
          Go Back Home
        </button>
      </div>
    </section>
  );
};

export default NotFound;
