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
import GlassSurface from "@/components/GlassSurface";
import { IoIosArrowDropleft,IoIosArrowDropright } from "react-icons/io";
import UploadPdf from "@/components/UploadPdf"


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
<div className=" w-full">
  <GlassSurface
  style={{
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 50,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 50,
  }}
    className="
      w-full
      px-6 py-3
      border border-white/20
      hover:border-white/80
      flex items-center
    "
  >
    <div className="flex items-center gap-6">
      <button
        disabled={currentPage === 0}
        onClick={() => fetchPage(currentPage - 1)}
        className="
          rounded-full
          text-white/80
          border border-white/20
          hover:text-white
          transition
        "
      >
        <IoIosArrowDropleft className="scale-200 p-0 m-0"/>
      </button>

      <span className="text-white/70 font-medium">
        Page {currentPage + 1}
      </span>

      <button
        onClick={() => fetchPage(currentPage + 1)}
        className="
          rounded-full
          text-white/80
          border border-white/20
          hover:text-white
          transition
        "
      >
        <IoIosArrowDropright className="scale-200 p-0 m-0"/>
      </button>

      <span className="text-white/70 font-medium">
        Page size
      </span>

      <GlassSurface
        borderRadius={16}
        height={36}
        className="
          px-3
          bg-white/10
          backdrop-blur-md
          border border-white/20
          hover:border-white/80
        "
      >
        <select
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
          className="
            bg-transparent
            text-white
            outline-none
            cursor-pointer
          "
        >
          {PAGE_SIZES.map((s) => (
            <option key={s} value={s} className="text-black">
              {s}
            </option>
          ))}
        </select>
      </GlassSurface>
    </div>

    <div className="flex-1" />
       <UploadPdf></UploadPdf>

  </GlassSurface>
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
