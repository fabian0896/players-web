import React, { useState } from 'react';
import { useFormik } from 'formik';
import { FaLock } from 'react-icons/fa';
import * as Yup from 'yup';

import { Input, Button, Message } from '..';

const validationSchema = Yup.object().shape({
  password: Yup.string().required(),
  confirmPassword: Yup.string().oneOf([Yup.ref('password')]),
})

interface ResetPasswordFormProps {
  onSubmit: (password: string) => Promise<void>
  onFinish: () => void
}

const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({ onSubmit, onFinish }) => {
  const [completed, setCompleted] = useState(false);

  const formik = useFormik({
    initialValues: {
      password: '',
      confirmPassword: '',
    },
    validationSchema,
    async onSubmit(values) {
      await onSubmit(values.password);
      setCompleted(true);
    }
  });

  return(
    <div className="relative w-80 py-2">
      <div className="absolute transform rotate-3 top-0 left-0 w-full bottom-0 bg-gradient-to-tr from-red-500 to-red-900 rounded-lg"></div>
      <div className="relative bg-white h-full w-full shadow rounded-lg">
        <div className="p-4">
          <h1 className="text-gray-800 text-2xl font-semibold mb-2">Recupera tu cuenta</h1>
          <p className="text-gray-600 text-sm">
            Ingresa una nueva contraseña para poder acceder a tu cuenta.
          </p>
        </div>
        <div className={`${completed ? 'p-4' : 'p-0'}`}>
          <Message success show={completed}>
            Se realizo el cambio de contraseña correctamente. Vuelve al inicio para ingresar a tu cuenta con la nueva contraseña.
          </Message>
        </div>
        {completed ?  (
          <div className="p-4">
            <Button full onClick={onFinish}>Ir al inicio</Button>
          </div>
        ) : (
          <form onSubmit={formik.handleSubmit} className="p-4 space-y-8">
            <Input
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                (formik.touched.password && formik.errors.password) ||
                (formik.touched.confirmPassword && formik.errors.confirmPassword)
              }
              name="password"
              type="password"
              label="Nueva contraseña"
              placeholder="Nueva contraseña"
              icon={FaLock}
            />
            <Input
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.confirmPassword && formik.errors.confirmPassword}
              name="confirmPassword"
              type="password"
              label="Confirma tu contraseña"
              placeholder="Confirma tu contraseña"
              icon={FaLock}
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

export default ResetPasswordForm;
