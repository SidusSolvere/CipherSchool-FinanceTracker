import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function HourlySpendingChart({ data }) {
  return (
    <section>
      <h3>Spending by Hour</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="hour" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="amount" fill="#7c3aed" />
        </BarChart>
      </ResponsiveContainer>
    </section>
  );
}
