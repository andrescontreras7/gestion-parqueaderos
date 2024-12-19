import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div>
    
    <main className="h-screen w-full flex flex-col justify-center items-center bg-[#ff004a]">
        <h1 className="text-9xl font-extrabold text-white tracking-widest">Espacios no encontrados</h1>
        
       
        <button className="mt-5">
        <div
            className="relative inline-block text-sm font-medium text-[#e30052] group active:text-orange-500 focus:outline-none focus:ring"
        >
            <span
            className="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-[#FF6A3D] group-hover:translate-y-0 group-hover:translate-x-0"
            ></span>

            <span className="relative block px-8 py-3 bg-[#fafbfd] border ">
            <Link href="/">Volver</Link>
            </span>
            
        </div>
        </button>
        
    </main>
   

    </div>
  )
}