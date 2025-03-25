import { useDraggable } from "@dnd-kit/core";
import { useAuth } from "@/hooks/useAuth";
import { useMemo } from "react";

const KanbanTask = ({ task, onEdit, onDelete }) => {
  const { user } = useAuth();

  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: task.id,
    data: { task },
  });

  const style = useMemo(() => {
    return {
      transform: transform
        ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
        : undefined,
      transition: transform ? "none" : "transform 0.2s ease",
      opacity: isDragging ? 0.8 : 1,
      zIndex: isDragging ? 50 : "auto",
    };
  }, [transform, isDragging]);

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-white border rounded-xl shadow-sm hover:shadow-md p-3 transition-shadow flex flex-col gap-3 relative"
    >

      <div
        {...listeners}
        {...attributes}
        className="absolute top-2 left-2 text-gray-300 hover:text-gray-500 cursor-grab"
        title="Arrastrar"
      >
        <i className="fas fa-grip-lines" />
      </div>

      <div className="flex justify-between items-start pl-6">
        <h3 className="text-sm font-semibold text-gray-800">{task.title}</h3>
        <div className="flex gap-2">
          <button
            className="text-blue-500 hover:text-blue-700"
            onClick={() => onEdit(task)}
            title="Editar"
          >
            <i className="fas fa-pen" />
          </button>
          <button
            className="text-red-500 hover:text-red-700"
            onClick={() => onDelete(task)}
            title="Eliminar"
          >
            <i className="fas fa-trash" />
          </button>
        </div>
      </div>

      <div className="pl-6">
        <span className="bg-gray-200 text-gray-800 text-xs px-2 py-0.5 rounded-full font-medium">
          {task.status.replace("_", " ")}
        </span>
      </div>

      <div className="flex items-center gap-2 text-xs text-gray-500 pl-6">
        <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
          {user?.name?.slice(0, 2).toUpperCase() || "US"}
        </div>
        <span>{user?.name || "No asignado"}</span>
      </div>
    </div>
  );
};

export default KanbanTask;
