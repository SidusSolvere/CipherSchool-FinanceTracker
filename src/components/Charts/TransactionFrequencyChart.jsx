import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function TransactionFrequencyChart({
  data,
  height = 520,
}) {
  if (!data?.length) return null;

  return (
    <section className="w-full">
      <h3 className="mb-4 text-lg font-medium">
        Transactions per Day
      </h3>

      <div style={{ width: "100%", height }}>
        <ResponsiveContainer>
          <BarChart data={data}>
            <XAxis
              dataKey="date"
              interval={0}
              angle={-30}
              textAnchor="end"
              height={80}
            />
            <YAxis />
            <Tooltip />
            <Bar
              dataKey="count"
              fill="#f59e0b"
              barSize={40}
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}