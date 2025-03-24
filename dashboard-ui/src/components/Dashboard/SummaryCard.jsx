import MetricCard from "@/components/shared/MetricCard";

const SummaryCard = ({ data }) => {
  if (!data) return null;

  return (
    <MetricCard title="Resumen general">
      <ul className="text-sm divide-y divide-gray-200 border border-gray-200 rounded-lg overflow-hidden bg-white shadow">
        <li className="px-4 py-2 flex justify-between items-center">
          <span className="text-gray-700 font-medium">Total</span>
          <span className="text-gray-900">{data.total}</span>
        </li>
        <li className="px-4 py-2 flex justify-between items-center">
          <span className="text-green-600 font-medium">Completadas</span>
          <span className="font-semibold text-green-700">{data.completed}</span>
        </li>
        <li className="px-4 py-2 flex justify-between items-center">
          <span className="text-blue-600 font-medium">En progreso</span>
          <span className="font-semibold text-blue-700">{data.progress}</span>
        </li>
        <li className="px-4 py-2 flex justify-between items-center">
          <span className="text-yellow-600 font-medium">Pendientes</span>
          <span className="font-semibold text-yellow-700">{data.pending}</span>
        </li>
        <li className="px-4 py-2 flex justify-between items-center">
          <span className="text-red-600 font-medium">Eliminadas</span>
          <span className="font-semibold text-red-700">{data.deleted}</span>
        </li>
        <li className="px-4 py-2 flex justify-between items-center bg-gray-50">
          <span className="text-purple-600 font-medium">Completadas (%)</span>
          <span className="font-bold text-purple-700">
            {data.completionRate}%
          </span>
        </li>
      </ul>
    </MetricCard>
  );
};

export default SummaryCard;
