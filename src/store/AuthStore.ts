import {AsyncStorage} from '@';

export class AuthStore {
  accessToken?: string;
  refreshToken?: string;
  loading?: boolean = true;

  setToken = async (accessToken: string, refreshToken: string) => {
    await AsyncStorage;
  };
}
