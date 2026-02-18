import { useState } from "react";
import { db } from "../config/firebase";
import { getDocs, collection } from "firebase/firestore";

function Table() {
  const [transactions, setTransactions] = useState([]);

  // ⚠️ use correct collection name
  const transactionRef = collection(db, "Transactions");

  const getTransactions = async () => {
    try {
      const snapshot = await getDocs(transactionRef);

      const filteredData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log({filteredData});

      setTransactions(filteredData);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <button onClick={getTransactions}>Get Transactions</button>

      <div>
        {transactions.map((tx) => (
  <div key={tx.id}>
    <p>
      ₹{tx.Amount} | {tx.Type} | {tx.ToFrom}  | {tx.TransactionId} | {tx.Date.toDate().toLocaleString()}
    </p>
  </div>
))}

      </div>
    </>
  );
}

export default Table;
