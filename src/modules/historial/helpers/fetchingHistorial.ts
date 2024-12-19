"use server"

export const getHistorial = async (cuerpo: string) => {
    try {
      const response = await fetch(`http://localhost:3002/api/${cuerpo}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
  
      if (response.ok) {
        const data = await response.json();
        return {
          status: response.status,
          message: 'Datos obtenidos con éxito',
          data: data,
        };
      } else {
        return {
          status: response.status,
          message:"No hay datos para esa fecha",
        };
   
      }
    } catch (error) {
      console.error('Error fetching historial:', error);
      return {
        status: 500,
        message: 'Error fetching historial',
      };
    }
  };