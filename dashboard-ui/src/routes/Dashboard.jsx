import { useDashboard } from "../hooks/useDashboard";
import SummaryCard from "../components/Dashboard/SummaryCard";
import CategoryAverage from "../components/Dashboard/CategoryAverage";
import WeeklyTrend from "../components/Dashboard/WeeklyTrend";
import "@/styles/dashboard.css";
import ProductivityByDay from "../components/Dashboard/ProductivityByDay";
import CompletionRate from "../components/Dashboard/CompletionRate";
import AverageTime from "../components/Dashboard/AverageTime";
import AbandonmentRate from "../components/Dashboard/AbandonmentRate";

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

  return (
    <section className="w-full h-full flex gap-8 flex-col">
      <div className="grid grid-cols-2 gap-8">
        <SummaryCard data={summary} />
        <CategoryAverage data={categoryData} />
        <WeeklyTrend data={trendData} />
        <ProductivityByDay data={productivityByDay} />
      </div>
      <div className="grid grid-cols-3 gap-8 pb-6">
        <CompletionRate data={completionRate} />
        <AverageTime data={averageTime} />
        <AbandonmentRate data={abandonmentRate} />
      </div>
    </section>
  );
};

export default Dashboard;
