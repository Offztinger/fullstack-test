import { create } from "zustand";

export const useTasksStore = create((set) => ({
  tasks: [],
  modal: { open: false, data: null, type: null },

  setModal: (open, data, type = null) => {
    set({
      modal: {
        open,
        data,
        type,
      },
    });
  },

  closeModal: () =>
    set({
      modal: {
        open: false,
        data: null,
        type: null,
      },
    }),

  setTasks: (tasks) => set({ tasks }),
}));
