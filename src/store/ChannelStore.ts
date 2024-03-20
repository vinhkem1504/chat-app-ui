import {makeAutoObservable} from 'mobx';
import {IRootStore} from './RootStore';
import {Channel} from 'stream-chat';
import {DefaultStreamChatGenerics} from 'stream-chat-react-native';
import {Call} from '@stream-io/video-react-native-sdk';

export class ChannelStore {
  currentChannel?: Channel<DefaultStreamChatGenerics>;
  currentCall?: Call;

  constructor(private readonly rootStore: IRootStore) {
    makeAutoObservable(this);
  }

  setCurrentChannel = (channel: any) => {
    this.currentChannel = channel;
  };

  setCurrentCall = (call: any) => {
    this.currentCall = call;
  };

  get getCall() {
    return this.currentCall;
  }

  get getChannel() {
    return this.currentChannel;
  }
}
