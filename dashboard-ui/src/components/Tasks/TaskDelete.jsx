import { useTasks } from "@/hooks/useTasks";

const TaskDelete = ({ task }) => {
  const { deleteTask, closeModal } = useTasks();

  const handleConfirm = async () => {
    await deleteTask(task.id);
    closeModal();
  };

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-lg font-semibold text-red-600">¿Eliminar tarea?</h2>
      <p>
        Esta acción{" "}
        {task.status === "COMPLETED" ? "eliminará" : "marcará como abandonada"}{" "}
        la tarea <strong>{task.title}</strong>.
      </p>
      <div className="flex justify-end gap-2">
        <button
          onClick={closeModal}
          className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Cancelar
        </button>
        <button
          onClick={handleConfirm}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 cursor-pointer"
        >
          Confirmar
        </button>
      </div>
    </div>
  );
};

export default TaskDelete;
