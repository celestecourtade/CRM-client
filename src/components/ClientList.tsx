import React from "react";
import type { Client } from "../types/client";
import ClientCard from "./ClientCard";

interface Props {
  clients: Client[];
}

const ClientList: React.FC<Props> = ({ clients }) => {
  if (clients.length === 0) return <p>No hay clientes para mostrar.</p>;
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {clients.map(client => (
        <ClientCard key={client.id} client={client} />
      ))}
    </div>
  );
};

export default ClientList;
