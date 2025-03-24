import CategoryAverage from "../components/Dashboard/CategoryAverage";
import { useDashboard } from "../hooks/useDashboard";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AA66CC"];

const Dashboard = () => {
  const {
    summary,
    categoryData,
    trendData,
    productivityByDay,
    completionRate,
    averageTime,
    abandonmentRate,
  } = useDashboard();

  if (!summary)
    return <div className="text-center mt-8">Cargando datos...</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
      <div>
        <h2 className="text-xl font-bold mb-4">Resumen</h2>
        <ul className="list-disc ml-5 space-y-1">
          <li>Total: {summary.total}</li>
          <li>Completadas: {summary.completed}</li>
          <li>En progreso: {summary.progress}</li>
          <li>Pendientes: {summary.pending}</li>
          <li>Eliminadas: {summary.deleted}</li>
          <li>Porcentaje completado: {summary.completionRate}%</li>
        </ul>
      </div>

      <CategoryAverage categoryData={categoryData} COLORS={COLORS} />
    </div>
  );
};

export default Dashboard;
