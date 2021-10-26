import React, { useState } from 'react';
import { 
  Input, 
  Button, 
  Modal, 
  DatePicker, 
  Message, 
  LoadingOverlay 
} from '..';
import NumberFormat from 'react-number-format';
import { FormikHelpers, useFormik } from 'formik';
import * as Yup from 'yup';
import { Transition } from '@headlessui/react';

import { PlayerCreate } from '../../react-app-env';
import WebcamCapture from '../WebcamCapture/WebcamCapture';
import Picture  from './Picture';

interface PlayerFormProps {
  onSubmit: (values: PlayerCreate, picture: string | null, actions:FormikHelpers<PlayerCreate>) => Promise<void>;
};

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required(),
  lastName: Yup.string().required(),
  cedula: Yup.string().required(),
  email: Yup.string().email().required(),
  eps: Yup.string().required(),
  phone: Yup.string().required(),
  birthday: Yup.date().required(),
});

const PlayerForm: React.FC<PlayerFormProps> = ({ onSubmit }) => {
  const [error, setError] = useState<null | string>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [picture, setPicture] = useState<string | null>(null);

  const formik = useFormik<PlayerCreate>({
    initialValues: {
      firstName: '',
      lastName: '',
      cedula: '',
      email: '',
      eps: '',
      phone: '',
      birthday: new Date(),
    },
    validationSchema,
    async onSubmit(values, actions) {
      setLoading(true);
      try {
        await onSubmit(values, picture, actions);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('Algo salio mal 😟 por favor intenta nuevamente');
        }
        setLoading(false);
      }
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
      <LoadingOverlay
        loading={loading}
        message="Guardando información en la base de datos..." 
      />
      <Modal 
        title="Toma una foto" 
        open={open} 
        onClose={handleCloseModal}
      >
        <WebcamCapture
          onCancel={handleCloseModal}
          onCapture={handleCapture}/>
      </Modal>
      <div className="max-w-3xl mx-auto p-10 rounded-lg bg-white">
        <form onSubmit={formik.handleSubmit}>
          <div className="space-y-6">
            <Picture picture={picture} onClick={() => setOpen(true)} />
            <div className="grid grid-cols-2 gap-6">
              <Input
                error={formik.touched.firstName && formik.errors.firstName}
                value={formik.values.firstName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="text"
                name="firstName" 
                placeholder="Nombre..." 
                label="Nombres" 
              />
              <Input
                error={formik.touched.lastName && formik.errors.lastName}
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
                error={formik.touched.cedula && formik.errors.cedula}
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
                onChange={(date) => formik.setFieldValue('birthday', date)} 
              />
            </div>
            <Input
              error={formik.touched.email && formik.errors.email}
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="email"
              name="email" 
              label="Correo electronico" />
            <div className="grid grid-cols-2 gap-6">
              <Input
                error={formik.touched.eps && formik.errors.eps}
                value={formik.values.eps}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="text"
                name="eps" 
                placeholder="EPS..." 
                label="Eps" />
              <NumberFormat
                error={formik.touched.phone && formik.errors.phone}
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
            <Transition
              show={Boolean(error)}
              enter="transition-opacity duration-75"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity duration-150"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Message>
                {error}
              </Message>
            </Transition>
            <Button
              disabled={!formik.isValid || formik.isSubmitting} 
              type="submit" 
              full>
                Crear jugador
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default PlayerForm;
