import { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  orderBy,
} from "firebase/firestore";
import { db, auth } from "../config/firebase";
import { onAuthStateChanged } from "firebase/auth";

export function useAnalytics() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    return onAuthStateChanged(auth, setUser);
  }, []);

  useEffect(() => {
    if (!user) return;

    async function fetchAll() {
      setLoading(true);

      const q = query(
        collection(db, "Transactions"),
        where("UserId", "==", user.uid),
        orderBy("Date", "asc")
      );

      const snapshot = await getDocs(q);

      setTransactions(
        snapshot.docs.map((d) => ({
          id: d.id,
          ...d.data(),
        }))
      );

      setLoading(false);
    }

    fetchAll();
  }, [user]);

  return { transactions, loading };
}
