// src/store/useDashboardStore.ts
import { create } from "zustand";

const DASHBOARD_FILTERS_KEY = "DASHBOARD_FILTERS";

const defaultFilters = {
  summary: true,
  categoryAverage: true,
  weeklyTrend: true,
  productivityByDay: true,
  completionRate: true,
  averageTime: true,
  abandonmentRate: true,
};

const storedFilters =
  JSON.parse(localStorage.getItem(DASHBOARD_FILTERS_KEY)) || defaultFilters;

export const useDashboardStore = create((set) => ({
  summary: null,
  categoryData: null,
  trendData: null,
  productivityByDay: null,
  completionRate: null,
  averageTime: null,
  abandonmentRate: null,
  filters: storedFilters,
  modal: false,

  setSummary: (summary) => set({ summary }),
  setCategoryData: (categoryData) => set({ categoryData }),
  setTrendData: (trendData) => set({ trendData }),
  setProductivityByDay: (productivityByDay) => set({ productivityByDay }),
  setCompletionRate: (completionRate) => set({ completionRate }),
  setAverageTime: (averageTime) => set({ averageTime }),
  setAbandonmentRate: (abandonmentRate) => set({ abandonmentRate }),

  setModal: (state) => set({ modal: state }),

  setFilter: (filterKey, value) =>
    set((state) => {
      const updatedFilters = { ...state.filters, [filterKey]: value };
      localStorage.setItem(
        DASHBOARD_FILTERS_KEY,
        JSON.stringify(updatedFilters)
      );
      return { filters: updatedFilters };
    }),

  setAllFilters: (newFilters) => {
    localStorage.setItem(DASHBOARD_FILTERS_KEY, JSON.stringify(newFilters));
    set({ filters: newFilters });
  },
}));
