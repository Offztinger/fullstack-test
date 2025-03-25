import { PieChart, Pie, Cell } from "recharts";
import MetricCard from "@/components/shared/MetricCard";

const AbandonmentRate = ({ data }) => {
  if (!data) return null;

  const chartData = [
    { name: "Abandonadas", value: data.abandonment_rate },
    { name: "Restantes", value: 100 - data.abandonment_rate },
  ];

  return (
    <MetricCard title="Tasa de abandono">
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
            <Cell fill="#F44336" />
            <Cell fill="#E0E0E0" />
          </Pie>
        </PieChart>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-[#F44336] font-bold text-xl">
          {data.abandonment_rate.toFixed(0)}%
        </div>
      </div>
      <p className="text-sm text-center font-semibold text-gray-600 mt-2">
        De {data.total} tareas,{" "}
        {data.abandoned !== 0
          ? `${data.abandoned} fue abandonada sin completarse`
          : "ninguna fue abandonada"}
      </p>
    </MetricCard>
  );
};

export default AbandonmentRate;
