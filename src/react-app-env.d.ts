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
  picture?: string,
}

export interface Creator {
  id: number;
  name: string;
  avatar: string;
  role: string;
}

export interface Images {
  id?: number;
  small: string;
  medium: string;
  large: string;
  playerId?: number;
}

export interface PLayerResponse {
  id: number;
  firstName: string;
  lastName: string;
  cedula: string;
  birthday: Date;
  phone: string;
  eps: string;
  email: string;
  active: boolean;
  creatorId: number;
  createdAt: Date;
  updatedAt: Date;
  images?: Images | null;
  creator?: Creator;
}
