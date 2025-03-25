import { useAuth } from "@/hooks/useAuth";

const ExportButton = () => {
  const { token } = useAuth();

  const handleExport = async () => {
    const res = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/dashboard/export`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!res.ok) {
      console.error("Error al exportar el reporte");
      return;
    }

    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "dashboard_report.json";
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <button
      onClick={handleExport}
      className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition cursor-pointer"
    >
      Exportar datos
    </button>
  );
};

export default ExportButton;
