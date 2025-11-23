import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ClientsPage from "./pages/ClientsPage";
import NewClientPage from "./pages/NewClientPage";
import ClientPage from "./pages/ClientPage";
import EditClientPage from "./pages/EditClientPage";



const App: React.FC = () => {
  return (
    <Router>
      <nav className="bg-gray-800 text-white p-4 flex gap-4">
        <Link to="/clients">Clientes</Link>
        <Link to="/new-client">Nuevo Cliente</Link>
      </nav>
      <Routes>
        <Route path="/clients" element={<ClientsPage />} />
        <Route path="/clients/:id" element={<ClientPage />} /> {/* Ruta nueva */}
        <Route path="/clients/:id/edit" element={<EditClientPage />} />
        <Route path="/new-client" element={<NewClientPage />} />
        <Route path="*" element={<ClientsPage />} />
      </Routes>
    </Router>
  );
};

export default App;
