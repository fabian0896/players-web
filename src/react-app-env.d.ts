/// <reference types="react-scripts" />

export type Role = 'admin' | 'reader' | 'editor'


export interface LoginCredentials { 
  email: string,
  password: string,
}

export interface SignupCredentials {
  name: string
  password: string
  email: string
  inviteToken: string,
}

export interface User {
  name: string;
  email: string;
  id: number;
  role: Role;
  avatar: string;
  active: boolean,
}

export interface UpdateUserValues {
  name?: string
  active?: boolean
  role?: Role
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
  active?: boolean
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

export interface PlayerResponse {
  data: PlayerData[],
  nextCursor?: number
}

export type PlayerData = {
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

export type Invite = {
  email: string,
  role: Role
}

export type InviteResponse = {
  inviteToken: string,
}
