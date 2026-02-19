import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function TopToFromBar({ data }) {
  if (!data.length) return null;

  return (
    <section>
      <h3>Top Recipients / Sources</h3>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data} layout="vertical">
          <XAxis type="number" />
          <YAxis dataKey="name" type="category" width={120} />
          <Tooltip />
          <Bar dataKey="amount" fill="#2563eb" />
        </BarChart>
      </ResponsiveContainer>
    </section>
  );
}
