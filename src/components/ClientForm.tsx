import React, { useState } from "react";
import { createClient } from "../services/api";
import { useNavigate } from "react-router-dom";
import type { Client } from "../types/client";

const ClientForm: React.FC = () => {
  const [client, setClient] = useState<Omit<Client, "id">>({
    name: "",
    email: "",
    phone: "",
    address: "",
    company: "",
    position: "",
    notes: "",
  });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setClient(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createClient(client);
    navigate("/clients");
  };

  return (
    <div className="p-10 flex justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl bg-white p-6 rounded-xl shadow-md border border-gray-300 flex flex-col gap-4"
      >
        <h2 className="text-3xl font-bold text-gray-800 text-center pb-2 border-b">
          Crear Cliente
        </h2>
  
        <input
          name="name"
          value={client.name}
          onChange={handleChange}
          placeholder="Nombre"
          className="border border-gray-300 px-3 py-2 rounded bg-gray-50 focus:ring-2 focus:ring-blue-600"
          required
        />
  
        <input
          name="email"
          value={client.email}
          onChange={handleChange}
          placeholder="Email"
          className="border border-gray-300 px-3 py-2 rounded bg-gray-50 focus:ring-2 focus:ring-blue-600"
          required
        />
  
        <input
          name="phone"
          value={client.phone}
          onChange={handleChange}
          placeholder="Teléfono"
          className="border border-gray-300 px-3 py-2 rounded bg-gray-50 focus:ring-2 focus:ring-blue-600"
          required
        />
  
        <input
          name="address"
          value={client.address}
          onChange={handleChange}
          placeholder="Dirección"
          className="border border-gray-300 px-3 py-2 rounded bg-gray-50 focus:ring-2 focus:ring-blue-600"
        />
  
        <input
          name="company"
          value={client.company}
          onChange={handleChange}
          placeholder="Empresa"
          className="border border-gray-300 px-3 py-2 rounded bg-gray-50 focus:ring-2 focus:ring-blue-600"
        />
  
        <input
          name="position"
          value={client.position}
          onChange={handleChange}
          placeholder="Cargo"
          className="border border-gray-300 px-3 py-2 rounded bg-gray-50 focus:ring-2 focus:ring-blue-600"
        />
  
        <textarea
          name="notes"
          value={client.notes}
          onChange={handleChange}
          placeholder="Notas"
          rows={3}
          className="border border-gray-300 px-3 py-2 rounded bg-gray-50 focus:ring-2 focus:ring-blue-600 resize-none"
        />
  
        <button
          type="submit"
          className="bg-blue-700 hover:bg-blue-800 text-white font-semibold px-4 py-3 rounded-lg mt-2 transition"
        >
          Crear Cliente
        </button>
      </form>
    </div>
  );
  


};

export default ClientForm;
