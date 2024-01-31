import React from 'react';
import {SafeAreaView} from 'react-native';
import {Channel, MessageList, MessageInput} from 'stream-chat-react-native';
import {useAppContext} from '../../store/AppContext';

export const ChatScreen = (props: any) => {
  const {channel, setThread} = useAppContext();
  const {navigation} = props;
  return (
    <SafeAreaView>
      <Channel channel={channel!}>
        <MessageList
          onThreadSelect={message => {
            if (channel?.id) {
              setThread(message);
              navigation.navigate('ThreadScreen');
            }
          }}
        />
        <MessageInput />
      </Channel>
    </SafeAreaView>
  );
};
