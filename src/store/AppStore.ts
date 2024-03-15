import {StreamVideoClient} from '@stream-io/video-react-native-sdk';
import {makeAutoObservable} from 'mobx';
import {StreamChat} from 'stream-chat';
import {CHAT_APP_KEY} from '../config/chat.config';
import {IRootStore} from './RootStore';
import {loginFromLocal} from '../APIs/auth.api';

export class AppStore {
  callClient?: StreamVideoClient;
  chatClient?: any;
  isAuthencated: boolean = false;

  constructor(private readonly rootStore: IRootStore) {
    makeAutoObservable(this);
    this.init();
  }

  init = async () => {
    try {
      const res = await loginFromLocal();
      if (res.data) {
        this.rootStore.userStore.setUserInfomation(res.data);
        this.isAuthencated = res.data;
      }
    } catch (error) {
      console.log(error);
    }
  };

  setCallClient = () => {
    const user = {
      id: this.rootStore.userStore.userInfo?._id!,
      name: this.rootStore.userStore.userInfo?.firstName!,
      image: this.rootStore.userStore.userInfo?.avatar || undefined,
    };

    const createCallClient = new StreamVideoClient({
      apiKey: CHAT_APP_KEY,
      user: user,
      token: this.rootStore.localStore.getToken,
    });

    this.callClient = createCallClient;
  };

  setChatClient = () => {
    const chatClient = StreamChat.getInstance(CHAT_APP_KEY);
    this.chatClient = chatClient;
  };

  get getCallClient() {
    return this.callClient;
  }

  get getChatClient() {
    return this.chatClient;
  }

  get getIsAuthencated() {
    return this.isAuthencated;
  }
}
