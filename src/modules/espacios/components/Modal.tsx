'use client'
import { Modal, ModalBody,ModalFooter, ModalContent, ModalHeader, useDisclosure, Select, SelectItem} from '@nextui-org/react';
import { Button } from '@nextui-org/react';
import React from 'react';

function ModalEspacios({registrar, hanleChange}) {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
  
  
  return (
    
    <div>
   
        <Button className="rounded-md " onPress={onOpen}>Registrar un espacio </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col font-extrabold text-gray-700 gap-1">Registro</ModalHeader>
              <ModalBody>
                <input type="text" name="numero" placeholder="nombre del espacio" className='p-2' onChange={hanleChange} />
                <Select
                className='p-2'
                label="Tipo de espacio"
                onChange={hanleChange}
                name='tipo'
                
                >
                    <SelectItem key={"moto"} value="Moto">Moto</SelectItem>
                    <SelectItem key={"carro"} value="Carro">Carro</SelectItem>
                </Select>

             
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}  >
                  Close
                </Button>
                <Button color="primary"  onClick={registrar}   >
                  Registrar Espacio
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
       
      
    </div>
  );
}

export default ModalEspacios;
