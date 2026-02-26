import { RotateCcw } from "lucide-react";

const RestoreComponent = () => {
  return (
    <section className="p-12 pb-0 w-full flex justify-center items-center flex-col gap-5">
      <RotateCcw size={90} strokeWidth={0.5} />
      <h1 className="text-3xl font-medium">
        Restore “Reflection on the Month of June”
      </h1>
      <p className="text-center text-background-700">
        Don't want to lose this note? It's not too late! Just click the
        'Restore' <br /> button and it will be added back to your list. It's
        that simple.
      </p>
      <button className="bg-primary text-white rounded-md py-2 px-8 cursor-pointer">
        Restore
      </button>
    </section>
  );
};

export default RestoreComponent;
