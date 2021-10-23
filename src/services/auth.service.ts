import axios from 'axios';
import { LoginCredentials, LoginResponse } from '../react-app-env';



class AuthService {
  static timerRef: any;
  static async login(credentials: LoginCredentials) {
    const { data } = await axios.post<LoginResponse>('http://localhost:4000/api/v1/auth/login', credentials, {
        withCredentials: true,
    });
    this.timerRef = setTimeout(() => {
      this.refresh();
    }, data.expireIn - 1000);
    return data;
  }

  static async logout() {
    await axios.post('http://localhost:4000/api/v1/auth/logout', {}, {
      withCredentials: true,
    });
  }

  static async refresh() {
    const { data } = await axios.post<LoginResponse>('http://localhost:4000/api/v1/auth/token',{}, {
      withCredentials: true,
    });
    return data;
  }
}

export default AuthService;