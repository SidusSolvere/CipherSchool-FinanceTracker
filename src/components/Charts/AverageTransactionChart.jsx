import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function AverageTransactionChart({
  data,
  height = 520,
}) {
  if (!data?.length) return null;

  return (
    <section className="w-full">
      <h3 className="mb-4 text-lg font-medium">
        Average Transaction Size
      </h3>

      <div style={{ width: "100%", height }}>
        <ResponsiveContainer>
          <BarChart data={data}>
            <XAxis dataKey="type" />
            <YAxis />
            <Tooltip />
            <Bar
              dataKey="avg"
              fill="#0ea5e9"
              barSize={60}
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}