// src/pages/Tasks.tsx
import { DndContext, closestCenter } from "@dnd-kit/core";
import { useTasks } from "@/hooks/useTasks";
import KanbanBoard from "@/components/Tasks/KanbanBoard";
import TaskModal from "@/components/Tasks/TaskModal";

const Tasks = () => {
  const { tasksByStatus, moveTask, setModal } = useTasks();

  const handleDragEnd = async (event) => {
    const { over, active } = event;
    if (!over || !active) return;

    const sourceStatus = active.data.current.task.status;
    const destinationStatus = over.id;

    if (sourceStatus !== destinationStatus) {
      if (
        destinationStatus === "COMPLETED" ||
        (sourceStatus === "COMPLETED" && destinationStatus !== "COMPLETED")
      ) {
        setModal(
          true,
          {
            id: active.id,
            task: active.data.current.task,
            status: destinationStatus,
          },
          "draggable"
        );
      } else {
        await moveTask(active.id, destinationStatus);
      }
    }
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <TaskModal />
      <KanbanBoard tasks={tasksByStatus} />
    </DndContext>
  );
};

export default Tasks;
