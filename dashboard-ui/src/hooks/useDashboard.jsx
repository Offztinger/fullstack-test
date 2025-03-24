// src/hooks/useDashboard.ts
import { useEffect, useState } from "react";
import { useAuth } from "./useAuth";
import { useDashboardStore } from "../store/useDashboardStore";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const useDashboard = () => {
  const { token, logout } = useAuth();

  const {
    summary,
    categoryData,
    trendData,
    productivityByDay,
    completionRate,
    averageTime,
    abandonmentRate,
    setSummary,
    setCategoryData,
    setTrendData,
    setProductivityByDay,
    setCompletionRate,
    setAverageTime,
    setAbandonmentRate,
  } = useDashboardStore();

  const fetchWithAuth = async (endpoint) => {
    const res = await fetch(`${BACKEND_URL}/dashboard/${endpoint}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      logout();
      throw new Error(`Error fetching ${endpoint}`);
    }

    return res.json();
  };

  const fetchDashboardData = async () => {
    try {
      const [
        summaryRes,
        categoryRes,
        trendRes,
        productivityRes,
        rateRes,
        avgRes,
        abandonmentRes,
      ] = await Promise.all([
        fetchWithAuth("summary"),
        fetchWithAuth("category-average"),
        fetchWithAuth("productivity-trend"),
        fetchWithAuth("productivity-by-day"),
        fetchWithAuth("completion-rate"),
        fetchWithAuth("average-completion"),
        fetchWithAuth("abandonment-rate"),
      ]);

      setSummary(summaryRes);

      setCategoryData(
        Object.entries(categoryRes).map(([name, value]) => ({
          name,
          value,
        }))
      );

      setTrendData(
        Object.entries(trendRes).map(([week, count]) => ({
          week,
          count,
        }))
      );

      setProductivityByDay(
        Object.entries(productivityRes).map(([day, count]) => ({
          day,
          count,
        }))
      );

      setCompletionRate(rateRes);
      setAverageTime(avgRes);
      setAbandonmentRate(abandonmentRes);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (token) fetchDashboardData();
  }, [token]);

  return {
    summary,
    categoryData,
    trendData,
    productivityByDay,
    completionRate,
    averageTime,
    abandonmentRate,
  };
};
