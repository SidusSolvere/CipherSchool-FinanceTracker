import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function SpendingByDayChart({
  data,
  height = 520,
}) {
  if (!data?.length) return null;

  return (
    <section className="w-full">
      <h3 className="mb-4 text-lg font-medium">
        Spending by Day
      </h3>

      <div style={{ width: "100%", height }}>
        <ResponsiveContainer>
          <BarChart data={data}>
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Bar
              dataKey="amount"
              fill="#dc2626"
              barSize={40}
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}