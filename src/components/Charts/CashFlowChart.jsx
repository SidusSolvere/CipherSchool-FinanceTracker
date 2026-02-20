import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function CashFlowChart({ data, height = 500 }) {
  if (!data?.length) return null;

  return (
    <section className="w-full">
      <h3 className="mb-4 text-lg font-medium">
        Cash Flow Over Time
      </h3>

      <div style={{ width: "100%", height }}>
        <ResponsiveContainer>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line
              dataKey="net"
              stroke="#16a34a"
              strokeWidth={3}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}