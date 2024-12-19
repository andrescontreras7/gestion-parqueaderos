import React from 'react';
import { Entrada } from '../helpers/type';
import { DataGrid } from "@mui/x-data-grid";
import { columns  } from '../data/columns';


function EntradaList({ data }: { data: Entrada[] }) {
  const getRowClassName = (params: any) => {
    return params.row.diasEnParqueadero > 10
      ? "bg-red-100 text-red-600 uppercase"
      : params.row.diasEnParqueadero > 5
      ? "bg-yellow-100 text-yellow-600 uppercase"
      : "bg-green-100 text-green-600";
  };



  return (
    <div>
      <DataGrid
        rows={data}
        columns={columns}
        getRowClassName={getRowClassName}
      
      />
    </div>
  );
}

export default EntradaList;