import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function TopToFromBar({
  data,
  nameKey = "name",
  valueKey = "amount",
  height = 520,
}) {
  if (!data?.length) return null;

  const BAR_WIDTH = 80;
  const MAX_WIDTH = 1200;

  const chartWidth = Math.min(
    data.length * BAR_WIDTH,
    MAX_WIDTH
  );

  return (
    <section className="w-full">
      <h3 className="mb-4 text-lg font-medium">
        Top Recipients / Sources
      </h3>

      <div style={{ overflowX: "auto" }}>
        <div style={{ width: chartWidth, height }}>
          <ResponsiveContainer>
            <BarChart data={data}>
              <XAxis
                dataKey={nameKey}
                type="category"
                interval={0}
                angle={-35}
                textAnchor="end"
                height={90}
                tickMargin={10}
              />
              <YAxis type="number" />
              <Tooltip />
              <Bar
                dataKey={valueKey}
                fill="#dc2626"
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