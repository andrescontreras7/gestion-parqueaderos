"use client";

import React, { useEffect, useState } from "react";
import { getHistorial } from "@/modules/historial/helpers/fetchingHistorial";
import { Button, DatePicker, Spinner } from "@nextui-org/react";
import HistorialVehiculo from "@/modules/historial/components/historialVehiculo";
import ViewSkeleton from "@/modules/historial/components/skeleton";

export default function Page() {
  const [selectedDate, setSelectedDate] = useState("");
  const [historial, setHistorial] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const getData = async () => {
    setLoading(true);
    try {
      const response = await getHistorial("historial");
      if (response.data && response.data.data.length > 0) {
        setHistorial(response?.data.data || []);  
      }

   
    } catch (error) {
      console.error("Error al obtener el historial:", error);
    } finally {
      setLoading(false);
    }
  };

  const consultar = async () => {
    if (!selectedDate) {
      setError(true);
      return;
    }
    setError(false);

    const [year, month, day] = selectedDate.split("-");
    try {
      const response = await getHistorial(
        `historial?dia=${day}&mes=${month}&año=${year}`
      );
      if (response.data && response.data.data.length > 0) {
        setHistorial(response.data.data);
        setError(false);
      } else {
        setHistorial([]);
        setError(false);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="bg-gray-900 min-h-screen text-white p-6">
      <h1 className="text-2xl font-bold text-center">Historial de Vehículos</h1>
      <div className="w-full flex flex-col lg:flex-row items-center p-2 gap-4 mb-4">
        <div className="flex flex-col gap-1 border rounded-md border-gray-600 p-4 items-center w-full lg:w-1/4 shadow-md">
          <input
            type="date"
            className="w-full bg-gray-800 text-white border border-gray-600 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
            onChange={(e) => {
              setSelectedDate(e.target.value);
              setError(false);
            }}
          />
          <Button onClick={consultar} className="mt-2 w-full" color="primary">
            Buscar
          </Button>
          {selectedDate && (
            <p className="text-gray-400 mt-2 text-sm">
              Fecha seleccionada: {new Date(selectedDate).toLocaleDateString()}
            </p>
          )}
          {error && (
            <p className="text-red-500 text-sm mt-2">
              Por favor seleccione una fecha
            </p>
          )}
        </div>
        <Button
          className="capitalize text-white w-full lg:w-auto"
          onClick={getData}
          radius="full"
          size="sm"
          color="default"
          variant="flat"
        >
          Resetear valores
        </Button>
      </div>

      <div className="p-4 rounded-md bg-gray-800 shadow-lg">
        {loading ? (
          <div className="w-full h-full flex justify-center items-center">
            <Spinner
              color="default"
              size="lg"
              label="Cargando..."
              labelColor="primary"
            />
          </div>
        ) : (
          historial.length > 0 ? (
            <HistorialVehiculo data={historial} />
          )
          :(
            <p className="text-gray-400 text-center mt-4">
              No hay datos para mostrar
            </p>
          )
          
        )}
      </div>
    </div>
  );
}