import {makeAutoObservable} from 'mobx';
import {IRootStore} from './RootStore';

export class ChannelStore {
  currentChannel?: any;

  constructor(private readonly rootStore: IRootStore) {
    makeAutoObservable(this);
  }

  setCurrentChannel = (channel: any) => {
    this.currentChannel = channel;
  };
}
