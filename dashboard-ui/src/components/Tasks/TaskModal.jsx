import TaskForm from "./TaskForm";
import TaskDelete from "./TaskDelete";
import { useTasks } from "@/hooks/useTasks";
import TaskDraggable from "./TaskDraggable";

const TaskModal = () => {
  const { modal, closeModal } = useTasks();

  if (!modal.open) return null;

  return (
    <div className="fixed inset-0 bg-black/40  backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md relative">
        <button
          onClick={closeModal}
          className="absolute top-2 right-2 text-gray-600 hover:text-black cursor-pointer"
        >
          <i className="fas fa-times" />
        </button>

        {modal.type === "create" && <TaskForm mode="create" />}
        {modal.type === "edit" && <TaskForm mode="edit" task={modal.data} />}
        {modal.type === "delete" && <TaskDelete task={modal.data} />}
        {modal.type === "draggable" && <TaskDraggable data={modal.data} />}
      </div>
    </div>
  );
};

export default TaskModal;
