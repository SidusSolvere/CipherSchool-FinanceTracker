function TransactionHeader({
  sortField,
  sortDirection,
  onSort,
  filters,
  onFilterChange,
}) {
  const columns = [
    { key: "Amount", label: "Amount" },
    { key: "TransactionId", label: "Transaction ID" },
    { key: "Type", label: "Type" },
    { key: "ToFrom", label: "To / From" },
    { key: "Date", label: "Date" },
  ];

  const renderArrow = (key) => {
    if (sortField !== key) return null;
    return sortDirection === "asc" ? " ↑" : " ↓";
  };

  return (
    <>
      <div className="mb-3 flex gap-3">
        <input
          type="text"
          placeholder="Search To / From"
          value={filters.toFrom}
          onChange={(e) =>
            onFilterChange({ ...filters, toFrom: e.target.value })
          }
          className="border px-2 py-1 rounded w-48"
        />

        <input
          type="text"
          placeholder="Transaction ID"
          value={filters.transactionId}
          onChange={(e) =>
            onFilterChange({ ...filters, transactionId: e.target.value })
          }
          className="border px-2 py-1 rounded w-48"
        />

        <select
          value={filters.type}
          onChange={(e) =>
            onFilterChange({ ...filters, type: e.target.value })
          }
          className="border px-2 py-1 rounded"
        >
          <option value="ALL">All</option>
          <option value="Debit">Debit</option>
          <option value="Credit">Credit</option>
        </select>
      </div>

      <div className="grid grid-cols-5 gap-2 border-b py-2 font-semibold">
        {columns.map((col) => (
          <button
            key={col.key}
            onClick={() => onSort(col.key)}
            className="text-left hover:text-blue-600"
          >
            {col.label}
            {renderArrow(col.key)}
          </button>
        ))}
      </div>
    </>
  );
}

export default TransactionHeader;
