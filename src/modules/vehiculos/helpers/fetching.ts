export const postVehiculos = async (cuerpo: string, data: number) => {
    try {
      const response = await fetch(`http://localhost:3002/api/${cuerpo}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      console.log(response)
      if(response.ok!){
        return {
          status: response.status,
          message: response.statusText,
        };
        

      }
      if(response.status === 400){
        return {
          status: response.status,
          message: 'La placa del vehiculo ya existe',
        };
    }
      if(response.ok){
        return {
          status: response.status,
          message: 'Vehiculo registrado con exito',
        };
        
      }
    } catch (error) {
      console.error('Error fetching entradas:', error);
      throw error;
    }
  };


  export const updatedVehiculos = async (cuerpo: string, data: number, id:number) => {
    try {
      const response = await fetch(`http://localhost:3002/api/${cuerpo}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      console.log(response)
      if(response.ok!){
        return {
          status: response.status,
          message: response.statusText,
        };
        

      }
      if(response.status === 400){
        return {
          status: response.status,
          message: 'La placa del vehiculo ya existe',
        };
    }
      if(response.ok){
        return {
          status: response.status,
          message: 'Vehiculo registrado con exito',
        };
        
      }
    } catch (error) {
      console.error('Error fetching entradas:', error);
      throw error;
    }
  };
  
  