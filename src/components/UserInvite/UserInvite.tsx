import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Transition } from '@headlessui/react';

import { Button, Input, ListBox, Message } from '..';
import { Invite } from '../../react-app-env';

type Options = {
  value: 'admin' | 'editor' | 'reader',
  name: string
}

interface UserInviteProps {
  onInvite: (values: Invite) => Promise<void>
}

const options: Options[] = [
  {
    value: 'reader',
    name: 'Lector'
  },
  {
    value: 'editor',
    name: 'Editor'
  }, 
  {
    value: 'admin',
    name: 'Administrador'
  }, 
]

const validationSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  role: Yup.object().shape({
    name: Yup.string().required(),
    value: Yup.string().oneOf(['admin', 'editor', 'reader']),
  })
})

const UserInvite: React.FC<UserInviteProps> = ({ onInvite }) => {
  const [error, setError] = useState(false);
  const formik = useFormik({
    initialValues: {
      email: '',
      role: options[0],
    },
    validationSchema,
    async onSubmit(values, actions) {
      setError(false);
      try {
        await onInvite({
          email: values.email,
          role: values.role.value,
        });
      } catch (error) {
        setError(true);
      }
    }
  });

  return(
    <div className="bg-white rounded-lg shadow-lg p-5">
      <div className="pb-5 border-b">
        <h2 className="text-gray-800 text-xl font-semibold mb-2">Generar un invitación</h2>
        <p className="text-sm text-gray-700">
          La invitación se enviara al correo electronico.{' '}
          Es importante que se registre con el mismo correo electronico{' '}
          que se proporcina en el formulario.
        </p>
      </div>
      <form onSubmit={formik.handleSubmit} className="space-y-5 mt-5">
        <Input
          name="email"
          onBlur={formik.handleBlur}
          error={formik.touched.email && formik.errors.email}
          value={formik.values.email}
          onChange={formik.handleChange}
          label="Correo electronico"
          placeholder="Correo electronico"
        />
        <ListBox
          label="Rol del usuario"
          onCange={(value) => formik.setFieldValue('role', value)}
          value={formik.values.role}
          options={options}
        />
        <Transition
          show={error}
          enter="transition duration-100 ease-out"
          enterFrom="transform scale-95 opacity-0"
          enterTo="transform scale-100 opacity-100"
          leave="transition duration-75 ease-out"
          leaveFrom="transform scale-100 opacity-100"
          leaveTo="transform scale-95 opacity-0"
        >
          <Message>
            Algo salio mal 😢 posiblemente el usuario ya este registrado. Intenta nuevamente
          </Message>
        </Transition>
        <Button
          disabled={!formik.isValid || formik.isSubmitting} 
          type="submit" 
          full
        >
          Generar invitación
        </Button>
      </form>
    </div>
  );
};

export default UserInvite;
