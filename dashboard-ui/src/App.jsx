import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { PrivateRoute } from "./routes/PrivateRoute";
import Login from "./routes/Login";
import Dashboard from "./routes/Dashboard";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <main className="w-screen h-screen flex justify-center items-center">
      <Toaster position="top-center" reverseOrder={false} />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
