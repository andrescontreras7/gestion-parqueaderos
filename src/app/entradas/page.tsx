'use client'
import EntradaList from "@/modules/entradas/components/entradas";
import { getData } from "@/modules/entradas/helpers/fetching";
import { Entrada } from "@/modules/entradas/helpers/type";
import React, { useState, useEffect } from "react";
import { Select, SelectItem, Avatar, Spinner } from '@nextui-org/react';
import { Tooltip, Button } from "@nextui-org/react";
import Link from "next/link";
import ViewSkeleton from "@/modules/historial/components/skeleton";

function Page() {
  const [storage, setStorage] = useState<Entrada[]>([]);
  const [error, setError] = useState({ status: false, message: "" });
  const [loanding , setLoanding] = useState(true);

  const Click = () => {
    console.log("Click clicked");
    getVehiculos('/entradas-salidas?activo=true');
  }

  const reset = () => {
    getVehiculos('/entradas-salidas');
  }

  const getVehiculos = async (consulta: string) => {
    setLoanding(true);
  try{
  
    const data = await getData(`vehiculos${consulta}`);
    setStorage(data.data);
    console.log(data.message)
    if (data.status === 404) {
      setError({ status: true, message: data.message })
    }
  }
   catch (error) {
    setError({ status: true, message: "Error al obtener los datos" })
 
   }
    finally {
      setLoanding(false);
    }
  };

  useEffect(() => {
    getVehiculos('/entradas-salidas');
  }, []);

  const valor = 30;
  const options = [];

  for (let i = 0; i <= valor; i++) {
    options.push(<SelectItem key={i} value={i}>{i}</SelectItem>);
  }

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setError({ status: false, message: "" })
    const selectedValue = e.target.value;
    getVehiculos(`/entradas-salidas?dias=${selectedValue}`);
  };

  return (
    <div className="h-screen bg-gray-900 text-white p-4">
          <h1 className='text-2xl text-white uppercase p-2 font-medium  lg:block'>Registro entradas</h1>
      <div className="mb-4 flex items-center gap-4 w-full">
        
        <Select
          label="Filtrar por días"
          variant="bordered"
          placeholder="Seleccione"
          className="max-w-xs"
          onChange={handleSelectChange}
        >
          {options}
        </Select>
        <div className="flex justify-between w-full gap-2">
        <div className="flex gap-2">
        <Tooltip key={"success"} className="capitalize text-white" color={"warning"} content={"Sin salida"}>
            <Button className="capitalize" onClick={Click} radius="full" size="sm" color={"warning"} variant="flat">
              Sin salida
            </Button>
          </Tooltip>
          <Tooltip key={"yellow"} className="capitalize" color={"danger"} content={"Activos"}>
            <Button className="capitalize font-bold" radius="full" size="sm" color={"danger"} variant="flat">
              Activos
            </Button>
          </Tooltip>
          <Button className="capitalize text-white" onClick={reset} radius="full" size="sm" color={"default"} variant="flat">
            Resetear valores
          </Button>
        </div>
        </div>
           <div className="">
            <Button className="capitalize" radius="sm" size="md" color={"primary"}>
              <Link href="/historial">Historial</Link>
            </Button>
           </div>
      </div>
      

      {
        loanding ? <div className="w-full flex justify-center items-center " ><Spinner size="lg" label="Cargando...." labelColor="primary" /></div> :
          error.status ? <div className="text-center text-white">{error.message}</div> :
            <EntradaList data={storage} />
      }
    </div>
  );
}

export default Page;