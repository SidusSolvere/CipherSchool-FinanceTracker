import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function RepeatedToFromChart({
  data,
  height = 520,
}) {
  if (!data?.length) return null;

  const BAR_WIDTH = 90;
  const MAX_WIDTH = 1400;

  const chartWidth = Math.min(
    data.length * BAR_WIDTH,
    MAX_WIDTH
  );

  return (
    <section className="w-full">
      <h3 className="mb-4 text-lg font-medium">
        Recurring Transactions
      </h3>

      <div style={{ overflowX: "auto" }}>
        <div style={{ width: chartWidth, height }}>
          <ResponsiveContainer>
            <BarChart data={data}>
              <XAxis
                dataKey="name"
                type="category"
                interval={0}
                angle={-35}
                textAnchor="end"
                height={90}
              />
              <YAxis />
              <Tooltip />
              <Bar
                dataKey="count"
                fill="#ef4444"
                barSize={40}
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
}