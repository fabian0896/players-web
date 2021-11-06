import { Role, User } from '../react-app-env';

const roleVerify = (user: User | null, role: Role[]) => {
  if (!user) return false;
  return role.includes(user.role);
};

export default roleVerify;
