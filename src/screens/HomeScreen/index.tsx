import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Layout} from '../../components/Layout';
import {ChannelList} from 'stream-chat-react-native';
import {useChannelStore, useUserStore} from '../../context';
import {ChannelSort} from 'stream-chat';
import {useChatClient} from '../../utils/hooks/useChatClient';
import {ActivityIndicator} from 'react-native-paper';
import {observer} from 'mobx-react-lite';
import {useNavigation} from '@react-navigation/native';
import {HeaderBar} from '../../components/Header';

export const HomeScreen = observer(() => {
  const userStore = useUserStore();
  const channelStore = useChannelStore();
  const navigation = useNavigation<any>();

  const filterChannelList = {
    members: {
      $in: [userStore.userInfo?._id!],
    },
  };

  const sort = {
    last_message_at: -1,
  } as ChannelSort;
  const {clientIsReady} = useChatClient();

  return (
    <Layout>
      <HeaderBar home />
      {!clientIsReady ? (
        <ActivityIndicator
          animating={true}
          color="#2c8ff2"
          size={50}
          style={styles.loading}
        />
      ) : (
        <View style={styles.channelList}>
          <ChannelList
            filters={filterChannelList}
            sort={sort}
            onSelect={channel => {
              channelStore.setCurrentChannel(channel);
              navigation.navigate('ChannelDetail');
            }}
          />
        </View>
      )}
    </Layout>
  );
});

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
  },
  channelList: {
    flex: 1,
  },
});
