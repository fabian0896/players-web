import React, { useState } from 'react';
import { Input, Button, Modal, DatePicker } from '..';
import NumberFormat from 'react-number-format';
import { useFormik } from 'formik';
import { PlayerCreate } from '../../react-app-env';
import WebcamCapture from '../WebcamCapture/WebcamCapture';

import Picture  from './Picture';

const PlayerForm: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [picture, setPicture] = useState<string | null>(null);

  const formik = useFormik<Partial<PlayerCreate>>({
    initialValues: {
      firstName: '',
      lastName: '',
      cedula: '',
      email: '',
      eps: '',
      phone: '',
      birthday: undefined,
    },
    async onSubmit(values, actions) {
      console.log(values);
      actions.resetForm();
    }
  });

  const handleCloseModal = () => {
    setOpen(false);
  }

  const handleCapture = (imageSrc: string | null) => {
    setPicture(imageSrc);
    setOpen(false);
  }
  return (
    <>
      <Modal 
        title="Toma una foto" 
        open={open} 
        onClose={handleCloseModal}
      >
        <WebcamCapture
          onCancel={handleCloseModal}
          onCapture={handleCapture}/>
      </Modal>
      <div className="max-w-3xl mx-auto">
        <form onSubmit={formik.handleSubmit}>
          <div className="space-y-6">
            <Picture picture={picture} onClick={() => setOpen(true)} />
            <div className="grid grid-cols-2 gap-6">
              <Input
                value={formik.values.firstName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="text"
                name="firstName" 
                placeholder="Nombre..." 
                label="Nombres" 
              />
              <Input
                value={formik.values.lastName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="text"
                name="lastName" 
                placeholder="Apellidos..." 
                label="Apellidos" 
              />
            </div>
            <div className="grid grid-cols-2 gap-6">
              <Input
                value={formik.values.cedula}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="cedula"
                type="text" 
                placeholder="" 
                label="Cedula" 
              />
              <DatePicker 
                label="Fecha de nacimiento" 
                onChange={(date) => console.log(date)} 
              />
            </div>
            <Input
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="email"
              name="email" 
              label="Correo electronico" />
            <div className="grid grid-cols-2 gap-6">
              <Input
                value={formik.values.eps}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="text"
                name="eps" 
                placeholder="EPS..." 
                label="Eps" />
              <NumberFormat
                value={formik.values.phone}
                onValueChange={({ value }) => formik.setFieldValue('phone', value)}
                onBlur={formik.handleBlur}
                type="tel"
                name="phone"
                placeholder="Numero de telefono..."
                label="Telefono" 
                customInput={Input} 
                format="(###) ### ####" 
              />
            </div>
            <Button type="submit" full>Crear jugador</Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default PlayerForm;
