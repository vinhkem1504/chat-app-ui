import {makeAutoObservable} from 'mobx';
import {IRootStore} from './RootStore';
import {Channel} from 'stream-chat';
import {DefaultStreamChatGenerics} from 'stream-chat-react-native';

export class ChannelStore {
  currentChannel?: Channel<DefaultStreamChatGenerics>;

  constructor(private readonly rootStore: IRootStore) {
    makeAutoObservable(this);
  }

  setCurrentChannel = (channel: any) => {
    this.currentChannel = channel;
  };
}
