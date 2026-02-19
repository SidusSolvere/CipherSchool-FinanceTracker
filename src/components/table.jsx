import { useState } from "react";
import { db, auth } from "../config/firebase";
import { getDocs, collection, addDoc } from "firebase/firestore";

function Table() {
  const [transactions, setTransactions] = useState([]);
  const transactionRef = collection(db, "Transactions");
  const [amount, setAmount] = useState(0);
  const [date, setDate] = useState("");
  const [toFrom, setToFrom] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [type, setType] = useState("");

  const getTransactions = async () => {
    try {
      const snapshot = await getDocs(transactionRef);

      const filteredData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log({ filteredData });

      setTransactions(filteredData);
    } catch (err) {
      console.error(err);
    }
  };
  const onSubmit = async () => {
    try {
      await addDoc(transactionRef, {
        Amount: amount,
        Date: date,
        ToFrom: toFrom,
        TransactionId: transactionId,
        Type: type,
        UserId: auth.currentUser.uid,
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <button onClick={getTransactions}>Get Transactions</button>
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
      <div>
        {transactions.map((tx) => (
          <div key={tx.id}>
            <p>
              ₹{tx.Amount} | {tx.Type} | {tx.ToFrom} | {tx.TransactionId} |{" "}
              {tx.Date.toDate().toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </>
  );
}

export default Table;
