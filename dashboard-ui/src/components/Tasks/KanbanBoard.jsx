import React from "react";
import KanbanColumn from "./KanbanColumn";
import { useTasks } from "@/hooks/useTasks";

const STATUSES = ["PENDING", "IN_PROGRESS", "COMPLETED"];

const KanbanBoard = ({ tasks }) => {
  const { setModal } = useTasks();

  const openModal = () => {
    setModal(true, null, "create");
  };

  return (
    <section className="flex flex-col items-start w-full h-full p-4 gap-4">
      <button
        onClick={openModal}
        className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
      >
        Crear tarea
      </button>
      <div className="h-full w-full grid grid-cols-1 lg:grid-cols-3 gap-4">
        {STATUSES.map((status) => (
          <KanbanColumn key={status} status={status} tasks={tasks[status]} />
        ))}
      </div>
    </section>
  );
};

export default KanbanBoard;
