import { PieChart, Pie, Cell } from "recharts";
import MetricCard from "@/components/shared/MetricCard";

const AverageTime = ({ data }) => {
  if (!data) return null;

  const percentage = Math.min(data.averageHours * 10, 100); // Escalado para visual

  const chartData = [
    { name: "Tiempo", value: percentage },
    { name: "Restante", value: 100 - percentage },
  ];

  return (
    <MetricCard title="Tiempo promedio (creación hasta completitud)">
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
            <Cell fill="#2196F3" />
            <Cell fill="#E0E0E0" />
          </Pie>
        </PieChart>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-[#2196F3] font-bold text-xl">
          {data.averageHours.toFixed(1)}h
        </div>
      </div>
      <p className="text-sm text-center font-semibold text-gray-600 mt-2">
        Basado en {data.tasksCompleted} tareas
      </p>
    </MetricCard>
  );
};

export default AverageTime;
