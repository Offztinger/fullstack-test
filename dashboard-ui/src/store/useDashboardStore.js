import { create } from "zustand";

export const useDashboardStore = create((set) => ({
  summary: null,
  categoryData: null,
  trendData: null,
  productivityByDay: null,
  completionRate: null,
  averageTime: null,
  abandonmentRate: null,

  setSummary: (summary) => set(() => ({ summary })),
  setCategoryData: (categoryData) => set(() => ({ categoryData })),
  setTrendData: (trendData) => set(() => ({ trendData })),
  setProductivityByDay: (productivityByDay) =>
    set(() => ({ productivityByDay })),
  setCompletionRate: (completionRate) => set(() => ({ completionRate })),
  setAverageTime: (averageTime) => set(() => ({ averageTime })),
  setAbandonmentRate: (abandonmentRate) => set(() => ({ abandonmentRate })),
}));
