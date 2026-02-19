function TransactionItem({ tx, onEdit, onDelete }) {
  return (
    <p>
      ₹{tx.Amount} | {tx.Type} | {tx.ToFrom} | {tx.TransactionId} |{" "}
      {tx.Date.toDate().toLocaleString()}
      <button onClick={() => onEdit(tx)}>Edit</button>
      <button onClick={() => onDelete(tx.id)}>Delete</button>
    </p>
  );
}

export default TransactionItem;
