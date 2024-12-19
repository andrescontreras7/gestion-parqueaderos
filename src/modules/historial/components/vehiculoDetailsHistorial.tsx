import React from 'react';

export default function Page() {
  return (
    <div className="h-screen bg-gray-900 text-white p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">Historial de Vehículos</h1>
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Registros Recientes</h2>
          <ul className="space-y-4">
            {/* Aquí puedes mapear los datos del historial */}
            <li className="bg-gray-700 p-4 rounded-lg shadow-md">
              <p className="text-lg font-medium">Vehículo 1</p>
              <p className="text-sm text-gray-400">Fecha de entrada: 2023-01-01</p>
              <p className="text-sm text-gray-400">Fecha de salida: 2023-01-05</p>
            </li>
            <li className="bg-gray-700 p-4 rounded-lg shadow-md">
              <p className="text-lg font-medium">Vehículo 2</p>
              <p className="text-sm text-gray-400">Fecha de entrada: 2023-01-02</p>
              <p className="text-sm text-gray-400">Fecha de salida: 2023-01-06</p>
            </li>
            {/* Agrega más registros según sea necesario */}
          </ul>
        </div>
      </div>
    </div>
  );
}