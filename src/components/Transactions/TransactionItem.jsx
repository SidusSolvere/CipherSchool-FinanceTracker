function TransactionItem({ tx, onEdit, onDelete }) {
  return (
   <div
  className="
  mx-auto
    grid
  grid-cols-[1.3fr_1fr_1.5fr_1fr_1fr_auto]
    gap-6
    items-center
    py-2
    border-b border-l border-r border-white/20
    text-white
  "
>
  <span className="truncate pl-10">₹{tx.Amount}</span>

  <span>{tx.Type}</span>

  <span className="truncate">{tx.ToFrom}</span>

  <span className="truncate">{tx.TransactionId}</span>

  <span className="text-sm text-white/70">
    {tx.Date.toDate().toLocaleString()}
  </span>

  <div className="flex items-center gap-4 px-4">
    <button
      onClick={() => onEdit(tx)}
      className="text-blue-400 hover:underline"
    >
      Edit
    </button>

    <button
      onClick={() => onDelete(tx.id)}
      className="text-red-400 hover:underline"
    >
      Delete
    </button>
  </div>
</div>
  );
}

export default TransactionItem;
