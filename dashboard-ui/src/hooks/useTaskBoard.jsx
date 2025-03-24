import { useEffect } from "react";
import { useAuth } from "./useAuth";
import { useTasksStore } from "@/store/useTasksStore";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const useTasksBoard = () => {
  const { token, logout } = useAuth();
  const { tasks, setTasks } = useTasksStore();

  const fetchTasks = async () => {
    const res = await fetch(`${BACKEND_URL}/tasks`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) {
      logout();
      return;
    }

    const data = await res.json();
    setTasks(data);
  };

  const updateTaskStatus = async (id, status) => {
    const res = await fetch(`${BACKEND_URL}/tasks/${id}/status`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    });

    if (res.ok) {
      await fetchTasks(); // refrescamos estado local
    }
  };

  useEffect(() => {
    if (token) fetchTasks();
  }, [token]);

  return { tasks, updateTaskStatus };
};
