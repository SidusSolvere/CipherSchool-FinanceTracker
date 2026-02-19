import { normalizeDate } from "../config/extractPdf";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db, auth } from "../config/firebase";

function UploadPdf() {
  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const transactions = await normalizeDate(file);

    const user = auth.currentUser;
    if (!user) return;

    for (const tx of transactions) {
      await addDoc(collection(db, "Transactions"), {
        ...tx,
        Date: Timestamp.fromDate(tx.Date),
        UserId: user.uid,
      });
    }

    alert(`${transactions.length} transactions imported`);
  };

  return (
    <input
      type="file"
      accept="application/pdf"
      onChange={handleUpload}
    />
  );
}

export default UploadPdf;
