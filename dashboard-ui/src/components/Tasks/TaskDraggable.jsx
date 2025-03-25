import { useTasks } from "@/hooks/useTasks";
const TaskDraggable = ({ data }) => {
  const { moveTask, closeModal } = useTasks();

  const { id, task = {}, status } = data;

  const handleConfirm = async () => {
    await moveTask(id, status);
    closeModal();
  };

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-lg font-semibold text-green-600">
        ¿{status === "COMPLETED" ? "Completar" : "Reabrir"} tarea?
      </h2>
      <p>
        Esta acción marcará como{" "}
        {status === "COMPLETED" ? "completada" : "no completada"} la tarea{" "}
        <strong>'{task.title}'</strong>.
      </p>
      <div className="flex justify-end gap-2">
        <button
          onClick={closeModal}
          className="cursor-pointer bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
        >
          Cancelar
        </button>
        <button
          onClick={handleConfirm}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-500 cursor-pointer"
        >
          {status === "COMPLETED" ? "Completar" : "Reabrir"}
        </button>
      </div>
    </div>
  );
};

export default TaskDraggable;
