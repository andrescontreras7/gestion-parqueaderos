import Link from 'next/link';
import React from 'react';

function page() {
  return (
    <div className='border h-screen'>
      <h1 className=' font-bold text-xl m-2'>
        Home 
      </h1>

     <div className='flex  p-2   '>
       <div className='border cursor-pointer  duration-150 transition-all ease-in-out hover:scale-105 p-2 rounded-md '>
        <Link href="/registrar/vehiculos">Registrar un vehiculo </Link>
      </div>
     
     </div>
     
      
    </div>
  );
}

export default page;
    