import { useState, useEffect } from "react";
import {
  collection,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  Timestamp,
} from "firebase/firestore";
import { db, auth } from "../../config/firebase";
import { onAuthStateChanged } from "firebase/auth";

import AddTransactionForm from "./AddTransactionForm";
import TransactionList from "./TransactionList";
import EditTransactionPopup from "./EditTransactionPopup";
import TransactionHeader from "./TransactionHeader";
function TransactionsPage() {
  const PAGE_SIZES = [5, 10, 20, 50];

  const [user, setUser] = useState(null);
  const [transactions, setTransactions] = useState([]);
const [sortField, setSortField] = useState("Date");
const [sortDirection, setSortDirection] = useState("desc");


  const [pageSize, setPageSize] = useState(5);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageCursors, setPageCursors] = useState([]);
  const [loading, setLoading] = useState(false);

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingTx, setEditingTx] = useState(null);
  const handleSort = (field) => {
  if (field === sortField) {
    setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
  } else {
    setSortField(field);
    setSortDirection("asc");
  }

  setCurrentPage(0);
  setPageCursors([]);
};
const [filters, setFilters] = useState({
  toFrom: "",
  transactionId: "",
  type: "ALL",
});


  useEffect(() => {
    return onAuthStateChanged(auth, setUser);
  }, []);
const fetchPage = async (pageIndex = 0) => {
  if (!user || loading) return;
  setLoading(true);

  let qConstraints = [
    where("UserId", "==", user.uid),
    orderBy(sortField, sortDirection),
    limit(pageSize),
  ];

  if (filters.type !== "ALL") {
    qConstraints.push(where("Type", "==", filters.type));
  }

  let q = query(collection(db, "Transactions"), ...qConstraints);

  if (pageIndex > 0 && pageCursors[pageIndex - 1]) {
    q = query(q, startAfter(pageCursors[pageIndex - 1]));
  }

  const snapshot = await getDocs(q);

  let docs = snapshot.docs.map((d) => ({
    id: d.id,
    ...d.data(),
  }));

  if (filters.toFrom) {
    docs = docs.filter((d) =>
      d.ToFrom?.toLowerCase().includes(filters.toFrom.toLowerCase())
    );
  }

  if (filters.transactionId) {
    docs = docs.filter((d) =>
      d.TransactionId?.includes(filters.transactionId)
    );
  }

  const newCursors = [...pageCursors];
  newCursors[pageIndex] =
    snapshot.docs[snapshot.docs.length - 1] || null;

  setPageCursors(newCursors);
  setTransactions(docs);
  setCurrentPage(pageIndex);
  setLoading(false);
};

useEffect(() => {
  if (!user) return;

  setTransactions([]);
  setPageCursors([]);
  setCurrentPage(0);

  fetchPage(0);
}, [user, pageSize, sortField, sortDirection, filters]);


  const addTransaction = async (form) => {
    if (!user) return;

    await addDoc(collection(db, "Transactions"), {
      ...form,
      Amount: Number(form.Amount),
      Date: Timestamp.fromDate(new Date(form.Date)),
      UserId: user.uid,
    });

    fetchPage(0);
  };

  const deleteTransaction = async (id) => {
    await deleteDoc(doc(db, "Transactions", id));
    fetchPage(currentPage);
  };

  const openEdit = (tx) => {
    setEditingTx({
      ...tx,
      Date: tx.Date.toDate().toISOString().slice(0, 16),
    });
    setIsEditOpen(true);
  };

  const updateTransaction = async () => {
    await updateDoc(doc(db, "Transactions", editingTx.id), {
      ...editingTx,
      Amount: Number(editingTx.Amount),
      Date: Timestamp.fromDate(new Date(editingTx.Date)),
    });

    setIsEditOpen(false);
    setEditingTx(null);
    fetchPage(currentPage);
  };

  return (
    <>
      <AddTransactionForm onAdd={addTransaction} />

      <hr />
      <TransactionHeader
  sortField={sortField}
  sortDirection={sortDirection}
  onSort={handleSort}
  filters={filters}
  onFilterChange={(newFilters) => {
    setFilters(newFilters);
    setPageCursors([]);
    setCurrentPage(0);
  }}
/>


      <TransactionList
        transactions={transactions}
        onEdit={openEdit}
        onDelete={deleteTransaction}
        loading={loading}
      />
<div className="mt-4 flex gap-2">
  <button
    disabled={currentPage === 0}
    onClick={() => fetchPage(currentPage - 1)}
    className="rounded border px-3 py-1 disabled:opacity-50"
  >
    Prev
  </button>

  <span>Page {currentPage + 1}</span>

  <button
    onClick={() => fetchPage(currentPage + 1)}
    className="rounded border px-3 py-1"
  >
    Next
  </button>

        <span className="font-medium">Page size:</span>
        <select
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
          className="border px-2 py-1 rounded"
        >
          {PAGE_SIZES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      {isEditOpen && (
        <EditTransactionPopup
          tx={editingTx}
          setTx={setEditingTx}
          onClose={() => setIsEditOpen(false)}
          onUpdate={updateTransaction}
        />
      )}
    </>
  );
}

export default TransactionsPage;
