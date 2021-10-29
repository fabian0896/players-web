import React from "react";
import { Input, Button, Message } from '../../components';
import { FaUserAlt, FaLock } from 'react-icons/fa'
import { Link } from "react-router-dom";
import { FormikHelpers, useFormik } from 'formik';
import * as Yup from 'yup';
import { LoginCredentials } from "../../react-app-env";

interface SignupFormProps {
  onSubmit: () => void
  error?: boolean
}

const validationSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string(),
  confirm: Yup.string().oneOf([Yup.ref('password')]).required(),
  name: Yup.string().required(),
})

const SignupForm: React.FC<SignupFormProps> = ({ onSubmit, error }) => {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirm: '',
      name: ''
    },
    validationSchema,
    async onSubmit(values, actions) {
      console.log(values, actions);
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
          <h1 className="text-gray-800 text-2xl font-semibold mb-2 text-center">Registro</h1>
          <p className="text-gray-600 text-sm text-center">Ingresa el correo electronico y una contraseña. Estas seran las credenciales con las que podras acceder al sistema</p>
        </div>
        <Message show={error}>
          Usuario o contraseña incorrectos. Intenta nuevamente
        </Message>
        <form onSubmit={formik.handleSubmit} className="p-4 space-y-8">
          <Input
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="email"
            type="email"
            label="Correo electronico"
            placeholder="correo electronico..."
            icon={FaUserAlt}
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
            error={
              (formik.touched.password && formik.errors.password) ||
              (formik.touched.confirm && formik.errors.confirm)
            }
            name="password" 
            type="password" 
            label="Contraseña"
            placeholder="contraseña..."
            icon={FaLock} 
          />
          <Input
            value={formik.values.confirm}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.confirm && formik.errors.confirm}
            name="confirm" 
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
                Registrarme
              </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;