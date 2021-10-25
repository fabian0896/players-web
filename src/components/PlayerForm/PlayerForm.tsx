import React, { useState } from 'react';
import { Input, Button, Modal } from '..';
import NumberFormat from 'react-number-format';
import { FcAddImage } from 'react-icons/fc';
import { useFormik } from 'formik';
import { PlayerCreate } from '../../react-app-env';

const PlayerForm: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
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

  return (
    <>
      <Modal open={open} onClose={() => setOpen(false)} />
      <div className="max-w-3xl mx-auto">
        <form onSubmit={formik.handleSubmit}>
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
              <Input
                onChange={({ target }) => formik.setFieldValue('birthday', new Date(target.value))}
                onBlur={formik.handleBlur}
                name="birthday" 
                type="date" 
                placeholder="" 
                label="Fecha de nacimiento" 
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
