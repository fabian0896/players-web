import React, { useState } from 'react';
import { Input, Button, Modal } from '..';
import NumberFormat from 'react-number-format';
import { FcAddImage } from 'react-icons/fc';

const PlayerForm: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <>
      <Modal open={open} onClose={() => setOpen(false)} />
      <div className="max-w-3xl mx-auto">
        <form>
          <div className="space-y-6">
            <div className="flex justify-center pb-6">
              <div 
                onClick={() => setOpen(true)} 
                className="w-52 h-52 shadow bg-gray-200 mr-6 rounded-lg flex items-center justify-center border-gray-500 border-2 border-dashed"
              >
                <FcAddImage size={50} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <Input placeholder="Nombre..." label="Nombres" />
              <Input placeholder="Apellidos..." label="Apellidos" />
            </div>
            <div className="grid grid-cols-2 gap-6">
              <Input placeholder="" label="Cedula" />
              <Input type="date" placeholder="" label="Fecha de nacimiento" />
            </div>
            <Input label="Correo electronico" />
            <div className="grid grid-cols-2 gap-6">
              <Input placeholder="" label="Eps" />
              <NumberFormat
                placeholder="Numero de telefono..."
                label="Telefono" 
                customInput={Input} 
                format="(###) ### ####" 
              />
            </div>
            <Button full>Crear jugador</Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default PlayerForm;
