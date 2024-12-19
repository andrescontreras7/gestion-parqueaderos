import { Modal, ModalContent, ModalHeader, ModalBody, Select, SelectItem, ModalFooter, Button, useDisclosure, Input } from "@nextui-org/react";
import { ToastContainer, toast } from 'react-toastify';


export default function ModalVehiculos({ hanled, enviar } : any) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button onPress={onOpen} color="primary">Registrar Vehiculos</Button>
      <Modal 
        isOpen={isOpen} 
        onOpenChange={onOpenChange}
        placement="top-center"
      >
        <ModalContent className="rounded-md">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col font-bold text-gray-700 gap-1">Registro de vehiculos</ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  name="marca"
                  label="Marca"
                  placeholder="Ingrese marca del vehiculo"
                  variant="bordered"
                  onChange={(e) => hanled(e)}
                />
                <Input
                  name="placa"
                  label="Placa"
                  placeholder="Ingrese placa del vehiculo"
                  variant="bordered"
                  onChange={(e) => hanled(e)}
                />
                <Input
                  name="modelo"
                  label="Modelo"
                  placeholder="Ingrese modelo del vehiculo"
                  variant="bordered"
                  onChange={(e) => hanled(e)}
                />
                <Input
                  name="color"
                  label="Color"
                  placeholder="Ingrese color del vehiculo"
                  variant="bordered"
                  onChange={(e) => hanled(e)}
                />
                <Select
                  name="tipo"
                  label="Tipo de vehiculo"
                  placeholder="Seleccione"
                  variant="bordered"
                  onChange={(e) => hanled(e)}
                >
                  <SelectItem key={'carro'} value="carro">Carro</SelectItem>
                  <SelectItem key={'moto'} value="moto">Moto</SelectItem>
                </Select>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Cancelar
                </Button>
                <Button color="primary" onClick={enviar}>
                  Registrar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
           
      </Modal>
 
    </>
  );
}