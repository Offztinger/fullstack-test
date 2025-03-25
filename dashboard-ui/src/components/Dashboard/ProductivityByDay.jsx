import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import MetricCard from "@/components/shared/MetricCard";
import { DAYS } from "../../utils/handler";

const ProductivityByDay = ({ data }) => {
  if (!data) return null;

  const formattedData = data.map(({ day, completed }) => ({
    day: DAYS[day] || day,
    completed,
  }));

  return (
    <MetricCard title="Días de mayor productividad">
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={formattedData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="completed" fill="#00C49F" />
        </BarChart>
      </ResponsiveContainer>
    </MetricCard>
  );
};

export default ProductivityByDay;
