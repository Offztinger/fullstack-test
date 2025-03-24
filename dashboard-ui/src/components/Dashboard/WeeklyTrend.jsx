import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import MetricCard from "@/components/shared/MetricCard";

const WeeklyTrend = ({ data }) => {
  if (!data) return null;

  return (
    <MetricCard title="Tendencia de productividad (últimas semanas)">
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="week" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="completed" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </MetricCard>
  );
};

export default WeeklyTrend;
