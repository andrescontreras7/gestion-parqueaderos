"use client";

import { Vehiculos } from "@/modules/entradas/helpers/type";
import { MagicCard } from "react-magic-motion";
import React, { useState, ChangeEvent } from "react";
import "react-magic-motion/card.css";

interface EspacioItemsProps {
  vaciar: any;
  id: number;
  numero: string;
  estado: string;
  marca?: string;
  modelo?: string;
  color?: string;
  tipo?: string;
  setMostrar: any;
  mostrar: boolean;
  hanledChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  asignar: (vehiculo: string, id: number) => void;
  vehiculos: Vehiculos[];
  asignarEspacio: (id: number) => void;
}

export const EspacioItems: React.FC<EspacioItemsProps> = React.memo(
  ({ vaciar, id, numero, estado, marca,setMostrar, modelo, asignarEspacio, color, tipo, mostrar, hanledChange, asignar, vehiculos }) => {
    const [isCardExpanded, setIsCardExpanded] = useState(false);

    return (
      <MagicCard
        isCardExpanded={isCardExpanded}
        
        onBackgroundFadeClick={() => {
          setIsCardExpanded(false)
          console.log("diste click afue4a")
          setMostrar(false)
        }

          

        }
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        <div
          className={`flex flex-col gap-4 p-6 ${isCardExpanded ? 'w-[30rem] text-white' : 'w-[20rem] text-current'} border border-gray-700 bg-gray-800 rounded-lg shadow-lg transition-all duration-300`}
        >
          <div className="relative flex items-center">
            <div>
              <h1 className="text-white text-3xl font-bold">{numero}</h1> <span>
                <p className={ tipo =="Estandar" ? "text-indigo-600" : "text-yellow-600"  } >{tipo}</p>
              </span>
              <p className={`font-bold uppercase ${estado === "ocupado" ? "text-red-500" : "text-green-500"}`}>
                {estado === "ocupado" ? "Ocupado" : "Libre"}
              </p>
            </div>
            <button
              className="absolute right-0 z-50 p-2 bg-gray-700 rounded-full hover:bg-gray-600 transition-colors"
              onClick={() => {
                setIsCardExpanded(!isCardExpanded)
                console.log("diste click")
                setMostrar(false)
              } }
            >
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M8 12L16 20L24 12"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="white"
                />
              </svg>
            </button>
          </div>
          <div className="overflow-y-auto">
            {isCardExpanded && (
              <div>
                {mostrar ? (
                  <div>
                    <h1 className="font-bold text-xl text-center mb-4 text-gray-300">Vehículos disponibles para asignar</h1>
                    <div className="flex gap-2 items-center justify-start">
                      <span className="text-gray-300">Seleccione el vehículo</span>
                      <select
                        name="selec"
                        className="border border-gray-600 bg-gray-700 text-gray-300 w-52 p-2 rounded-md"
                        onChange={hanledChange}
                        defaultValue=""
                      >
                        <option value="" disabled>Seleccione un vehículo</option>
                        {
                          tipo == "Moto" ? (
                            vehiculos.map((vehiculo) => vehiculo.tipo == "Moto" && (
                              <option key={vehiculo.id} value={vehiculo.id}>{vehiculo.marca} - {vehiculo.modelo} | {vehiculo.placa}  </option>
                            ))
                          )
                          : tipo == "Estandar" ? (
                            vehiculos.map((vehiculo) => vehiculo.tipo == "Carro" && (
                              <option key={vehiculo.id} value={vehiculo.id}> {vehiculo.marca} | {vehiculo.modelo} | {vehiculo.placa}  </option>
                            ))
                          )
                          : (
                            <option> No hay vehiculos disponibles para asignar :C  </option>
                          )
                        }
                      
                      </select>
                      <button
                        onClick={() => asignarEspacio(id)}
                        className="border border-gray-600 bg-green-500 text-white font-bold p-2 rounded-md"
                      >
                        Asignar
                      </button>
                    </div>
                  </div>
                ) : (
                
                  <section className="flex flex-col gap-4">
                    <h4 className="text-lg text-gray-300 text-center uppercase font-bold">Vehículo Asignado</h4>
                    {estado  === 'ocupado' ?  (
                      <div className="border border-gray-600 p-4 rounded-md h-60 bg-gray-700">
                        <p className="flex gap-2 text-gray-300">
                          <span className="font-medium uppercase">Marca:</span>
                          <span className="lowercase">{marca}</span>
                        </p>
                        <p className="flex gap-2 text-gray-300">
                          <span className="font-medium uppercase">Modelo:</span>
                          <span className="lowercase">{modelo}</span>
                        </p>
                        <p className="flex gap-2 text-gray-300">
                          <span className="font-medium uppercase">Color:</span>
                          <span className="lowercase">{color}</span>
                        </p>
                      </div>
                    ) : (
                      <p className="text-gray-500 text-center">No hay vehículo asignado a este espacio</p>
                    )}
                    {estado === 'libre' ? (
                      <div>
                        <button onClick={asignar} className="border border-gray-600 bg-green-500 m-auto flex justify-center rounded-md font-bold text-white p-2">
                          Asignar un vehículo
                        </button>
                      </div>
                    ) : (
                      <div className="flex flex-col gap-2">
                        <button className="border border-gray-600 bg-red-500 text-white font-bold p-2 rounded-md">
                          Eliminar espacio
                        </button>
                        <button onClick={() => vaciar(id)} className="border border-gray-600 bg-orange-500 text-white font-bold p-2 rounded-md">
                          Vaciar espacio
                        </button>
                      </div>
                    )}
                  </section>
                )}
              </div>
            )}
          </div>
        </div>
      </MagicCard>
    );
  }
);