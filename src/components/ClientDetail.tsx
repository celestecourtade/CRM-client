// src/components/ClientDetail.tsx
import React from "react";
import type { Client } from "../types/client";

interface Props {
  client: Client;
}

const ClientDetail: React.FC<Props> = ({ client }) => (
  <div className="border border-gray-300 rounded-xl p-8 shadow-lg bg-white max-w-2xl mx-auto">
    
    <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-2 border-b">
      {client.name}
    </h2>

    <div className="space-y-3 text-gray-700">
      <p><span className="font-semibold text-gray-800">Email:</span> {client.email}</p>
      <p><span className="font-semibold text-gray-800">Teléfono:</span> {client.phone}</p>

      {client.address && (
        <p><span className="font-semibold text-gray-800">Dirección:</span> {client.address}</p>
      )}

      {client.company && (
        <p><span className="font-semibold text-gray-800">Empresa:</span> {client.company}</p>
      )}

      {client.position && (
        <p><span className="font-semibold text-gray-800">Cargo:</span> {client.position}</p>
      )}

      {client.notes && (
        <p><span className="font-semibold text-gray-800">Notas:</span> {client.notes}</p>
      )}
    </div>
  </div>
);

export default ClientDetail;
