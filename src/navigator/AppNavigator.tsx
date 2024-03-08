import React from 'react';
import {useAuthStore} from '../context';
import {AuthStack} from './AuthStack';
import {AppMainTabs} from './AppMainTabs';
import {observer} from 'mobx-react-lite';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ChatScreen} from '../screens/ChatScreen';
import {OverlayProvider, Chat} from 'stream-chat-react-native';
import {StreamChat} from 'stream-chat';
import {CHAT_APP_KEY} from '../config/chat.config';

const chatClient = StreamChat.getInstance(CHAT_APP_KEY) as any;

const Stack = createNativeStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Home" component={AppMainTabs} />
      <Stack.Screen name="ChannelDetail" component={ChatScreen} />
    </Stack.Navigator>
  );
};

export const AppNavigator = observer(() => {
  const {loading} = useAuthStore();

  return (
    <OverlayProvider>
      {loading ? (
        <AuthStack />
      ) : (
        <Chat client={chatClient}>
          <AppStack />
        </Chat>
      )}
    </OverlayProvider>
  );
});
