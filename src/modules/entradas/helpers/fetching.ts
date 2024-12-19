import axios from "axios";
import { revalidatePath } from "next/cache";
export const postEntradas = async (cuerpo: string, data: number) => {
  try {
    const response = await fetch(`http://localhost:3002/api/${cuerpo}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id_vehiculo: data }),
    });

    const responseData = await response.json();

    if (response.ok) {
      return {
        status: response.status,
        message: responseData.message || `${cuerpo} con éxito`,
      };
    } else {
      return {
        status: response.status,
        message: responseData.message || 'Ocurrió un error inesperado',
      };
    }
  } catch (error) {
    console.error('Error fetching entradas:', error);
    throw error;
  }
};


export const getData = async (consulta:string ) => {

  try {
    const response = await fetch(`http://localhost:3002/api/${consulta}`);
  
    if(response.status === 404){
      return {
        status: response.status,
        message: 'No se encontraron datos'
      }
    }
    if(!response.ok){
      return {
        status: response.status,
        message: 'ocurrio un error inesperado',
      
      }
    }
    const data = await response.json();
    return data
  } catch (error) {
    console.error('Error fetching entradas:', error);
    throw error;
  }
};

