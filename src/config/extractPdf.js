import * as pdfjsLib from "pdfjs-dist";
import pdfWorker from "pdfjs-dist/build/pdf.worker?url";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

export async function extractTextFromPDF(file) {
  const buffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: buffer }).promise;

  let fullText = "";

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    fullText += content.items.map((i) => i.str).join(" ") + " ";
  }

  return fullText;
}
export async function normalizeDate(file) {
  const rawText = await extractTextFromPDF(file);

  const text = rawText.replace(/\s+/g, " ");

  const txRegex =
    /(\d{2} \w{3}, \d{4}\s+\d{2}:\d{2} (?:AM|PM))\s+(Received from|Paid to)\s+(.+?)\s+₹([\d,]+)/g;

  const matches = [...text.matchAll(txRegex)];

  return matches.map((m) => {
    const fullBlock = m[0];

    const idMatch = fullBlock.match(
      /UPI Transaction ID[:\s]+(\d{6,})/i
    );

    return {
      Date: new Date(m[1]),
      Amount: Number(m[4].replace(/,/g, "")),
      Type: m[2] === "Received from" ? "Debit" : "Credit",
      ToFrom: cleanName(m[3]),
      TransactionId: idMatch ? idMatch[1] : "",
    };
  });
}

function cleanName(str) {
  return str
    .replace(/upi|transaction|id|paid|received/gi, "")
    .replace(/\d+/g, "")
    .trim();
}
