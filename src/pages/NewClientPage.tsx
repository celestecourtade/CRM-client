import React from "react";
import ClientForm from "../components/ClientForm";

const NewClientPage: React.FC = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Nuevo Cliente</h1>
      <ClientForm />
    </div>
  );
};

export default NewClientPage;
