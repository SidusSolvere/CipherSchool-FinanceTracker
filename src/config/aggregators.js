export function buildDailyCashFlow(transactions) {
  const map = {};

  transactions.forEach((tx) => {
    const date = toDateKey(tx.Date);
    const signed =
      tx.Type === "Debit" ? tx.Amount : -tx.Amount;

    map[date] = (map[date] || 0) + signed;
  });

  return toSortedArray(map, "date", "net");
}

export function buildMonthlyCashFlow(transactions) {
  const map = {};

  transactions.forEach((tx) => {
    const d = toJSDate(tx.Date);
    const key = `${d.getFullYear()}-${String(
      d.getMonth() + 1
    ).padStart(2, "0")}`;

    const signed =
      tx.Type === "Debit" ? tx.Amount : -tx.Amount;

    map[key] = (map[key] || 0) + signed;
  });

  return toSortedArray(map, "month", "net");
}

export function buildDebitCreditSplit(transactions) {
  let debit = 0;
  let credit = 0;

  transactions.forEach((tx) => {
    if (tx.Type === "Debit") debit += tx.Amount;
    else credit += tx.Amount;
  });

  return [
    { name: "Debit", value: debit },
    { name: "Credit", value: credit },
  ];
}

export function buildTopToFrom(transactions, limit = 10) {
  const map = {};

  transactions.forEach((tx) => {
    const key = tx.ToFrom || "Unknown";
    map[key] = (map[key] || 0) + tx.Amount;
  });

  return Object.entries(map)
    .map(([name, amount]) => ({ name, amount }))
    .sort((a, b) => b.amount - a.amount)
    .slice(0, limit);
}

export function buildSpendingByDay(transactions) {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const map = Object.fromEntries(days.map((d) => [d, 0]));

  transactions.forEach((tx) => {
    if (tx.Type !== "Credit") return;

    const d = toJSDate(tx.Date);
    const day = days[d.getDay()];
    map[day] += tx.Amount;
  });

  return days.map((d) => ({ day: d, amount: map[d] }));
}

export function buildHourlyFrequency(transactions) {
  const map = Array.from({ length: 24 }, (_, i) => ({
    hour: i,
    count: 0,
  }));

  transactions.forEach((tx) => {
    const hour = toJSDate(tx.Date).getHours();
    map[hour].count += 1;
  });

  return map;
}

export function buildHourlySpending(transactions) {
  const map = Array.from({ length: 24 }, (_, i) => ({
    hour: i,
    amount: 0,
  }));

  transactions.forEach((tx) => {
    if (tx.Type !== "Credit") return;

    const hour = toJSDate(tx.Date).getHours();
    map[hour].amount += tx.Amount;
  });

  return map;
}

export function buildAverageTransactionSize(transactions) {
  let debitSum = 0,
    debitCount = 0;
  let creditSum = 0,
    creditCount = 0;

  transactions.forEach((tx) => {
    if (tx.Type === "Debit") {
      debitSum += tx.Amount;
      debitCount++;
    } else {
      creditSum += tx.Amount;
      creditCount++;
    }
  });

  return [
    {
      type: "Debit",
      avg: debitCount ? debitSum / debitCount : 0,
    },
    {
      type: "Credit",
      avg: creditCount ? creditSum / creditCount : 0,
    },
  ];
}

export function buildTransactionFrequency(transactions) {
  const map = {};

  transactions.forEach((tx) => {
    const date = toDateKey(tx.Date);
    map[date] = (map[date] || 0) + 1;
  });

  return toSortedArray(map, "date", "count");
}

export function buildRepeatedToFrom(transactions, minCount = 3) {
  const map = {};

  transactions.forEach((tx) => {
    const key = tx.ToFrom || "Unknown";
    map[key] = (map[key] || 0) + 1;
  });

  return Object.entries(map)
    .filter(([, count]) => count >= minCount)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}

function toJSDate(date) {
  return date.toDate ? date.toDate() : new Date(date);
}

function toDateKey(date) {
  return toJSDate(date).toISOString().slice(0, 10);
}

function toSortedArray(map, xKey, yKey) {
  return Object.entries(map)
    .map(([k, v]) => ({ [xKey]: k, [yKey]: v }))
    .sort((a, b) => new Date(a[xKey]) - new Date(b[xKey]));
}
