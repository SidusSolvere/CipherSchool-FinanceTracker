import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function SpendingByDayChart({ data }) {
  return (
    <section>
      <h3>Spending by Day</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="amount" fill="#dc2626" />
        </BarChart>
      </ResponsiveContainer>
    </section>
  );
}
