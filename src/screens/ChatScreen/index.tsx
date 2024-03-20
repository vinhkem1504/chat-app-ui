import React, {useEffect} from 'react';
import {
  Channel,
  MessageList,
  MessageInput,
  KeyboardCompatibleView,
} from 'stream-chat-react-native';
import {useChannelStore} from '../../context';
import {Layout} from '../../components/Layout';
import {Platform, View} from 'react-native';
import {StyleSheet} from 'react-native';
import {HeaderBar} from '../../components/Header';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useCalls} from '@stream-io/video-react-native-sdk';

const CustomKeyboardCompatibleView = ({children}: {children: any}): any => {
  const insets = useSafeAreaInsets();

  if (Platform.OS === 'android') {
    return children;
  }

  const iosVerticalOffset = insets.bottom > 0 ? 100 : 0;

  return (
    <KeyboardCompatibleView keyboardVerticalOffset={iosVerticalOffset}>
      {children}
    </KeyboardCompatibleView>
  );
};

export const ChatScreen: React.FC = () => {
  const channelStore = useChannelStore();
  const calls = useCalls();
  useEffect(() => {
    console.log('calls', calls);
  }, [calls]);

  console.log('this screen call again');

  return (
    <Layout header>
      <View style={styles.wrapper}>
        <HeaderBar chat title={channelStore.getChannel?.data?.name} />
        <View style={styles.messageWrap}>
          <Channel
            channel={channelStore.getChannel}
            KeyboardCompatibleView={CustomKeyboardCompatibleView}>
            <MessageList />
            <MessageInput />
          </Channel>
        </View>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  messageWrap: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
  },
});
