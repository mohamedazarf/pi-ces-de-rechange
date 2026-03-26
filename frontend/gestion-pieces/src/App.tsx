import BusinessCentral from "./BusinessCentral";
import "./index.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./login";
import Commerciales from "./Commerciales";
import Clients from "./Clients";
import Articles from "./Articles";
import EspacePersonnel from "./EspacePersonnel";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BusinessCentral />} />
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route path="/commerciales" element={<Commerciales />} />
        <Route path="/clients" element={<Clients />} />
        <Route path="/articles" element={<Articles />} />
        <Route
          path="/espace-personnel"
          element={
            <ProtectedRoute>
              <EspacePersonnel />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
