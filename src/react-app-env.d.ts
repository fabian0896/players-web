/// <reference types="react-scripts" />

export interface LoginCredentials { 
  email: string,
  password: string,
}

export interface User {
  name: string;
  email: string;
  id: number;
  role: 'admin' | 'reader' | 'editor';
  avatar: string;
}

export interface LoginResponse {
  token: string;
  refreshToken: string;
  expireIn: number;
  user: User;
}

export type PlayerCreate = {
  firstName: string,
  lastName: string,
  birthday: Date,
  eps: string,
  email: string,
  picture?: string,
  cedula: string,
  phone: string,
}