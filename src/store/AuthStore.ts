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
  constructor(private readonly rootStore: IRootStore) {
    makeAutoObservable(this);
  }

  register = async (newUser: IAccount & IUser) => {
    try {
      const newUserInfo = await userRegister(newUser);
      this.rootStore.localStore.setToken(
        newUserInfo.accessToken!,
        newUserInfo.refreshToken!,
      );
    } catch (error) {
      console.log(error);
    }
  };

  login = async (account: IAccount) => {
    try {
      const userInfomation = await userLogin(account);
      await this.rootStore.localStore.setToken(
        userInfomation.accessToken!,
        userInfomation.refreshToken!,
      );
      console.log({userInfomation});

      this.rootStore.userStore.setUserInfomation(userInfomation.data);
      this.rootStore.appStore.loading = false;
    } catch (error) {
      console.log(error);
    }
  };

  refreshUserToken = async (refreshToken: string) => {
    try {
      const res = await userRefreshToken(refreshToken);
      this.rootStore.localStore.setToken(
        res.data.accessToken!,
        res.data.refreshToken!,
      );
    } catch (error) {
      console.log(error);
    }
  };
}
