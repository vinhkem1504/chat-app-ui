import {makeAutoObservable} from 'mobx';
import {IUser} from '../APIs/auth.api';
import {IRootStore} from './RootStore';

export class UserStore {
  userInfo?: IUser;

  constructor(private readonly rootStore: IRootStore) {
    makeAutoObservable(this);
  }

  setUserInfomation = (user: IUser) => {
    this.userInfo = user;
  };

  get getUserInfomation() {
    return this.userInfo;
  }
}
