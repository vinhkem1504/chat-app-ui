import {AppStore} from './AppStore';
import {AuthStore} from './AuthStore';
import {ChannelStore} from './ChannelStore';
import {LocalStore} from './LocalStore';
import {UserStore} from './UserStore';

export interface IRootStore {
  authStore: AuthStore;
  userStore: UserStore;
  channelStore: ChannelStore;
  localStore: LocalStore;
  appStore: AppStore;
}

export class RootStore implements IRootStore {
  authStore: AuthStore;
  userStore: UserStore;
  channelStore: ChannelStore;
  localStore: LocalStore;
  appStore: AppStore;

  constructor() {
    this.authStore = new AuthStore(this);
    this.userStore = new UserStore(this);
    this.channelStore = new ChannelStore(this);
    this.localStore = new LocalStore(this);
    this.appStore = new AppStore(this);
  }
}
