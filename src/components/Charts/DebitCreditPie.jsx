import {
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const COLORS = ["#16a34a", "#dc2626"];

export default function DebitCreditPie({
  data,
  height = 520,
}) {
  if (!data?.length) return null;

  return (
    <section className="w-full">
      <h3 className="mb-4 text-lg font-medium">
        Income vs Spending
      </h3>

      <div style={{ width: "100%", height }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius="80%"
              innerRadius="45%"
              label
            >
              {data.map((_, i) => (
                <Cell
                  key={i}
                  fill={COLORS[i % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}