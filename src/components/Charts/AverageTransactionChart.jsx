import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function AverageTransactionChart({ data }) {
  return (
    <section>
      <h3>Average Transaction Size</h3>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <XAxis dataKey="type" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="avg" fill="#0ea5e9" />
        </BarChart>
      </ResponsiveContainer>
    </section>
  );
}
