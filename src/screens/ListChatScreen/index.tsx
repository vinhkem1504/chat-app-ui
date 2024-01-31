import React, {useEffect, useState} from 'react';
import {ChannelList, ChannelPreviewMessenger} from 'stream-chat-react-native';
import {ChannelFilters, ChannelSort} from 'stream-chat';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useAppContext} from '../../store/AppContext';
import {useChatClient} from '../../libs/hooks/useChatClient';
import {Text} from 'react-native-paper';

const user_id = async () => {
  const id = await AsyncStorage.getItem('user_id');
  return id;
};

const sort: ChannelSort = {
  last_message_at: -1,
};

export const ListChatScreen = (props: any) => {
  const {setChannel} = useAppContext();
  const {clientIsReady} = useChatClient();
  const [id, setId] = useState('');
  useEffect(() => {
    const fetchUserId = async () => {
      const _id = await user_id();
      setId(_id);
    };

    fetchUserId();
  }, []);

  console.log('ready', clientIsReady);

  const filter: ChannelFilters = {
    members: {
      $in: [id],
    },
  };

  if (!clientIsReady) {
    return <Text>Loading chat ...</Text>;
  }
  const CustomListItem = props => {
    return <ChannelPreviewMessenger {...props} />;
  };
  return (
    <ChannelList
      Preview={CustomListItem}
      filters={filter}
      sort={sort}
      onSelect={channel => {
        const {navigation} = props;
        setChannel(channel);
        navigation.navigate('chat');
      }}
    />
  );
};
