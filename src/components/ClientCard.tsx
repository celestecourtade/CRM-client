import React from "react";
import type { Client } from "../types/client";
import { Link } from "react-router-dom";

interface Props {
  client: Client;
}

const ClientCard: React.FC<Props> = ({ client }) => (
  <div className="border border-gray-300 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 bg-white">

    <h2 className="text-xl font-bold text-gray-900 mb-1">{client.name}</h2>
    <p className="text-gray-700 text-sm">{client.email}</p>
    <p className="text-gray-700 text-sm">{client.phone}</p>

    <div className="mt-3 space-y-1 text-sm text-gray-600">
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

    <div className="mt-5">
      <Link
        to={`/clients/${client.id}`}
        className="block text-center bg-blue-700 hover:bg-blue-800 text-white py-2 rounded-lg font-medium transition"
      >
        Ver detalles
      </Link>
    </div>
  </div>
);

export default ClientCard;
