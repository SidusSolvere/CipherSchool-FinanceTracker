import { useState } from "react";

function AddTransactionForm({ onAdd }) {
  const [form, setForm] = useState({
    Amount: "",
    Date: "",
    ToFrom: "",
    TransactionId: "",
    Type: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = () => {
    onAdd(form);
    setForm({
      Amount: "",
      Date: "",
      ToFrom: "",
      TransactionId: "",
      Type: "",
    });
  };

  return (
    <>
      <input name="Amount" type="number" value={form.Amount} onChange={handleChange} />
      <input name="Date" type="datetime-local" value={form.Date} onChange={handleChange} />
      <input name="ToFrom" placeholder="To / From" value={form.ToFrom} onChange={handleChange} />
      <input name="TransactionId" placeholder="Transaction ID" value={form.TransactionId} onChange={handleChange} />

      <select name="Type" value={form.Type} onChange={handleChange}>
        <option value="">Select type</option>
        <option value="Debit">Debit</option>
        <option value="Credit">Credit</option>
      </select>

      <button onClick={submit}>Add Transaction</button>
    </>
  );
}

export default AddTransactionForm;
