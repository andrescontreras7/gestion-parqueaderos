'use client';

import { CiBookmarkCheck, CiLogout } from 'react-icons/ci';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

function Aside() {
  const pathname = usePathname();

  return (
    <aside className="fixed z-10 top-0 text-white pb-3 px-4 md:px-6  flex flex-col  justify-between h-screen border-r border-gray-600 bg-gray-900 transition duration-300 md:w-4/12 lg:w-[25%] xl:w-[20%] 2xl:w-[15%]">
      <div>
        <div className="mt-8 text-center">
          <h5 className="hidden mt-4 text-xl text-white font-semibold lg:block">
            Andres Cavadia
          </h5>
          <span className="hidden text-gray-400 lg:block">Admin</span>
        </div>
        
        <ul className="space-y-2 tracking-wide mt-8">
          {[
            { href: '/', label: 'Home' },
            { href: '/registrar/entradas', label: 'Entradas y salidas' },
            { href: '/vehiculos', label: 'Vehículos' },
            { href: '/entradas', label: 'Listado' },
            { href: '/espacios', label: 'Espacios' },
          ].map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={`relative px-4 py-3 flex items-center space-x-4 rounded-xl transition duration-300 ${
                  pathname === href
                    ? 'text-white bg-gradient-to-r from-sky-600 to-cyan-400'
                    : 'text-gray-600 group hover:bg-gray-700 hover:text-white'
                }`}
              >
                <CiBookmarkCheck size={30} />
                <span className="font-medium">{label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="px-6 -mx-6 pt-4 flex justify-between items-center border-t border-gray-600">
        <Link href="/logout" className="flex items-center text-gray-400 hover:text-white">
          <CiLogout size={30} />
          <span className="ml-2">Cerrar sesión</span>
        </Link>
      </div>
    </aside>
  );
}

export default Aside;