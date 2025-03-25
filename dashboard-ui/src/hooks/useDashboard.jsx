// src/hooks/useDashboard.ts
import { useEffect, useState } from "react";
import { useAuth } from "./useAuth";
import { useDashboardStore } from "../store/useDashboardStore";
import toast from "react-hot-toast";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const useDashboard = () => {
  const { token, logout } = useAuth();

  const [loading, setLoading] = useState(false);

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
    filters,
    modal,
    setFilter,
    setModal,
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

    const text = await res.text(); // ← Intentamos obtener el texto de respuesta

    if (!text) return null; // ← Si está vacío, retornamos null

    try {
      return JSON.parse(text);
    } catch (error) {
      console.error(`Error parsing JSON for ${endpoint}`, error);
      return null;
    }
  };

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
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

      if (summaryRes) {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      } else {
        toast.remove();
        toast.error("Crea tu primera tarea para ver dashboard!");
        throw new Error("No hay datos para mostrar");
      }

      setSummary(summaryRes);

      setCategoryData(
        Object.entries(categoryRes).map(([name, value]) => ({
          name,
          value,
        }))
      );

      setTrendData(
        Object.entries(trendRes).map(([week, completed]) => ({
          week,
          completed,
        }))
      );

      setProductivityByDay(
        Object.entries(productivityRes).map(([day, completed]) => ({
          day,
          completed,
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
    loading,
    filters,
    modal,
    setFilter,
    setModal,
  };
};
