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

function TransactionsPage() {
  const PAGE_SIZES = [5, 10, 20, 50];

  const [user, setUser] = useState(null);
  const [transactions, setTransactions] = useState([]);

  const [pageSize, setPageSize] = useState(5);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageCursors, setPageCursors] = useState([]);
  const [loading, setLoading] = useState(false);

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingTx, setEditingTx] = useState(null);

  useEffect(() => {
    return onAuthStateChanged(auth, setUser);
  }, []);

  const fetchPage = async (pageIndex) => {
    if (!user || loading) return;

    setLoading(true);

    try {
      let q = query(
        collection(db, "Transactions"),
        where("UserId", "==", user.uid),
        orderBy("Date", "desc"),
        limit(pageSize)
      );

      if (pageIndex > 0 && pageCursors[pageIndex - 1]) {
        q = query(
          collection(db, "Transactions"),
          where("UserId", "==", user.uid),
          orderBy("Date", "desc"),
          startAfter(pageCursors[pageIndex - 1]),
          limit(pageSize)
        );
      }

      const snapshot = await getDocs(q);

      setTransactions(
        snapshot.docs.map((d) => ({
          id: d.id,
          ...d.data(),
        }))
      );

      setPageCursors((prev) => {
        const copy = [...prev];
        copy[pageIndex] =
          snapshot.docs[snapshot.docs.length - 1] || null;
        return copy;
      });

      setCurrentPage(pageIndex);
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

  useEffect(() => {
    if (!user) return;

    setTransactions([]);
    setPageCursors([]);
    setCurrentPage(0);

    fetchPage(0);
  }, [user, pageSize]);

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

      <TransactionList
        transactions={transactions}
        onEdit={openEdit}
        onDelete={deleteTransaction}
        loading={loading}
      />

      <div className="flex gap-4 mt-4">
        <button
          onClick={() => fetchPage(currentPage - 1)}
          disabled={currentPage === 0 || loading}
        >
          Prev
        </button>

        <span className="font-semibold">
          Page {currentPage + 1}
        </span>

        <button
          onClick={() => fetchPage(currentPage + 1)}
          disabled={!pageCursors[currentPage] || loading}
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
