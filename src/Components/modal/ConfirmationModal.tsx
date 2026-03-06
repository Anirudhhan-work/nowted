type ConfirmationModalType = {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  type: "Note" | "Folder" | "Move";
};

const ConfirmationModal = ({
  message,
  onConfirm,
  onCancel,
  type,
}: ConfirmationModalType) => {
  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
      onClick={onCancel}
    >
      <div
        className="bg-background p-6 rounded-md shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-semibold mb-3">
          {type === "Move" ? "Move Folder" : `Delete ${type}`}
        </h2>

        <p className="text-sm text-background-700 mb-6">{message}</p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 border rounded-md cursor-pointer hover:bg-background/70"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className={`px-4 py-2 ${type === "Move" ? "bg-primary hover:bg-primary/60" : "bg-red-500 hover:bg-red-500/60"} text-white rounded-md cursor-pointer`}
          >
            {type === "Move" ? type : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
