import "./globals.css";
import { ScrollShadow } from "@nextui-org/react";
import Nav from '../../components/nav';

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head>
        <link 
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&family=Open+Sans:ital,wght@0,300..800;1,300..800&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body style={{ fontFamily: "'JetBrains Mono', monospace" }}>
        <div className="flex flex-col min-h-screen">
          <div className="sticky top-0 z-10 border-b border-gray-700">
            <Nav />
          </div>

          <div className="flex flex-1">
            {/* Aside para navegación secundaria o información adicional */}
            <aside className="w-[100px] bg-gray-800   p-4 border-r border-gray-700">
              <h2 className="text-white"></h2>
              <ul className="text-gray-300">

              </ul>
            </aside>

            {/* Contenedor principal */}
            <ScrollShadow className="flex-1 bg-gray-900 p-4 overflow-y-auto">
              {children}
            </ScrollShadow>
            <aside className="w-[100px] bg-gray-800   p-4 border-r border-gray-700">
              <h2 className="text-white"></h2>
              <ul className="text-gray-300">

              </ul>
            </aside>
          </div>
        </div>
      </body>
    </html>
  );
}