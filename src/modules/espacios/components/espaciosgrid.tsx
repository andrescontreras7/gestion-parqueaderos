"use client";

import React, { useEffect, useState } from "react";
import { EspacioItems } from "./EspacioItems";
import { Espacio } from "../types";
import { notFound } from "next/navigation";
import { Vehiculos } from "@/modules/entradas/helpers/type";
import { postEspacios, UpdateEspacios } from "../helpers/fetchingEspacios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getData } from "@/modules/entradas";
import { Button } from "@nextui-org/react";
import ModalEspacios from "./Modal";

export const Espaciosgrid = () => {
  const [data, setData] = useState<Espacio[]>([]);
  const [mostrar, setMostrar] = useState(false);
  const [vehiculos, setVehiculos] = useState<Vehiculos[]>([]);
  const [idVehiculo, setIdVehiculo] = useState<string>("");
  const [value, setValue] = React.useState({});
  const [valid, setValid] = React.useState(false);


  const vaciarEspacio = async (id: number) => {
    const info = { estado: "libre", id_vehiculoFK: null };
    const response = await UpdateEspacios("espacios/actualizar", info, id);

    if (response?.status === 200) {
      toast.success("Espacio vaciado con éxito");
      getVehiculos();
      setData((prevState) =>
        prevState.map((item) =>
          item.id === id ? { ...item, estado: "libre", Vehiculo: null } : item
        )
      );
    } else {
      toast.error("Error al vaciar el espacio");
    }
  };

  const hanledChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setIdVehiculo(e.target.value);
  };

  const toggleMostrar = () => {
    setMostrar((prev) => !prev);
  };

  const asignarEspacio = async (id: number) => {
    const info = { estado: "ocupado", id_vehiculoFK: idVehiculo };
    const response = await UpdateEspacios("espacios/actualizar", info, id);

    if (response?.status === 200) {
      toast.success("Vehículo asignado con éxito");
      getVehiculos();
      const vehiculoAsignado = vehiculos.find(
        (vehiculo) => vehiculo.id === parseInt(idVehiculo)
      );

      setData((prev) =>
        prev.map((item) =>
          item.id === id
            ? { ...item, estado: "ocupado", Vehiculo: vehiculoAsignado }
            : item
        )
      );
      toggleMostrar();
    } else {
      toast.error("Error al asignar el vehículo");
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };

  const registrarEspacios = async () => {
    const response = await postEspacios('espacios/create', value);
    if (response.status === 200) {
      getEspacios();
      toast.success('Espacio registrado correctamente');
     
    } else {
      toast.error(response.message);
    }
  };


  const getVehiculos = async () => {
    const response = await getData("vehiculos");
    if (response?.status === 404) {
      toast.error("No hay vehículos registrados");
    } else {
      setVehiculos(response.data);
    }
  };
  

  const getEspacios = async (tipo:string, value:string) => {
    try {
      const response = await fetch(`http://localhost:3002/api/vehiculos/espacios?${tipo}=${value}`);
      if (!response.ok) throw new Error("Error fetching data");
      const result = await response.json();
      setData(result.data);
    } catch (error) {
      console.error("Error fetching espacios:", error);
      notFound();
    }
  };
  const filterEspacios = (tipo:string, value:string) => {
    getEspacios(tipo,value)
  }
   
  

  useEffect(() => {
    getEspacios();
    getVehiculos();
  }, []);

  return (
    <div className="bg-gray-900  border-red-600 text-white ">
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={true}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        style={{ width: "300px", fontSize: "14px" }}
      />
    <div className="flex flex-col lg:flex-row justify-between items-center mb-4">
        <h1 className="font-bold">
          Total de espacios {data.length}
        </h1>

       
        
        <div className="flex flex-col justify-end items-end gap-4" >
        <ModalEspacios registrar={registrarEspacios} handleChange={handleChange} />
          <div className="flex gap-4" >
          <Button className="capitalize" variant="shadow" onPress={()=>filterEspacios('tipo','Estandar')} radius="full" size="sm" color="primary" >Carros</Button>
          <Button className="capitalize" variant="shadow"  radius="full" onPress={() => filterEspacios("tipo", "Moto")} size="sm" color="warning" >Motos</Button>
          <Button className="capitalize" variant="shadow"  radius="full" onPress={()=> filterEspacios("estado", "libre") } size="sm" color="success" >Libres</Button>
          <Button className="capitalize" variant="shadow"  radius="full" onPress={()=>filterEspacios("estado", "ocupado")} size="sm" color="danger">Ocupados</Button>
          <Button className="capitalize" radius="full" onPress={()=>getEspacios()} size="sm" color="default">Resetear valores</Button>
          
          </div>
        
        </div>
       
    </div>
      <div className="flex justify-center flex-wrap gap-6">
       
        {data.map((espacio: Espacio) => (
          <EspacioItems
            key={espacio.id}
            id={espacio.id}
            numero={espacio.numero}
            vaciar={vaciarEspacio}
            estado={espacio.estado}
            marca={espacio?.Vehiculo?.marca}
            tipo={espacio?.tipo}
            color={espacio?.Vehiculo?.color}
            modelo={espacio?.Vehiculo?.modelo}
            mostrar={mostrar}
            setMostrar={setMostrar}
            asignar={toggleMostrar}
            vehiculos={vehiculos}
            hanledChange={hanledChange}
            asignarEspacio={asignarEspacio}
          />
        ))}
      </div>
    </div>
  );
};