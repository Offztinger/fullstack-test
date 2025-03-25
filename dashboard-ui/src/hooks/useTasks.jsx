import { useTasksStore } from "@/store/useTasksStore";
import { useAuth } from "./useAuth";
import { useEffect } from "react";

export const useTasks = () => {
  const { token } = useAuth();
  const {
    tasks,
    setTasks,
    showModal,
    taskToModify,
    setTaskToModify,
    setShowModal,
    closeModal,
  } = useTasksStore();

  const fetchTasks = async () => {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/tasks`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setTasks(data);
  };

  const moveTask = async (id, newStatus) => {
    await fetch(`${import.meta.env.VITE_BACKEND_URL}/tasks/${id}/status`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status: newStatus }),
    });
    await fetchTasks();
  };

  const createTask = async (task) => {
    await fetch(`${import.meta.env.VITE_BACKEND_URL}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(task),
    });
    await fetchTasks();
  };

  const updateTask = async (id, task) => {
    await fetch(`${import.meta.env.VITE_BACKEND_URL}/tasks/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(task),
    });
    await fetchTasks();
  };

  const deleteTask = async (id) => {
    await fetch(`${import.meta.env.VITE_BACKEND_URL}/tasks/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    await fetchTasks();
  };

  useEffect(() => {
    if (token) fetchTasks();
  }, [token]);

  const tasksByStatus = {
    PENDING: tasks.filter((t) => t.status === "PENDING"),
    IN_PROGRESS: tasks.filter((t) => t.status === "IN_PROGRESS"),
    COMPLETED: tasks.filter((t) => t.status === "COMPLETED"),
  };

  return {
    tasksByStatus,
    moveTask,
    createTask,
    updateTask,
    deleteTask,
    showModal,
    taskToModify,
    setTaskToModify,
    setShowModal,
    closeModal,
  };
};
