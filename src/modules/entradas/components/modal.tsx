import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import React, { useState } from "react";
import { Vehiculos } from "../helpers/type";

export default function App({ vehiculos, url, titulo, insValid, enviarData }: { vehiculos: Vehiculos[], url: string, titulo: string, insValid: any, enviarData: any }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedValue, setSelectedValue] = useState<string | undefined>();

  const handleSelectionChange = (value: string) => {
    setSelectedValue(value);
  };

  return (
    <>
      <Button className="rounded-md bg-blue-600 text-white hover:bg-blue-700" onPress={onOpen}>{titulo}</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent className="bg-gray-800 text-white">
          {() => (
            <>
              <ModalHeader className="flex flex-col font-extrabold text-gray-300 gap-1">Registro</ModalHeader>
              <ModalBody>
                <p className="text-gray-400">Seleccione el vehículo</p>
                <Autocomplete
                  className="max-w-xs"
                  label="Seleccione el vehículo"
                  placeholder="Buscar por placa"
                  variant="flat" // Cambia a la variante que desees
                  onSelectionChange={handleSelectionChange}
                >
                  {vehiculos.map(vehiculo => (
                    <AutocompleteItem key={vehiculo.id} value={vehiculo.placa}>
                      {vehiculo.placa}  
                    </AutocompleteItem>
                    
                  ))}
                </Autocomplete>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onOpenChange} disabled={!insValid}>
                  Cerrar
                </Button>
                <Button 
                  color="primary" 
                  onPress={() => enviarData(url, selectedValue)} 
                  disabled={!insValid || !selectedValue} 
                >
                  Enviar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}