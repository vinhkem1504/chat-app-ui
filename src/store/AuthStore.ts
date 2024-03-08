import AsyncStorage from '@react-native-async-storage/async-storage';
import {makeAutoObservable} from 'mobx';
import {
  IAccount,
  IUser,
  userLogin,
  userRefreshToken,
  userRegister,
} from '../APIs/auth.api';
import {IRootStore} from './RootStore';

export class AuthStore {
  accessToken?: string;
  refreshToken?: string;
  loading: boolean = true;

  constructor(private readonly rootStore: IRootStore) {
    makeAutoObservable(this);
  }

  setToken = async (accessToken: string, refreshToken: string) => {
    await AsyncStorage.setItem('accessToken', accessToken);
    await AsyncStorage.setItem('refreshToken', refreshToken);
  };

  register = async (newUser: IAccount & IUser) => {
    try {
      const newUserInfo = await userRegister(newUser);
      this.setToken(newUserInfo.accessToken!, newUserInfo.refreshToken!);
    } catch (error) {
      console.log(error);
    }
  };

  login = async (account: IAccount) => {
    try {
      const userInfomation = await userLogin(account);
      await this.setToken(
        userInfomation.accessToken!,
        userInfomation.refreshToken!,
      );
      this.accessToken = userInfomation.accessToken;
      this.refreshToken = userInfomation.refreshToken;
      this.rootStore.userStore.setUserInfomation(userInfomation.data);
      this.loading = false;
    } catch (error) {
      console.log(error);
    }
  };

  refreshUserToken = async (refreshToken: string) => {
    try {
      const res = await userRefreshToken(refreshToken);
      this.accessToken = res.data.accessToken!;
      this.refreshToken = res.data.refreshToken!;
      this.setToken(res.data.accessToken!, res.data.refreshToken!);
    } catch (error) {
      console.log(error);
    }
  };

  get getAccessToken(): string {
    return this.accessToken!;
  }

  get getRefreshToken(): string {
    return this.refreshToken!;
  }
}
