import React, {useEffect} from 'react';
import {useAppStore, useLocalStore} from '../context';
import {AuthStack} from './AuthStack';
import {AppMainTabs} from './AppMainTabs';
import {observer} from 'mobx-react-lite';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ChatScreen} from '../screens/ChatScreen';
import {OverlayProvider} from 'stream-chat-react-native';
import {CallScreen} from '../screens/CallScreen';
import {Chat} from 'stream-chat-react-native';
import {StreamVideo} from '@stream-io/video-react-native-sdk';
import {CallPanel} from '../screens/CallPanel';

const Stack = createNativeStackNavigator();

const AppStack = observer(() => {
  const appStore = useAppStore();

  if (!appStore.callClient || !appStore.chatClient) {
    return null;
  }
  return (
    <StreamVideo client={appStore.callClient}>
      <Chat client={appStore.chatClient}>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="Home" component={AppMainTabs} />
          <Stack.Screen name="ChannelDetail" component={ChatScreen} />
          <Stack.Screen name="CallPanel" component={CallPanel} />
          <Stack.Screen name="CallScreen" component={CallScreen} />
        </Stack.Navigator>
      </Chat>
    </StreamVideo>
  );
});

export const AppNavigator = observer(() => {
  const appStore = useAppStore();
  const localStore = useLocalStore();
  useEffect(() => {
    appStore.setCallClient();
    appStore.setChatClient();
  }, [appStore, localStore.token]);

  return (
    <OverlayProvider>
      {!appStore.getIsAuthencated ? <AuthStack /> : <AppStack />}
    </OverlayProvider>
  );
});
