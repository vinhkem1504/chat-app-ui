import {IUser} from '../APIs/auth.api';

export class UserStore {
  userInfo?: IUser;

  setUserInfomation = (user: IUser) => {
    this.userInfo = user;
  };

  get getUserInfomation() {
    return this.userInfo;
  }
}
