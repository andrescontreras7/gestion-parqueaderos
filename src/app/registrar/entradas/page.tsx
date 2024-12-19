"use client";

import { getData, Modal, postEntradas } from '@/modules/entradas';
import { notFound } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Page() {
  const [vehiculos, setVehiculos] = useState([]);

  const enviarData = async (url, value) => {
    try {
      const response = await postEntradas(`vehiculos/registrar/${url}`, value);
      console.log(response.status)

      if (response?.status == 201) {
        toast.success("Registro exitoso");
      } else {
        toast.error(response?.message);
      }
     
    } catch (error) {
      toast.error("Error al registrar");
    }
  }

  const getVehiculos = async () => {
    try {
      const data = await getData('vehiculos/conEspacio');
      setVehiculos(data.data);
    } catch (error) {
      toast.error("Error al obtener vehículos", );
    }
  }

  useEffect(() => {
    getVehiculos();
  }, []); 

  return (
    <div className="relative h-screen bg-gray-900 text-white flex flex-col justify-start items-center">
      <ToastContainer />
      <div className="text-center mt-4">
        <h1 className="text-3xl font-bold mb-4">Registrar Entradas</h1>
      </div>

      <div className="flex gap-10 justify-center">
        <div className="border rounded-md p-4 w-48 bg-gray-800 shadow-md">
          <p className="text-lg font-semibold">Registrar entradas</p>
          <Modal 
            vehiculos={vehiculos} 
            enviarData={enviarData} 
            url={"entrada"} 
            titulo={'Entradas'}
          />
        </div>

        <div className="border rounded-md p-4 w-48 bg-gray-800 shadow-md">
          <p className="text-lg font-semibold">Registrar salidas</p>
          <Modal 
            vehiculos={vehiculos} 
            enviarData={enviarData} 
            url={"salida"} 
            titulo={'Salidas'}
          />
        </div>
      </div>
    </div>
  );
}

export default Page;