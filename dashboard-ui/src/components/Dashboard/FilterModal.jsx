import { useState } from "react";
import { useDashboard } from "@/hooks/useDashboard";

const FILTER_OPTIONS = [
  { key: "summary", label: "Resumen general" },
  { key: "categoryAverage", label: "Tareas por categoría" },
  { key: "weeklyTrend", label: "Tendencia semanal" },
  { key: "productivityByDay", label: "Productividad por día" },
  { key: "completionRate", label: "Porcentaje completadas" },
  { key: "averageTime", label: "Tiempo promedio" },
  { key: "abandonmentRate", label: "Tasa de abandono" },
];

const FilterModal = ({ onClose }) => {
  const { filters, setFilter } = useDashboard();
  const [localFilters, setLocalFilters] = useState(filters);

  const handleChange = (key) => {
    setLocalFilters((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleApply = () => {
    Object.entries(localFilters).forEach(([key, value]) => {
      setFilter(key, value);
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[350px]">
        <h2 className="text-xl font-semibold mb-4">Seleccionar métricas</h2>
        <div className="flex flex-col gap-2">
          {FILTER_OPTIONS.map(({ key, label }) => (
            <label key={key} className="flex items-center gap-2 text-base">
              <input
                type="checkbox"
                checked={localFilters[key]}
                onChange={() => handleChange(key)}
              />
              {label}
            </label>
          ))}
        </div>
        <div className="flex justify-end gap-2 mt-6">
          <button
            onClick={onClose}
            className="text-white bg-blue-500 hover:bg-blue-600 px-4 py-1 rounded cursor-pointer"
          >
            Cancelar
          </button>
          <button
            onClick={handleApply}
            className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-500 cursor-pointer"
          >
            Aplicar
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
