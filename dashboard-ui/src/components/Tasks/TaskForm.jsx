import { useForm } from "react-hook-form";
import { useTasks } from "@/hooks/useTasks";
import "@/styles/login.css";

const TaskForm = ({ mode, task }) => {
  const { createTask, updateTask, closeModal } = useTasks();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: task || { title: "", description: "", status: "PENDING" },
  });

  const onSubmit = async (data) => {
    if (mode === "create") await createTask(data);
    if (mode === "edit") await updateTask(task.id, data);
    closeModal();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <h2 className="text-lg font-semibold">
        {mode === "create" ? "Crear tarea" : "Editar tarea"}
      </h2>

      <div className="flex flex-col justify-center gap-1">
        <div className="border border-black rounded">
          <input
            {...register("title", { required: "El título es requerido." })}
            placeholder="Título"
            className={`flip-card__input input ${
              errors.title ? "border-red-500" : ""
            }`}
          />
        </div>
        {errors.title && (
          <span className="flex items-center gap-1 text-red-500 text-sm px-2">
            <i className="fas fa-triangle-exclamation" />
            {errors.title.message}
          </span>
        )}
      </div>

      <div className="flex flex-col justify-center border border-black rounded">
        <textarea
          {...register("description")}
          placeholder="Descripción (opcional)"
          className="flip-card__input input h-[42px] !w-full resize-y overflow-auto"
        />
      </div>

      <div className="flex flex-col justify-center border border-black rounded">
        <select
          {...register("status")}
          className="flip-card__input input !w-100"
        >
          <option selected value="PENDING">Pendiente</option>
          <option value="IN_PROGRESS">En progreso</option>
        </select>
      </div>

      <div className="flex flex-col justify-center border border-black rounded">
        <select
          {...register("category")}
          className="flip-card__input input !w-100"
        >
          <option value="WORK">Laboral</option>
          <option value="STUDY">Academico</option>
          <option value="PERSONAL">Personal</option>
          <option value="HEALTH">Salud</option>
          <option selected value="OTHER">Otro</option>
        </select>
      </div>

      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white py-2 rounded cursor-pointer"
      >
        {mode === "create" ? "Crear" : "Guardar cambios"}
      </button>
    </form>
  );
};

export default TaskForm;
