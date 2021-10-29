import { Role } from "../react-app-env";

const roles: Array<{ name: string, value: Role }> = [
  {
    value: 'admin',
    name: 'Administrador'
  },
  {
    value: 'editor',
    name: 'Editor'
  },
  {
    value: 'reader',
    name: 'Lector'
  }
]

const config = {
  api: 'http://localhost:4000/api/v1',
  roles
};

export default config;
