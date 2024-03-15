import {makeAutoObservable, runInAction} from 'mobx';
import {IRootStore} from './RootStore';
import AsyncStorage from '@react-native-async-storage/async-storage';

export class LocalStore {
  token?: string;

  constructor(private readonly rootStore: IRootStore) {
    makeAutoObservable(this);
    this.getAccessTokenFromLocal();
  }

  setToken = async (accessToken: string, refreshToken: string) => {
    this.token = accessToken;
    await AsyncStorage.setItem('accessToken', accessToken);
    await AsyncStorage.setItem('refreshToken', refreshToken);
  };

  getAccessTokenFromLocal = async () => {
    const temp = await AsyncStorage.getItem('accessToken');

    if (temp) {
      runInAction(() => {
        this.token = temp;
      });
    }
  };

  get getToken() {
    return this.token;
  }
}
