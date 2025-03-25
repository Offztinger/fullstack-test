// src/components/Kanban/KanbanColumn.tsx
import { useDroppable } from "@dnd-kit/core";
import KanbanTask from "./KanbanTask";
import useTasks from "@/hooks/useTasks";

const statusTitles = {
  PENDING: "Pendientes",
  IN_PROGRESS: "En progreso",
  COMPLETED: "Completadas",
};

const KanbanColumn = ({ status, tasks }) => {
  const { setNodeRef } = useDroppable({ id: status });
  const { setShowModal, setTaskToModify } = useTasks();

  const onEdit = async (task) => {
    setTaskToModify(task);
    setShowModal(true, "edit");
  };

  const onDelete = async (task) => {
    setTaskToModify(task);
    setShowModal(true, "delete");
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
