function EditTransactionPopup({ tx, setTx, onClose, onUpdate }) {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded w-96 space-y-3"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-semibold">Edit Transaction</h2>

        <input
          type="number"
          value={tx.Amount}
          onChange={(e) => setTx({ ...tx, Amount: e.target.value })}
        />

        <input
          type="datetime-local"
          value={tx.Date}
          onChange={(e) => setTx({ ...tx, Date: e.target.value })}
        />

        <input
          value={tx.ToFrom}
          onChange={(e) => setTx({ ...tx, ToFrom: e.target.value })}
        />

        <input
          value={tx.TransactionId}
          onChange={(e) => setTx({ ...tx, TransactionId: e.target.value })}
        />

        <select
          value={tx.Type}
          onChange={(e) => setTx({ ...tx, Type: e.target.value })}
        >
          <option value="Debit">Debit</option>
          <option value="Credit">Credit</option>
        </select>

        <div className="flex justify-end gap-2">
          <button onClick={onClose}>Cancel</button>
          <button onClick={onUpdate}>Update</button>
        </div>
      </div>
    </div>
  );
}

export default EditTransactionPopup;
