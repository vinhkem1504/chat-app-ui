import {useEffect, useState} from 'react';
import {StreamChat} from 'stream-chat';
import {CHAT_APP_KEY} from '../../config/chat.config';
import {useLocalStore, useUserStore} from '../../context';

export const useChatClient = () => {
  const userStore = useUserStore();
  const localStore = useLocalStore();
  const [clientIsReady, setClientIsReady] = useState<boolean>(false);

  const chatClient = StreamChat.getInstance(CHAT_APP_KEY);

  useEffect(() => {
    const chatUser = {
      name: userStore.userInfo?.firstName + ' ' + userStore.userInfo?.lastName,
      id: userStore.userInfo?._id!,
    };

    const setupClient = async () => {
      try {
        if (chatClient.user === undefined && localStore.getToken) {
          chatClient.connectUser(chatUser, localStore.getToken);
          setClientIsReady(true);
        }
      } catch (error) {
        throw new Error('Chat user error');
      }
    };
    if (chatUser.id) {
      setupClient();
    }
  }, [
    chatClient,
    clientIsReady,
    localStore.getToken,
    userStore.userInfo?._id,
    userStore.userInfo?.firstName,
    userStore.userInfo?.lastName,
  ]);
  return {
    clientIsReady,
  };
};
