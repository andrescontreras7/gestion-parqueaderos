import Link from 'next/link';
import React, { useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";

export default function HistorialGeneral({ data }: any) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedVehicle, setSelectedVehicle] = useState<any>(null); 

  const handleOpen = (item: any) => {
    setSelectedVehicle(item); 
    onOpen(); 
  };

  return (
    <div className="bg-gray-900 text-white overflow-auto flex flex-col items-center justify-start p-6">
      <div className="bg-gray-800 rounded-lg shadow-lg p-8 w-full max-w-5xl">
        <h1 className="text-3xl font-bold mb-6 text-center">Historial General de Entradas y Salidas</h1>
        
        {data && data.length > 0 ? (
          <div className=" overflow-auto h-[600px] rounded-lg shadow-md">
            <table className="table-auto w-full text-left">
              <thead>
                <tr className="bg-gray-700 text-white">
                  <th className="px-4 py-2">Placa</th>
                  <th className="px-4 py-2">Marca</th>
                  <th className="px-4 py-2">Modelo</th>
                  <th className="px-4 py-2">Color</th>
                  <th className="px-4 py-2">Hora de Entrada</th>
                  <th className="px-4 py-2">Hora de Salida</th>
                  <th className="px-4 py-2"></th>
                </tr>
              </thead>
              <tbody>
                {data.map((item: any, index: number) => (
                  <tr key={index} className="border-b border-gray-700 transition duration-200 hover:bg-gray-600">
                    <td className="px-4 py-3">{item.Vehiculo?.placa || '---'}</td>
                    <td className="px-4 py-3">{item.Vehiculo?.marca || '---'}</td>
                    <td className="px-4 py-3">{item.Vehiculo?.modelo || '---'}</td>
                    <td className="px-4 py-3">{item.Vehiculo?.color || '---'}</td>
                    <td className="px-4 py-3">
                      {item.hora_entrada ? new Date(item.hora_entrada).toLocaleString() : '---'}
                    </td>
                    <td className="px-4 py-3">
                      {item.hora_salida ? new Date(item.hora_salida).toLocaleString() : 'Sin salida'}
                    </td>
                    <td className="px-4 py-3">
                      <Button color="primary" onPress={() => handleOpen(item)}>Ver Detalles</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-400 text-center mt-4">No hay datos disponibles para las fechas seleccionadas.</p>
        )}

        <Modal 
          isOpen={isOpen} 
          onOpenChange={onOpenChange}
          placement="top-center"
          size="lg"
        >
          <ModalContent className="rounded-md bg-gray-800 text-white">
            <ModalHeader className="font-bold text-xl">Detalles del Vehículo</ModalHeader>
            <ModalBody>
              {selectedVehicle ? (
                <>
                  <p className="text-lg"><strong>Marca:</strong> {selectedVehicle.Vehiculo?.marca}</p>
                  <p className="text-lg"><strong>Placa:</strong> {selectedVehicle.Vehiculo?.placa}</p>
                  <p className="text-lg"><strong>Modelo:</strong> {selectedVehicle.Vehiculo?.modelo}</p>
                  <p className="text-lg"><strong>Color:</strong> {selectedVehicle.Vehiculo?.color}</p>
                  <p className="text-lg"><strong>Espacio Asignado:</strong> {selectedVehicle.Vehiculo?.espacio?.numero}</p>
                  <p className="text-lg"><strong>Tipo:</strong> {selectedVehicle.Vehiculo?.espacio?.tipo}</p>
                  <p className="text-lg"><strong>Hora de entrada:</strong> {selectedVehicle.hora_entrada ? new Date(selectedVehicle.hora_entrada).toLocaleString() : '---'}</p>
                  <p className="text-lg"><strong>Hora de salida:</strong> {selectedVehicle.hora_salida ? new Date(selectedVehicle.hora_salida).toLocaleString() : 'Sin salida'}</p>
                </>
              ) : (
                <p>Cargando detalles...</p>
              )}
            </ModalBody>
            <ModalFooter>
              <Button color="warning" onPress={onOpenChange}>Cerrar</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
    </div>
  );
}