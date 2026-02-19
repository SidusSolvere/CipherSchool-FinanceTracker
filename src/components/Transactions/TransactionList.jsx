import TransactionItem from "./TransactionItem";

function TransactionList({
  transactions,
  onEdit,
  onDelete,
  onLoadMore,
  hasMore,
  loading,
}) {
  if (!transactions.length) return <p>No transactions</p>;

  return (
    <>
      {transactions.map((tx) => (
        <TransactionItem
          key={tx.id}
          tx={tx}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}

      {hasMore && (
        <button
          onClick={onLoadMore}
          disabled={loading}
          className="mt-4 px-4 py-2 border rounded"
        >
          {loading ? "Loading..." : "Load More"}
        </button>
      )}
    </>
  );
}

export default TransactionList;
