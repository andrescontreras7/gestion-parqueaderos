import React, { useMemo } from 'react';
import { postEntradas } from '@/modules/entradas/helpers/fetching';
import { Select, SelectItem, Avatar } from '@nextui-org/react';
import { Vehiculos } from '../helpers/type';

export default function App({ data , hanledChange, value, setValid } : { data: Vehiculos[], hanledChange:any, value:number, setValid:any  }) {

if(data) setValid(true)


  const selectItems = useMemo(() => {
    return data ? data.map((item) => (
      <SelectItem
        className="flex text-black"
        key={item.id}
        startContent={
          <Avatar
            src="https://i.pravatar.cc/300"
            alt="Avatar"
            size="sm"
            className="mr-2"
          />
         
        }
      >
        <div className="flex gap-2 text-black" key={item.id}>
          <span> {item.marca} </span> <span>{item.modelo} </span>{" "}
          <span>{item.placa}</span>
        </div>
      </SelectItem>
    ))
    : (
      <SelectItem key={0} > No hay vehiculos disponibles</SelectItem>
    )


    
  }, [data]);

  return (
    <div className="flex w-full max-w-xs flex-col gap-2">
      <Select
        label="Vehiculos en base de datos"
        variant="bordered"
        placeholder="Seleccione un vehiculo"
        selectedKeys={[value]}
        className="max-w-xs"
        onChange={hanledChange}
      >
        {selectItems}
      </Select>
      <p className="text-small text-default-500">Selected: {value}</p>
    </div>
  );
}