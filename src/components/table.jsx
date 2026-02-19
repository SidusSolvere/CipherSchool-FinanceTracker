import { useState, useEffect } from "react";
import { db, auth } from "../config/firebase";
import {
  onSnapshot,
  collection,
  query,
  where,
  addDoc,
  Timestamp,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

function Table() {
  const [user, setUser] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingTx, setEditingTx] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, "Transactions"),
      where("UserId", "==", user.uid),
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setTransactions(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })),
      );
    });

    return unsubscribe;
  }, [user]);

  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [toFrom, setToFrom] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [type, setType] = useState("");

  const onSubmit = async () => {
    if (!user) return;

    try {
      await addDoc(collection(db, "Transactions"), {
        Amount: Number(amount),
        Date: Timestamp.fromDate(new Date(date)),
        ToFrom: toFrom,
        TransactionId: transactionId,
        Type: type,
        UserId: user.uid,
      });
      setAmount("");
      setDate("");
      setToFrom("");
      setTransactionId("");
      setType("");
    } catch (err) {
      console.error(err);
    }
  };
  const deleteTransaction = async (id) => {
    const transactionDoc = doc(db, "Transactions", id);
    await deleteDoc(transactionDoc);
  };
  const openEdit = (tx) => {
    setEditingTx({
      ...tx,
      Date: tx.Date?.toDate().toISOString().slice(0, 16),
    });
    setIsEditOpen(true);
  };
  const updateTransaction = async () => {
    if (!editingTx) return;

    const ref = doc(db, "Transactions", editingTx.id);

    await updateDoc(ref, {
      Amount: Number(editingTx.Amount),
      Date: Timestamp.fromDate(new Date(editingTx.Date)),
      ToFrom: editingTx.ToFrom,
      TransactionId: editingTx.TransactionId,
      Type: editingTx.Type,
    });

    setIsEditOpen(false);
    setEditingTx(null);
  };

  return (
    <>
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <input
        type="datetime-local"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      <input
        type="text"
        placeholder="To / From"
        value={toFrom}
        onChange={(e) => setToFrom(e.target.value)}
      />

      <input
        type="text"
        placeholder="Transaction ID"
        value={transactionId}
        onChange={(e) => setTransactionId(e.target.value)}
      />

      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="">Select type</option>
        <option value="Debit">Debit</option>
        <option value="Credit">Credit</option>
      </select>

      <button onClick={onSubmit}>Add Transaction</button>

      <hr />

      <div>
        {transactions.length === 0 && <p>No transactions</p>}

        {transactions.map((tx) => (
          <div key={tx.id}>
            <p>
              ₹{tx.Amount} | {tx.Type} | {tx.ToFrom} | {tx.TransactionId} |{" "}
              {tx.Date?.toDate().toLocaleString()}
              <button onClick={() => openEdit(tx)}>Edit</button>
              <button onClick={() => deleteTransaction(tx.id)}>Delete</button>
            </p>
          </div>
        ))}
      </div>{isEditOpen && (
 <div
  className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
  onClick={() => setIsEditOpen(false)}
>

  <div
  className="bg-white p-6 rounded w-96 space-y-3"
  onClick={(e) => e.stopPropagation()}
>

      <h2 className="text-lg font-semibold">Edit Transaction</h2>

      <input
        type="number"
        value={editingTx.Amount}
        onChange={(e) =>
          setEditingTx({ ...editingTx, Amount: e.target.value })
        }
        className="w-full border p-2 rounded"
      />

      <input
        type="datetime-local"
        value={editingTx.Date}
        onChange={(e) =>
          setEditingTx({ ...editingTx, Date: e.target.value })
        }
        className="w-full border p-2 rounded"
      />

      <input
        type="text"
        value={editingTx.ToFrom}
        onChange={(e) =>
          setEditingTx({ ...editingTx, ToFrom: e.target.value })
        }
        className="w-full border p-2 rounded"
      />

      <input
        type="text"
        value={editingTx.TransactionId}
        onChange={(e) =>
          setEditingTx({ ...editingTx, TransactionId: e.target.value })
        }
        className="w-full border p-2 rounded"
      />

      <select
        value={editingTx.Type}
        onChange={(e) =>
          setEditingTx({ ...editingTx, Type: e.target.value })
        }
        className="w-full border p-2 rounded"
      >
        <option value="Debit">Debit</option>
        <option value="Credit">Credit</option>
      </select>

      <div className="flex justify-end gap-2 pt-2">
        <button
          onClick={() => setIsEditOpen(false)}
          className="px-4 py-2 border rounded"
        >
          Cancel
        </button>

        <button
          onClick={updateTransaction}
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          Update
        </button>
      </div>
    </div>
  </div>
)}

    </>
  );
}

export default Table;
