import CashFlowChart from "./CashFlowChart";
import DebitCreditPie from "./DebitCreditPie";
import TopToFromBar from "./TopToFromBar";
import SpendingByDayChart from "./SpendingByDayChart";
import HourlySpendingChart from "./HourlySpendingChart";
import AverageTransactionChart from "./AverageTransactionChart";
import TransactionFrequencyChart from "./TransactionFrequencyChart";
import RepeatedToFromChart from "./RepeatedToFromChart";

import {
  buildDailyCashFlow,
  buildDebitCreditSplit,
  buildTopToFrom,
  buildSpendingByDay,
  buildHourlySpending,
  buildAverageTransactionSize,
  buildTransactionFrequency,
  buildRepeatedToFrom,
} from "../../config/aggregators";

import { useAnalytics } from "../../hooks/useAnalytics";

export default function DisplayCharts() {
  const { transactions, loading } = useAnalytics();

  if (loading) {
    return <p className="mt-6 text-center">Loading charts…</p>;
  }

  if (!transactions || !transactions.length) {
    return <p className="mt-6 text-center">No transactions to display</p>;
  }

  // 🔹 Aggregations
  const cashFlow = buildDailyCashFlow(transactions);
  const debitCredit = buildDebitCreditSplit(transactions);
  const topToFrom = buildTopToFrom(transactions);
  const spendingByDay = buildSpendingByDay(transactions);
  const hourlySpending = buildHourlySpending(transactions);
  const avgTransaction = buildAverageTransactionSize(transactions);
  const frequency = buildTransactionFrequency(transactions);
  const repeated = buildRepeatedToFrom(transactions);

  return (
    <div className="mt-6 grid gap-8 p-4 grid-cols-[repeat(auto-fit,minmax(380px,1fr))]">
      <CashFlowChart data={cashFlow} />
      <DebitCreditPie data={debitCredit} />
      <TopToFromBar data={topToFrom} />
      <SpendingByDayChart data={spendingByDay} />
      <HourlySpendingChart data={hourlySpending} />
      <AverageTransactionChart data={avgTransaction} />
      <TransactionFrequencyChart data={frequency} />
      <RepeatedToFromChart data={repeated} />
    </div>
  );
}
