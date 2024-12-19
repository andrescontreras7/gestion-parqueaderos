'use client';

import React, { useState } from 'react';
import { postVehiculos } from '../helpers/fetching';
import ModalVehiculos from '../components/modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const FrmVehiculos = () => {
  const [data, setData] = useState({});


  const hanledChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const PostVehiculos = async () => {

    try {
      const response = await postVehiculos('vehiculos/create', data);
      console.log(response);
      if (response?.status === 201) {
        toast.success('Vehículo registrado con éxito!');
      } else {
        toast.error(response?.message || 'Error al registrar el vehículo.');
      }
    } catch (error) {
      console.error('Error en el post:', error);
      toast.error(error?.message || 'Error al registrar el vehículo.');
    } 
  };

  return (
    <div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        style={{ width: '400px', fontSize: '16px' }} 
      />
      <ModalVehiculos hanled={hanledChange} enviar={PostVehiculos} />
    </div>
  );
};