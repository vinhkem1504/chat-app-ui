import React from 'react';
import {Channel, MessageList, MessageInput} from 'stream-chat-react-native';
import {useChannelStore} from '../../context';
import {Layout} from '../../components/Layout';

export const ChatScreen: React.FC = () => {
  const channelStore = useChannelStore();
  return (
    <Layout backButton>
      <Channel channel={channelStore.currentChannel}>
        <MessageList />
        <MessageInput />
      </Channel>
    </Layout>
  );
};
