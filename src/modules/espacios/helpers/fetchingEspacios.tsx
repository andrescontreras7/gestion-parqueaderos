
 'use server'

export const UpdateEspacios = async (cuerpo: string, data: string, id) => {

    try {
      const response = await fetch(`http://localhost:3002/api/${cuerpo}/${id} `, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
    
      if(response.ok!){
        return {
          status: response.status,
          message: response.statusText,
        };
        

      }
      
      if(response.ok){
        return {
          status: response.status,
          message: 'Espacio vaciado con exito',
          
        };
        
        
      }

      
    } catch (error) {
      console.error('Error fetching entradas:', error);
      throw error;
    }
  };


  export const postEspacios = async (cuerpo: string, data: object) => {
    try {
      const response = await fetch(`http://localhost:3002/api/${cuerpo}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      const result = await response.json();
  
      if (response.ok) {
        return {
          status: response.status,
          message: result.message || 'Espacio creado con éxito',
        };
      } else {
        return {
          status: response.status,
          message: result.message ,
        };
      }
    } catch (error) {
      console.error('Error fetching entradas:', error);
      return {
        status: 500,
        message: 'Error al crear el espacio',
      };
    }
  };
  

