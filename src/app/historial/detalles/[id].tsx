import React from 'react';
import { useRouter } from 'next/router';

function Page() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div className="h-screen bg-gray-900 text-white p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Detalles del Historial</h1>
      <p className="text-xl">ID: {id}</p>
      
    </div>
  );
}

export default Page;