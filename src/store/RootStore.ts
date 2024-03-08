import {AuthStore} from './AuthStore';
import {ChannelStore} from './ChannelStore';
import {UserStore} from './UserStore';

export interface IRootStore {
  authStore: AuthStore;
  userStore: UserStore;
  channelStore: ChannelStore;
}

export class RootStore implements IRootStore {
  authStore: AuthStore;
  userStore: UserStore;
  channelStore: ChannelStore;

  constructor() {
    this.authStore = new AuthStore(this);
    this.userStore = new UserStore(this);
    this.channelStore = new ChannelStore(this);
  }
}
