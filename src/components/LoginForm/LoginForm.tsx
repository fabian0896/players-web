import React from "react";
import { Input, Button, Message } from '../../components';
import { FaUserAlt, FaLock } from 'react-icons/fa'
import { Link } from "react-router-dom";
import { FormikHelpers, useFormik } from 'formik';
import * as Yup from 'yup';
import { LoginCredentials } from "../../react-app-env";

interface LoginFormProps {
  onSubmit: (values: LoginCredentials, actions?: FormikHelpers<LoginCredentials>) => Promise<void>,
  error?: boolean
}

const validationSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().required(),
})

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, error }) => {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    async onSubmit(values, actions) {
      await onSubmit(values, actions);
    },
  });
  return(
    <div className="relative w-80 py-2">
      <div className="absolute transform rotate-3 top-0 left-0 w-full bottom-0 bg-gradient-to-tr from-red-500 to-red-900 rounded-lg"></div>
      <div className="relative bg-white h-full w-full shadow rounded-lg">
        <div className="p-4">
          <img
            src="https://1000marcas.net/wp-content/uploads/2019/12/NBA-Logo.png" 
            alt="nba-logo" 
          />
        </div>
        {error && (
          <div className="p-4">
            <Message>
              Usuario o contraseña incorrectos. Intenta nuevamente
            </Message>
          </div>
        )}
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
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
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
                Ingresar
              </Button>
            <p className="text-gray-700 text-center leading-5 text-sm">
              No recuerdas tu contraseña? 🤦‍♂️ {' '}
              <Link 
                className="text-red-500 font-semibold underline"
                to="/home"
              >
                recuperala aqui
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
