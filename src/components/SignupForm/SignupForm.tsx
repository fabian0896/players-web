import React, { useState } from "react";
import { Input, Button, Message } from '../../components';
import { FaUserAlt, FaLock, FaMailBulk } from 'react-icons/fa'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { SignupCredentials } from "../../react-app-env";

interface SignupFormProps {
  onSubmit: (values: Partial<SignupCredentials>) => Promise<void>
}

export interface SignupFormFields {
  name: string
  password: string
  email: string
} 

const validationSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string(),
  name: Yup.string().required(),
})

const SignupForm: React.FC<SignupFormProps> = ({ onSubmit }) => {
  const [error, setError] = useState(false);
  const formik = useFormik<SignupFormFields>({
    initialValues: {
      email: '',
      password: '',
      name: ''
    },
    validationSchema,
    async onSubmit(values) {
      setError(false);
      try {
        await onSubmit(values);
      } catch (error) {
        setError(true);
      }
    },
  });

  return(
    <div className="relative w-80 py-2">
      <div className="absolute transform rotate-3 top-0 left-0 w-full bottom-0 bg-gradient-to-tr from-red-500 to-red-900 rounded-lg"></div>
      <div className="relative bg-white h-full w-full shadow rounded-lg">
        <div className="p-4">
          {/* <img
            src="https://1000marcas.net/wp-content/uploads/2019/12/NBA-Logo.png" 
            alt="nba-logo" 
          /> */}
          <h1 className="text-gray-800 text-2xl font-semibold mb-2">Registro</h1>
          <p className="text-gray-600 text-sm">Ingresa el correo electronico y una contraseña. Estas seran las credenciales con las que podras acceder al sistema</p>
        </div>
        <div className={`${error ? 'p-4' : 'p-0'}`}>
          <Message show={error}>
          Al parecer la invitación no es valida o hay un problema en el servidor. Imntenta más tarde
          </Message>
        </div>
        <form onSubmit={formik.handleSubmit} className="p-4 space-y-8">
          <Input
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="email"
            type="email"
            label="Correo electronico"
            placeholder="correo electronico..."
            icon={FaMailBulk}
          />
          <Input
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && formik.errors.name}
            name="name"
            type="text"
            label="Nombre"
            placeholder="Nombre..."
            icon={FaUserAlt}
          />
          <Input
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && formik.errors.password}
            name="password" 
            type="password" 
            label="Contraseña"
            placeholder="contraseña..."
            icon={FaLock} 
          />
          <div>
            <Button
              full
              disabled={formik.isSubmitting || !formik.isValid} 
              type="submit" 
              className="mb-5">
                Registrarme
              </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;