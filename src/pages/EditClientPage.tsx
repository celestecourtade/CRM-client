import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { Client } from "../types/client";
import { getClient, updateClient } from "../services/api";

const EditClientPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [client, setClient] = useState<Client | null>(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");
  const [notes, setNotes] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchClient = async () => {
      if (!id) return;
      try {
        const data = await getClient(id);
        setClient(data);
        setName(data.name);
        setEmail(data.email);
        setPhone(data.phone);
        setAddress(data.address || "");
        setCompany(data.company || "");
        setPosition(data.position || "");
        setNotes(data.notes || "");
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchClient();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!client || !id) return;

    await updateClient(id, {
      ...client,
      name,
      email,
      phone,
      address,
      company,
      position,
      notes,
    });
    navigate(`/clients/${id}`);
  };

  if (loading) return <p className="text-center mt-10 text-gray-600">Cargando...</p>;
  if (error) return <p className="text-center mt-10 text-red-600">Error: {error}</p>;
  if (!client) return <p className="text-center mt-10 text-gray-600">Cliente no encontrado</p>;

  return (
    <div className="p-16 flex justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl bg-white p-6 rounded-xl shadow-md border border-gray-300 flex flex-col gap-4"
      >
        <h2 className="text-3xl font-bold text-gray-800 text-center pb-2 border-b">
          Editar Cliente
        </h2>
  
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nombre"
            className="border border-gray-300 px-3 py-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-400 bg-gray-50"
            required
          />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="border border-gray-300 px-3 py-2 rounded focus:ring-2 focus:ring-blue-500 bg-gray-50"
            required
          />
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Teléfono"
            className="border border-gray-300 px-3 py-2 rounded focus:ring-2 focus:ring-blue-500 bg-gray-50"
            required
          />
          <input
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Dirección"
            className="border border-gray-300 px-3 py-2 rounded focus:ring-2 focus:ring-blue-500 bg-gray-50"
          />
          <input
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="Empresa"
            className="border border-gray-300 px-3 py-2 rounded focus:ring-2 focus:ring-blue-500 bg-gray-50"
          />
          <input
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            placeholder="Cargo"
            className="border border-gray-300 px-3 py-2 rounded focus:ring-2 focus:ring-blue-500 bg-gray-50"
          />
        </div>
  
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Notas"
          className="border border-gray-300 px-3 py-2 rounded h-24 focus:ring-2 focus:ring-blue-500 resize-none bg-gray-50"
        />
  
        <button
          type="submit"
          className="bg-blue-700 hover:bg-blue-800 text-white font-semibold px-4 py-3 rounded-lg mt-2 transition shadow-sm"
        >
          Guardar Cambios
        </button>
      </form>
    </div>
  );
};  

export default EditClientPage;
