import { normalizeDate } from "../config/extractPdf";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db, auth } from "../config/firebase";
import { FiUpload, FiFileText } from "react-icons/fi";
import GlassSurface from "@/components/GlassSurface";



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
    
<div >
  <GlassSurface
    borderRadius={24}
    className="
      w-full
      px-6 py-3
      border border-white/20
      hover:border-white/80
      flex items-center
    "
  >
    <div className="flex items-center gap-4">
      <input
        type="file"
        accept="application/pdf"
        id="pdf-upload"
        onChange={handleUpload}
        className="hidden"
      />

      <label
        htmlFor="pdf-upload"
        className="
          flex items-center gap-2
          px-4 py-1.5
          rounded-full
          text-white/80
          border border-white/20
          hover:border-white/80
          hover:text-white
          cursor-pointer
          transition
        "
      >
        <FiUpload size={16} />
        <span>Upload PDF</span>
      </label>

      <div className="flex items-center gap-2 text-white/60 text-sm">
        <FiFileText size={14} />
        <span>PDF only</span>
      </div>
    </div>

    <div className="flex-1" />
  </GlassSurface>
</div>
  );
}

export default UploadPdf;
