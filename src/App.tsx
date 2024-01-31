import React from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {LoginScreen} from './screens/LoginScreen';
import {ChatScreen} from './screens/ChatScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {SafeAreaView} from 'react-native-safe-area-context';
import {OverlayProvider, Chat, Thread, Channel} from 'stream-chat-react-native';
import {AppProvider, useAppContext} from './store/AppContext';
import {StreamChat} from 'stream-chat';
import {API_KEY} from './chatConfig';
import {ListChatScreen} from './screens/ListChatScreen';

const Stack = createStackNavigator();
const chatClient = StreamChat.getInstance(API_KEY);

const ThreadScreen = props => {
  const {channel, thread} = useAppContext();
  return (
    <Channel channel={channel} thread={thread} threadList>
      <Thread />
    </Channel>
  );
};

const NavigationStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="login" component={LoginScreen} />
      <Stack.Screen name="chat" component={ChatScreen} />
      <Stack.Screen name="channel" component={ListChatScreen} />
      <Stack.Screen name="thread" component={ThreadScreen} />
    </Stack.Navigator>
  );
};

function App(): React.JSX.Element {
  return (
    <AppProvider>
      <GestureHandlerRootView style={{flex: 1}}>
        <SafeAreaView style={{flex: 1}}>
          <OverlayProvider>
            <Chat client={chatClient}>
              <NavigationContainer>
                <NavigationStack />
              </NavigationContainer>
            </Chat>
          </OverlayProvider>
        </SafeAreaView>
      </GestureHandlerRootView>
    </AppProvider>
  );
}

export default App;
