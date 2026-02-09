// src/api/clients.ts
import type { Client } from "../types/client";

// Nombre de la key en localStorage
const STORAGE_KEY = "crm_clients";

// Función para obtener los clientes del localStorage o inicializar vacíos
const loadClients = (): Client[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  if (data) return JSON.parse(data);
  return [];
};

// Guardar clientes en localStorage
const saveClients = (clients: Client[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(clients));
};

// Obtener todos los clientes
export const getClients = async (): Promise<Client[]> => {
  return loadClients();
};

// Obtener cliente por id
export const getClient = async (id: string): Promise<Client> => {
  const clients = loadClients();
  const client = clients.find(c => c.id === id);
  if (!client) throw new Error("Cliente no encontrado");
  return client;
};

// Crear cliente
export const createClient = async (client: Omit<Client, "id">): Promise<Client> => {
  const clients = loadClients();
  const newClient: Client = { id: (clients.length + 1).toString(), ...client };
  clients.push(newClient);
  saveClients(clients);
  return newClient;
};

// Editar cliente
export const updateClient = async (id: string, client: Client): Promise<Client> => {
  let clients = loadClients();
  clients = clients.map(c => (c.id === id ? client : c));
  saveClients(clients);
  return client;
};

// Borrar cliente
export const deleteClient = async (id: string): Promise<void> => {
  let clients = loadClients();
  clients = clients.filter(c => c.id !== id);
  saveClients(clients);
};
