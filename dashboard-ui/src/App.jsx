// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { PrivateRoute } from "./routes/PrivateRoute";
import Login from "./routes/Login";
import Dashboard from "./routes/Dashboard";
import Tasks from "./routes/Tasks";
import Layout from "./components/shared/Layout";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <main className="w-screen h-screen flex justify-center items-center">
      <Toaster position="top-center" reverseOrder={false} />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route
            path="/"
            element={
              <PrivateRoute>
                <Layout />
              </PrivateRoute>
            }
          >
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="tasks" element={<Tasks />} />
          </Route>

          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
