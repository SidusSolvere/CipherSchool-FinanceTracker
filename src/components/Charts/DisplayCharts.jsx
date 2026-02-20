import { useState } from "react";
import GlassSurface from "@/components/GlassSurface";
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

const CHARTS = [
  { key: "cashflow", label: "Cash Flow", component: CashFlowChart, build: buildDailyCashFlow },
  { key: "debitcredit", label: "Debit / Credit", component: DebitCreditPie, build: buildDebitCreditSplit },
  { key: "toptofrom", label: "Top To / From", component: TopToFromBar, build: buildTopToFrom },
  { key: "spendingday", label: "Spending by Day", component: SpendingByDayChart, build: buildSpendingByDay },
  { key: "hourly", label: "Hourly Spending", component: HourlySpendingChart, build: buildHourlySpending },
  { key: "average", label: "Avg Transaction", component: AverageTransactionChart, build: buildAverageTransactionSize },
  { key: "frequency", label: "Frequency", component: TransactionFrequencyChart, build: buildTransactionFrequency },
  { key: "repeated", label: "Recurring", component: RepeatedToFromChart, build: buildRepeatedToFrom },
];

export default function DisplayCharts() {
  const { transactions, loading } = useAnalytics();
  const [activeChart, setActiveChart] = useState("cashflow");

  if (loading) return <p className="mt-6 text-center">Loading charts…</p>;
  if (!transactions?.length)
    return <p className="mt-6 text-center">No transactions to display</p>;

  const chart = CHARTS.find(c => c.key === activeChart);
  const ChartComponent = chart.component;
  const data = chart.build(transactions);

  return (
    <div className="mt-6 p-4">
      < GlassSurface blur={20} opacity={0.25} borderRadius={16} className="mb-6">
        <div className="flex gap-2 p-3 overflow-x-auto">
          {CHARTS.map(c => (
            <button
              key={c.key}
              onClick={() => setActiveChart(c.key)}
              className={`px-4 py-2 rounded-xl text-sm transition whitespace-nowrap
                ${
                  activeChart === c.key
                    ? "bg-white/30 text-white"
                    : "text-white/70 hover:bg-white/20"
                }
              `}
            >
              {c.label}
            </button>
          ))}
        </div>
      </ GlassSurface>
 <GlassSurface
        blur={24}
        opacity={0.18}
        borderRadius={24}
        className="max-w-7xl mx-auto p-6"
      >
        <div className="min-h-[520px] w-full flex items-center justify-center">
          <ChartComponent data={data} />
        </div>
      </GlassSurface>
    </div>
  );
}