import React, { useState } from 'react';
import { useFormik } from 'formik';
import { FaMailBulk } from 'react-icons/fa';
import * as Yup from 'yup';

import { Input, Button, Message } from '..';

interface StartResetPasswordProps {
  onSubmit: (email: string) => Promise<void>
  onFinish: () => void
}

const validationSchema = Yup.object().shape({
  email: Yup.string().email().required(),
});

const StartResetPasswordForm: React.FC<StartResetPasswordProps> = ({ onSubmit, onFinish }) => {
  const [completed, setCompleted] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema,
    async onSubmit(values) {
      await onSubmit(values.email);
      setCompleted(true);
    }
  });

  return(
    <div className="relative w-80 py-2">
      <div className="absolute transform rotate-3 top-0 left-0 w-full bottom-0 bg-gradient-to-tr from-red-500 to-red-900 rounded-lg"></div>
      <div className="relative bg-white h-full w-full shadow rounded-lg">
        <div className="p-4">
          <h1 className="text-gray-800 text-2xl font-semibold mb-2">Olvidaste tu contraseña?</h1>
          <p className="text-gray-600 text-sm">
            Ingresa tu correo electronico para enviarte un correo con el cual podras recuperar tu cuenta.
          </p>
        </div>
        <div className={`${completed ? 'p-4' : 'p-0'}`}>
          <Message success show={completed}>
            Si tu correo esta registrado se habra enviado un mensaje con el cual podras recuperar tu cuenta.
          </Message>
        </div>
        {completed ? (
          <div className="p-4">
            <Button full onClick={onFinish} >Ir al inicio</Button>
          </div>
        ) : (
          <form onSubmit={formik.handleSubmit} className="p-4 space-y-8">
            <Input
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && formik.errors.email}
              name="email"
              type="email"
              label="Correo electronico"
              placeholder="correo electronico..."
              icon={FaMailBulk}
            />
            <div>
              <Button
                full
                disabled={formik.isSubmitting || !formik.isValid} 
                type="submit" 
                className="mb-5">
                  Restaurar contraseña
                </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default StartResetPasswordForm;
