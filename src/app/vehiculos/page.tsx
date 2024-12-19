'use client';

import { getData } from '@/modules/entradas';
import { FrmVehiculos } from '@/modules/vehiculos';
import { updatedVehiculos } from '@/modules/vehiculos/helpers/fetching';
import { Button, Divider, Input, Spinner } from '@nextui-org/react';
import React, { useEffect, useState } from 'react';

interface Vehiculo {
  id: number;
  marca: string;
  placa: string;
  modelo: string;
  color: string;
  espacio?: { tipo: string; numero?: string }; // Asumiendo que espacio puede ser opcional
}

const Page: React.FC = () => {
  const [vehiculos, setVehiculos] = useState<Vehiculo[]>([]);
  const [filteredVehiculos, setFilteredVehiculos] = useState<Vehiculo[]>([]);
  const [selectedVehiculo, setSelectedVehiculo] = useState<Vehiculo | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const fetchVehiculos = async (valor: string) => {
    setLoading(true);
    try {
      const data = await getData(`vehiculos/${valor}`);
      setVehiculos(data.data);
      setFilteredVehiculos(data.data); 
    } catch (error) {
      console.error('Error al obtener los vehículos:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVehiculos("all");
  }, []);

  useEffect(() => {
    const filtered = vehiculos.filter((vehiculo) =>
      vehiculo.marca.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehiculo.placa.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehiculo.modelo.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredVehiculos(filtered);
  }, [searchTerm, vehiculos]);

  const handleVehiculoClick = (vehiculo: Vehiculo) => {
    setSelectedVehiculo(vehiculo);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedVehiculo(null);
    setIsEditing(false);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (selectedVehiculo) {
      setSelectedVehiculo({
        ...selectedVehiculo,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSaveClick = async () => {
    if (selectedVehiculo) {
      const { id } = selectedVehiculo;
      try {
        const response = await updatedVehiculos('vehiculos/actualizar', selectedVehiculo, id);
        if (response?.status === 200) {
          fetchVehiculos("all");
        } else {
          console.error('Error al actualizar el vehículo:', response);
        }
      } catch (error) {
        console.error('Error al actualizar el vehículo:', error);
      }
      closeModal();
    }
  };

  return (
    <div className='min-h-screen bg-gray-900 text-white p-4'>
      <h1 className='font-bold text-3xl uppercase mb-4'>Listado de Vehículos</h1>
      
      <Divider className="mb-4" />
      
      <div className='flex flex-col md:flex-row justify-between items-start mb-4'>
        <div className='flex flex-wrap gap-4'>
          <Button className="capitalize" onPress={() => fetchVehiculos('conEspacio')} variant='shadow' radius="full" size="sm" color="secondary">Con espacio</Button>
          <Button className="capitalize" radius="full" size="sm" color="warning" variant="shadow">Sin espacio</Button>
          <Button className="capitalize" onPress={() => fetchVehiculos("all")} radius="full" size="sm" color="default">Resetear valores</Button>
        </div>

        <Input
          type="text"
          placeholder="Buscar vehículo"
          className="w-60 mt-4 md:mt-0"
          variant="flat"
          disabled={loading}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        
        <p className='mt-4 md:mt-0'>Total de vehículos: {filteredVehiculos.length}</p>
      </div>

      <div className='flex flex-wrap justify-center gap-4'>
        {loading ? (
          <div className="flex flex-col items-center">
            <p className="text-xl">Cargando vehículos...</p>
            <Spinner />
          </div>
        ) : (
          filteredVehiculos.map((vehiculo) => (
            <div key={vehiculo.id} className='border border-gray-700 rounded-lg p-4 bg-gray-800 shadow-lg'>
              <div
                className="h-44 w-44 bg-gray-700 rounded-xl flex flex-col justify-center items-center shadow-lg hover:bg-gray-600 cursor-pointer transition duration-300"
                onClick={() => handleVehiculoClick(vehiculo)}
              >
                <img 
                  src={vehiculo?.espacio?.tipo === "Estandar" ? "/car.svg" : "/moto.svg"} 
                  alt="Vehículo" 
                  className="w-16 h-16"
                />
                <span className="mt-2 text-sm font-semibold uppercase">{vehiculo.marca}</span>
                <span className="mt-1 text-sm font-semibold text-blue-500">{vehiculo.placa}</span>
              </div>
            </div>
          ))
        )}
      </div>

      {showModal && selectedVehiculo && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md mx-4">
            <h2 className="text-2xl font-bold mb-4 text-center text-white">Detalles del Vehículo</h2>
            <div className="space-y-2">
              {isEditing ? (
                <>
                  {['marca', 'placa', 'modelo', 'color'].map((field) => (
                    <Input
                      key={field}
                      type="text"
                      name={field}
                      value={selectedVehiculo[field]}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded bg-gray-700 text-white"
                    />
                  ))}
                </>
              ) : (
                <div>
                  <p className="text-lg"><strong>Marca:</strong> {selectedVehiculo.marca}</p>
                  <p className="text-lg"><strong>Placa:</strong> {selectedVehiculo.placa}</p>
                  <p className="text-lg"><strong>Modelo:</strong> {selectedVehiculo.modelo}</p>
                  <p className="text-lg"><strong>Color:</strong> {selectedVehiculo.color}</p>
                  <p className="text-lg"><strong>Espacio asignado:</strong> {selectedVehiculo.espacio?.numero || "sin espacio asignado"}</p>
                </div>
              )}
            </div>
            <div className="mt-6 flex gap-2 justify-center">
              <Button className="bg-red-500" onClick={closeModal}>Cerrar</Button>
              {isEditing ? (
                <Button className="bg-green-500" onClick={handleSaveClick}>Guardar</Button>
              ) : (
                <Button className="bg-yellow-500" onClick={handleEditClick}>Editar</Button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Page;