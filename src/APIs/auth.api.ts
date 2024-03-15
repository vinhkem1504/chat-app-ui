import {axiosInstanceOptions, createAxiosInstance} from '../axios-instance';
import {API_URL} from '../config/chat.config';

export interface IAccount {
  password: string;
  email: string;
}
export type TLocation = {
  lat: number;
  lng: number;
};
export interface IUser {
  _id?: string;
  firstName: string;
  lastName: string;
  birthDay: Date;
  gender: number;
  avatar?: string;
  coverPhoto?: string;
  phoneNumber?: string;
  bioInfo?: string;
  address?: string;
  currentLocation?: TLocation;
}

export const userRegister = async (newUser: IAccount & IUser) => {
  try {
    const options: axiosInstanceOptions = {
      baseURL: `${API_URL}/auth/register`,
    };
    const instance = createAxiosInstance(options);
    const res = await instance.post('/', newUser);

    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const userLogin = async (userAccount: IAccount) => {
  try {
    const options: axiosInstanceOptions = {
      baseURL: `${API_URL}/auth/login`,
    };

    const instance = createAxiosInstance(options);

    const res = await instance.post('/', userAccount);

    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const userRefreshToken = async (refreshToken: string) => {
  try {
    const options: axiosInstanceOptions = {
      baseURL: `${API_URL}/auth/refresh`,
    };
    const instance = createAxiosInstance(options);
    const res = await instance.post('/', refreshToken);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const loginFromLocal = async () => {
  try {
    const options: axiosInstanceOptions = {
      baseURL: `${API_URL}/auth/check`,
    };
    const instance = createAxiosInstance(options);
    const res = await instance.get('/');
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
