import {useEffect, useState} from 'react';
import {StreamChat} from 'stream-chat';
import {API_KEY} from '../../chatConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

const chatClient = StreamChat.getInstance(API_KEY);

export const useChatClient = () => {
  const [clientIsReady, setClientIsReady] = useState<boolean>(false);
  console.log('run');

  useEffect(() => {
    const setupClient = async () => {
      const user_id = await AsyncStorage.getItem('user_id');
      const name = await AsyncStorage.getItem('name');
      const accessToken = await AsyncStorage.getItem('accessToken');

      console.log('data', {user_id, name, accessToken});

      try {
        const user = {
          id: user_id!,
          name: name!,
        };
        chatClient.connectUser(user, accessToken);
        setClientIsReady(true);
      } catch (error) {
        console.log(error);
      }
    };

    if (!chatClient.userID) {
      setupClient();
    }
  }, []);

  return {clientIsReady};
};
