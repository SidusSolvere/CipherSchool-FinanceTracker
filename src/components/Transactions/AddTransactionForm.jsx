import { useState } from "react";
import GlassSurface from "../GlassSurface";

function AddTransactionForm({ onAdd }) {
  const [form, setForm] = useState({
    Amount: "",
    Date: "",
    ToFrom: "",
    TransactionId: "",
    Type: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

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
      <div className="flex h-8   m-16 justify-center px-4 py-3">
      <GlassSurface
        borderRadius={32}
        className="
      p-2
      sm:p-8
      border border-white/20
      hover:border-white/80
    "
      >
        <form className="flex flex-row w-full gap-2  ">
          <div className="flex items-center">
            <label className=" text-white/70">Amount</label>
            <GlassSurface
              borderRadius={16}
              height={42}
              className="p-3 bg-white/10 backdrop-blur-md border border-white/20 hover:border-white/80"
            >
              <input
                type="number"
                name="Amount"
                value={form.Amount}
                onChange={handleChange}
                className="w-full bg-transparent outline-none text-white"
              />
            </GlassSurface>
          </div>

          <div className="flex items-center  ">
            <label className="  text-white/70">Date</label>
            <GlassSurface
              borderRadius={16}
              height={42}
              className=" bg-white/10 backdrop-blur-md border border-white/20 hover:border-white/80"
            >
              <input
                type="datetime-local"
                name="Date"
                value={form.Date}
                onChange={handleChange}
                className="w-full bg-transparent outline-none text-white"
              />
            </GlassSurface>
          </div>

          <div className="flex items-center  ">
            <label className="  text-white/70">To / From</label>
            <GlassSurface
              borderRadius={16}
              height={42}
              className="p-3 bg-white/10 backdrop-blur-md border border-white/20 hover:border-white/80"
            >
              <input
                name="ToFrom"
                value={form.ToFrom}
                onChange={handleChange}
                className="w-full bg-transparent outline-none text-white"
              />
            </GlassSurface>
          </div>

          <div className="flex items-center  ">
            <label className="  text-white/70">Txn ID</label>
            <GlassSurface
              borderRadius={16}
              height={42}
              className="p-3 bg-white/10 backdrop-blur-md border border-white/20 hover:border-white/80"
            >
              <input
                name="TransactionId"
                value={form.TransactionId}
                onChange={handleChange}
                className="w-full bg-transparent outline-none text-white"
              />
            </GlassSurface>
          </div>

          <div className="flex items-center  ">
            <label className="  text-white/70">Type</label>
            <GlassSurface
              borderRadius={16}
              height={42}
              className="p-3 bg-white/10 backdrop-blur-md border border-white/20 hover:border-white/80"
            >
              <select
                name="Type"
                value={form.Type}
                onChange={handleChange}
                className="w-full bg-transparent outline-none text-white"
              >
                <option value="" className="text-black">
                  Select
                </option>
                <option value="Debit" className="text-black">
                  Debit
                </option>
                <option value="Credit" className="text-black">
                  Credit
                </option>
              </select>
            </GlassSurface>
          </div>

          <div className="flex justify-end ">
            <button type="button" onClick={submit} className="rounded-3xl">
              <GlassSurface
                borderRadius={16}
                height={44}
                className="text-white border border-white/20 hover:border-white/80 flex items-center justify-center"
              >
                Add Transaction
              </GlassSurface>
            </button>
          </div>
        </form>
      </GlassSurface>
    </div>
  );
}

export default AddTransactionForm;
