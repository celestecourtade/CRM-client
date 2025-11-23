// src/pages/ClientsPage.tsx
import React, { useEffect, useState, useMemo } from "react";
import { getClients } from "../services/api";
import type { Client } from "../types/client";
import ClientCard from "../components/ClientCard";
import SearchInput from "../components/SearchInput";
import { debounce } from "../utils/debounce";

const ClientsPage: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [filteredClients, setFilteredClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  // Cargar clientes desde la API
  useEffect(() => {
    const fetchClients = async () => {
      try {
        const data = await getClients();
        setClients(data);
        setFilteredClients(data); // Inicializar filtrados con todos
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchClients();
  }, []);

  // Función de filtrado con debounce
  const debouncedFilter = useMemo(
    () =>
      debounce((q: string) => {
        const lowerQuery = q.toLowerCase();
        setFilteredClients(
          clients.filter(
            client =>
              client.name.toLowerCase().includes(lowerQuery) ||
              client.email.toLowerCase().includes(lowerQuery) ||
              client.phone.toLowerCase().includes(lowerQuery)
          )
        );
      }, 300),
    [clients]
  );

  // Manejar cambios en el input de búsqueda
  const handleSearch = (value: string) => {
    setQuery(value);
    debouncedFilter(value);
  };

  if (loading) return <p>Cargando clientes...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-4">
      <SearchInput value={query} onChange={handleSearch} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {filteredClients.length > 0 ? (
          filteredClients.map(client => <ClientCard key={client.id} client={client} />)
        ) : (
          <p>No se encontraron clientes.</p>
        )}
      </div>
    </div>
  );
};

export default ClientsPage;
