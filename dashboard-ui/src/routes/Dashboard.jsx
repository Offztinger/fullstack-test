import { useDashboard } from "@/hooks/useDashboard";
import SummaryCard from "@/components/Dashboard/SummaryCard";
import CategoryAverage from "@/components/Dashboard/CategoryAverage";
import WeeklyTrend from "@/components/Dashboard/WeeklyTrend";
import ProductivityByDay from "@/components/Dashboard/ProductivityByDay";
import CompletionRate from "@/components/Dashboard/CompletionRate";
import AverageTime from "@/components/Dashboard/AverageTime";
import AbandonmentRate from "@/components/Dashboard/AbandonmentRate";
import DashboardSkeleton from "@/components/Dashboard/DashboardSkeleton";
import FilterModal from "@/components/Dashboard/FilterModal";
import "@/styles/dashboard.css";

const Dashboard = () => {
  const {
    summary,
    categoryData,
    trendData,
    productivityByDay,
    completionRate,
    averageTime,
    abandonmentRate,
    loading,
    filters,
    modal,
    setModal,
  } = useDashboard();

  if (loading) return <DashboardSkeleton />;

  return (
    <section className="w-full h-full flex gap-8 flex-col">
      {modal && <FilterModal onClose={() => setModal(false)} />}

      <div className="grid gap-8 [grid-template-columns:repeat(auto-fit,_minmax(600px,_1fr))]">
        {filters.summary && <SummaryCard data={summary} />}
        {filters.categoryAverage && <CategoryAverage data={categoryData} />}
        {filters.weeklyTrend && <WeeklyTrend data={trendData} />}
        {filters.productivityByDay && (
          <ProductivityByDay data={productivityByDay} />
        )}
      </div>

      <div className="grid gap-8 pb-6 [grid-template-columns:repeat(auto-fit,_minmax(400px,_1fr))]">
        {filters.completionRate && <CompletionRate data={completionRate} />}
        {filters.averageTime && <AverageTime data={averageTime} />}
        {filters.abandonmentRate && <AbandonmentRate data={abandonmentRate} />}
      </div>
    </section>
  );
};

export default Dashboard;
