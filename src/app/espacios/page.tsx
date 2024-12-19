"use client";

import { Espaciosgrid } from '@/modules/espacios';
import ModalEspacios from '@/modules/espacios/components/Modal';
import { postEspacios } from '@/modules/espacios/helpers/fetchingEspacios';
import React, { useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Page() {


  return (
    <div className="min-h-screen overflow-y-auto bg-gray-900 text-white p-4">
      <div className="flex flex-col lg:flex-row justify-between items-center mb-4">
        <h1 className="font-bold text-3xl uppercase mb-4 lg:mb-0">
          Espacios disponibles
        </h1>
        
      </div>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        style={{ width: '300px', fontSize: '14px' }}
      />
      <div className=" overflow-auto p-2 h-full border-red-600">
        <Espaciosgrid />
      </div>
    </div>
  );
}

export default Page;