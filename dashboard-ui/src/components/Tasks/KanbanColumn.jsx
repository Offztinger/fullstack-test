// src/components/Kanban/KanbanColumn.tsx
import { useDroppable } from "@dnd-kit/core";
import { useTasks } from "@/hooks/useTasks";
import KanbanTask from "./KanbanTask";

const statusTitles = {
  PENDING: "Pendientes",
  IN_PROGRESS: "En progreso",
  COMPLETED: "Completadas",
};

const KanbanColumn = ({ status, tasks }) => {
  const { setNodeRef } = useDroppable({ id: status });
  const { setModal } = useTasks();

  const onEdit = async (task) => {
    setModal(true, task, "edit");
  };

  const onDelete = async (task) => {
    setModal(true, task, "delete");
  };

  return (
    <div
      ref={setNodeRef}
      className="flex flex-col gap-4 bg-white p-4 rounded shadow h-full"
    >
      <h3 className="font-bold text-lg mb-2">{statusTitles[status]}</h3>
      {tasks?.map((task) => (
        <KanbanTask
          key={task.id}
          task={task}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default KanbanColumn;
