import { useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  writeBatch,
  doc,
} from "firebase/firestore";
import { db, auth } from "../config/firebase";

function ClearUserTransactions() {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    const user = auth.currentUser;
    if (!user) return;

    if (!window.confirm("Delete ALL your transactions?")) return;

    setLoading(true);

    const q = query(
      collection(db, "Transactions"),
      where("UserId", "==", user.uid)
    );

    const snapshot = await getDocs(q);
    const batch = writeBatch(db);

    snapshot.docs.forEach((d) => {
      batch.delete(doc(db, "Transactions", d.id));
    });

    await batch.commit();
    setLoading(false);

    alert("All transactions deleted");
  };

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="rounded bg-red-600 px-4 py-2 text-white disabled:opacity-50"
    >
      {loading ? "Deleting..." : "Clear My Transactions"}
    </button>
  );
}

export default ClearUserTransactions;
