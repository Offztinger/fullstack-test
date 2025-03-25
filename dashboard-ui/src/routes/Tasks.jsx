// src/pages/Tasks.tsx
import { DndContext, closestCenter } from "@dnd-kit/core";
import KanbanBoard from "@/components/Tasks/KanbanBoard";
import { useTasks } from "@/hooks/useTasks";

const Tasks = () => {
  const { tasksByStatus, moveTask, showModal, taskToModify } = useTasks();

  const handleDragEnd = async (event) => {
    const { over, active } = event;
    if (!over || !active) return;

    const sourceStatus = active.data.current.task.status;
    const destinationStatus = over.id;

    if (sourceStatus !== destinationStatus) {
      await moveTask(active.id, destinationStatus);
    }
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <KanbanBoard tasks={tasksByStatus} />
    </DndContext>
  );
};

export default Tasks;
