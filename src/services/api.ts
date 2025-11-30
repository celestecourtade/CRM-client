import type { Client } from "../types/client";

const API_URL = "https://crm-client-1-191a.onrender.com";

// Obtener todos los clientes
export const getClients = async (): Promise<Client[]> => {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Error al obtener clientes");
  return res.json();
};

// Obtener cliente por id
export const getClient = async (id: string): Promise<Client> => {
  const res = await fetch(`${API_URL}/${id}`);
  if (!res.ok) throw new Error("Error al obtener cliente");
  return res.json();
};

// Crear cliente
export const createClient = async (client: Omit<Client, "id">): Promise<Client> => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(client),
  });
  if (!res.ok) throw new Error("Error al crear cliente");
  return res.json();
};

// Editar cliente
export const updateClient = async (id: string, client: Client): Promise<Client> => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(client),
  });
  if (!res.ok) throw new Error("Error al actualizar cliente");
  return res.json();
};

// Borrar cliente
export const deleteClient = async (id: string): Promise<void> => {
  const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Error al eliminar cliente");
};
