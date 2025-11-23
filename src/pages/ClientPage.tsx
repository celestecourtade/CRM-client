import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { Client } from "../types/client";
import { getClient, deleteClient } from "../services/api";
import Modal from "../components/Modal";

const ClientPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [client, setClient] = useState<Client | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchClient = async () => {
      if (!id) return;
      try {
        const data = await getClient(id); // si tu id es string en db.json
        setClient(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchClient();
  }, [id]);

  const handleDelete = async () => {
    if (!id) return;
    await deleteClient(id);
    setIsModalOpen(false);
    navigate("/clients");
  };

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!client) return <p>Cliente no encontrado</p>;

  return (
    <div className="p-4 bg-white rounded-lg shadow-sm max-w-lg mx-auto mt-12 border border-gray-200">
  <h1 className="text-xl font-semibold mb-3 text-gray-800">{client.name}</h1>

  <div className="space-y-1 text-gray-700 text-sm">
    <p><strong>Email:</strong> {client.email}</p>
    <p><strong>Teléfono:</strong> {client.phone}</p>
    {client.address && <p><strong>Dirección:</strong> {client.address}</p>}
    {client.company && <p><strong>Empresa:</strong> {client.company}</p>}
    {client.position && <p><strong>Cargo:</strong> {client.position}</p>}
    {client.notes && <p><strong>Notas:</strong> {client.notes}</p>}
  </div>

  <div className="mt-4 flex gap-2">
    <button
      onClick={() => setIsModalOpen(true)}
      className="bg-red-600 text-white px-3 py-1.5 rounded-md text-sm hover:bg-red-700 transition"
    >
      Eliminar
    </button>
    <button
      onClick={() => navigate(`/clients/${client.id}/edit`)}
      className="bg-yellow-500 text-white px-3 py-1.5 rounded-md text-sm hover:bg-yellow-600 transition"
    >
      Editar
    </button>
  </div>

  <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
    <p className="mb-3 text-gray-800 text-sm">¿Seguro quieres eliminar este cliente?</p>
    <div className="flex justify-end gap-2">
      <button
        onClick={() => setIsModalOpen(false)}
        className="px-3 py-1.5 border rounded-md text-sm hover:bg-gray-100 transition"
      >
        Cancelar
      </button>
      <button
        onClick={handleDelete}
        className="bg-red-600 text-white px-3 py-1.5 rounded-md text-sm hover:bg-red-700 transition"
      >
        Eliminar
      </button>
    </div>
  </Modal>
</div>



  );
};

export default ClientPage;
