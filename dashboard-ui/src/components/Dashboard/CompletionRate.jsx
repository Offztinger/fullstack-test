import { PieChart, Pie, Cell } from "recharts";
import MetricCard from "@/components/shared/MetricCard";

const CompletionRate = ({ data }) => {
  if (!data) return null;

  const chartData = [
    { name: "Completed", value: data.rate },
    { name: "Remaining", value: 100 - data.rate },
  ];

  return (
    <MetricCard title="Porcentaje de completadas vs pendientes">
      <div className="relative w-32 h-32 mx-auto">
        <PieChart width={128} height={128}>
          <Pie
            data={chartData}
            innerRadius={45}
            outerRadius={60}
            dataKey="value"
            startAngle={90}
            endAngle={-270}
          >
            <Cell fill="#00C49F" />
            <Cell fill="#E0E0E0" />
          </Pie>
        </PieChart>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-[#00C49F] font-bold text-xl">
          {data.rate.toFixed(0)}%
        </div>
      </div>
      <p className="text-sm text-center font-semibold text-gray-600 mt-2">
        De {data.total} tareas, {data.completed} se completaron
      </p>
    </MetricCard>
  );
};

export default CompletionRate;
