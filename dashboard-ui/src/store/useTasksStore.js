import { create } from "zustand";

export const useTasksStore = create((set) => ({
  tasks: [],
  showModal: { state: false, type: null },
  taskToModify: null,

  setTaskToModify: (task) => set({ taskToModify: task }),

  setShowModal: (state, type = null) =>
    set({
      showModal: {
        state,
        type,
      },
    }),

  closeModal: () =>
    set({
      showModal: {
        state: false,
        type: null,
      },
    }),
  setTasks: (tasks) => set({ tasks }),
}));
