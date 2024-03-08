import {useEffect, useState} from 'react';
import {StreamChat} from 'stream-chat';
import {CHAT_APP_KEY} from '../../config/chat.config';
import {useAuthStore, useUserStore} from '../../context';

export const useChatClient = () => {
  const userStore = useUserStore();
  const authStore = useAuthStore();
  const [clientIsReady, setClientIsReady] = useState<boolean>(false);

  const chatClient = StreamChat.getInstance(CHAT_APP_KEY);

  const accessToken = authStore.getAccessToken;

  useEffect(() => {
    const chatUser = {
      name: userStore.userInfo?.firstName + ' ' + userStore.userInfo?.lastName,
      id: userStore.userInfo?._id!,
    };
    const setupClient = async () => {
      try {
        if (chatClient.user === undefined) {
          chatClient.connectUser(chatUser, accessToken);
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
    accessToken,
    chatClient,
    clientIsReady,
    userStore.userInfo?._id,
    userStore.userInfo?.firstName,
    userStore.userInfo?.lastName,
  ]);
  return {
    clientIsReady,
  };
};
