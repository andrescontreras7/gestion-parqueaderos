import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
import dayjs from 'dayjs'; 

export const columns: GridColDef[] = [
  { field: "id", headerName: "id", width: 100, editable: true },
  { field: "tipo", headerName: "tipo", width: 100, editable: true },
  { field: "marca", headerName: "marca", width: 150, editable: true },
  { field: "placa", headerName: "Placa", width: 100, editable: true },
  { field: "color", headerName: "color", width: 100, editable: true },
  { field: "modelo", headerName: "Modelo", width: 100, editable: true },
  { field: "numeroEspacio", headerName: "Espacio asignado", width: 150, editable: true },
  {
    field: "horaEntrada",
    headerName: "Entrada",
    width: 120,
    editable: true,
    renderCell: (params) => dayjs(params.value).format('YYYY-MM-DD HH:mm'),
  },
  {
    field: "horaSalida",
    headerName: "Salida",
    width: 120,
    editable: true,
    renderCell: (params) => {
      const salida = params.value;
      return salida ? dayjs(salida).format('YYYY-MM-DD HH:mm') : 'En parqueadero';
    },
  },
  {
    field: "diasEnParqueadero",
    headerName: "Días en parqueadero",
    width: 150,
    editable: true,
  },
];