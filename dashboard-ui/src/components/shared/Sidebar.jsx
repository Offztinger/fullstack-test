import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const Sidebar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation(); // 👈 obtenemos la ruta actual

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const linkBaseClass =
    "flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all";
  const activeClass = "bg-[#2d8cf0] text-white shadow-inner";
  const inactiveClass =
    "text-gray-700 hover:text-white hover:bg-[#2d8cf0] hover:shadow-inner";

  return (
    <div className="w-64 h-screen bg-white shadow-md shadow-purple-200/50 flex flex-col justify-between p-5">
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-4 p-3 cursor-default">
          <i className="fas fa-user-circle text-3xl text-[#2d7cf0]" />
          <div>
            <p className="font-semibold text-base text-gray-800">
              {user?.name}
            </p>
          </div>
        </div>

        <ul className="flex flex-col gap-2">
          <li>
            <Link
              to="/dashboard"
              className={`${linkBaseClass} ${
                pathname === "/dashboard" ? activeClass : inactiveClass
              }`}
            >
              <i className="fas fa-chart-line" />
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/tasks"
              className={`${linkBaseClass} ${
                pathname === "/tasks" ? activeClass : inactiveClass
              }`}
            >
              <i className="fas fa-tasks" />
              Tareas
            </Link>
          </li>
        </ul>
      </div>

      <button
        onClick={handleLogout}
        className={`${linkBaseClass} ${inactiveClass} cursor-pointer`}
      >
        <i className="fas fa-sign-out-alt" />
        Cerrar sesión
      </button>
    </div>
  );
};

export default Sidebar;
