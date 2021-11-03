import axios from 'axios';
import config from '../config';
import { Invite, InviteResponse, LoginCredentials, LoginResponse, SignupCredentials, User } from '../react-app-env';



class AuthService {
  static timerRef: ReturnType<typeof setTimeout>;

  static async login(credentials: LoginCredentials) {
    const { data } = await axios.post<LoginResponse>(`${config.api}/auth/login`, credentials, {
        withCredentials: true,
    });
    return data;
  }

  static async logout() {
    clearTimeout(this.timerRef);
    await axios.post(`${config.api}/auth/logout`, {}, {
      withCredentials: true,
    });
  }

  static setRefreshTimeout({ expireIn }: LoginResponse, callback: any) {
    // console.log('se puso el timer a ', expireIn);
    this.timerRef = setTimeout(async () => {
      try {
        const data = await this.refresh();
        callback(null, data);
        this.setRefreshTimeout(data, callback);
      } catch (error) {
        callback(error);
      }
    }, expireIn - 500);
  }

  static async refresh() {
    const { data } = await axios.post<LoginResponse>(`${config.api}/auth/token`,{}, {
      withCredentials: true,
    });
    return data;
  }

  static async invite(values: Invite, token: string | null) {
    const { data } = await axios.post<InviteResponse>(`${config.api}/auth/invite`, values, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return data;
  }

  static async signup(values: SignupCredentials) {
    const { data } = await axios.post(`${config.api}/auth/signup`, values);
    return data;
  }

  static async getUsers(token: string | null) {
    const { data } = await axios.get<User[]>(`${config.api}/auth/users`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return data;
  }

  static async updateUser(id: number | string, data: Partial<User>, token: string | null) {
    const { data: response } = await axios.patch<User>(`${config.api}/auth/users/${id}`, data, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return response;
  }

  static async startReset(email: string) {
    const { data } = await axios.post(`${config.api}/auth/start-reset`, { email });
    return data;
  }

  static async reset(token: string | null, password: string) {
    const { data } = await axios.post(`${config.api}/auth/reset`, { token, password });
    return data;
  }
}

export default AuthService;