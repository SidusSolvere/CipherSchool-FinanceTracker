import GlassSurface from "@/components/GlassSurface";

function EditTransactionModal({ tx, setTx, onClose, onUpdate }) {
  return (
    <div
      className="
    fixed inset-0
    bg-black/40
    backdrop-blur-md
    flex items-center justify-center
    z-50
  "
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="
      w-96
      p-6
      space-y-4
      rounded-2xl

      bg-white/10
      backdrop-blur-xl
      border border-white/20
      shadow-2xl
    "
      >
        <h2 className="text-lg font-semibold text-white">Edit Transaction</h2>

        <input
          type="number"
          value={tx.Amount}
          onChange={(e) => setTx({ ...tx, Amount: e.target.value })}
          className="
        w-full
        px-3 py-2
        rounded-lg
        bg-white/20
        backdrop-blur-sm
        border border-white/20
        text-white
        placeholder-white/50
        outline-none
        focus:border-white/40
      "
          placeholder="Amount"
        />

        <input
          type="datetime-local"
          value={tx.Date}
          onChange={(e) => setTx({ ...tx, Date: e.target.value })}
          className="
        w-full
        px-3 py-2
        rounded-lg
        bg-white/20
        backdrop-blur-sm
        border border-white/20
        text-white
        outline-none
        focus:border-white/40
      "
        />

        <input
          value={tx.ToFrom}
          onChange={(e) => setTx({ ...tx, ToFrom: e.target.value })}
          className="
        w-full
        px-3 py-2
        rounded-lg
        bg-white/20
        backdrop-blur-sm
        border border-white/20
        text-white
        placeholder-white/50
        outline-none
        focus:border-white/40
      "
          placeholder="To / From"
        />

        <input
          value={tx.TransactionId}
          onChange={(e) => setTx({ ...tx, TransactionId: e.target.value })}
          className="
        w-full
        px-3 py-2
        rounded-lg
        bg-white/20
        backdrop-blur-sm
        border border-white/20
        text-white
        placeholder-white/50
        outline-none
        focus:border-white/40
      "
          placeholder="Transaction ID"
        />

        <select
          value={tx.Type}
          onChange={(e) => setTx({ ...tx, Type: e.target.value })}
          className="
        w-full
        px-3 py-2
        rounded-lg
        bg-white/20
        backdrop-blur-sm
        border border-white/20
        text-white
        outline-none
        focus:border-white/40
      "
        >
          <option value="Debit" className="text-black">
            Debit
          </option>
          <option value="Credit" className="text-black">
            Credit
          </option>
        </select>

        <div className="flex justify-end gap-3 pt-2">
          <button
            onClick={onClose}
            className="
          px-4 py-2
          rounded-lg
          bg-white/20
          text-white
          hover:bg-white/30
          transition
        "
          >
            Cancel
          </button>

          <button
            onClick={onUpdate}
            className="
          px-4 py-2
          rounded-lg
          bg-blue-500/80
          text-white
          hover:bg-blue-500
          transition
        "
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditTransactionModal;
