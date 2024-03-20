import {
  CallContent,
  CallControls,
  IncomingCall,
  MemberRequest,
  StreamCall,
  useStreamVideoClient,
} from '@stream-io/video-react-native-sdk';
import {Layout} from '../../components/Layout';
import {useChannelStore} from '../../context';
import {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';

export const CallPanel = () => {
  const channelStore = useChannelStore();
  const client = useStreamVideoClient();
  const [call, setCall] = useState<any>(null);
  const navigation = useNavigation<any>();

  useEffect(() => {
    const createCall = async () => {
      const callType = 'default';
      const callId = channelStore.getChannel?.id;
      const members = await channelStore.getChannel?.queryMembers({});

      const listMembers = members?.members.map(item => {
        return {user_id: item.user?.id};
      }) as unknown as MemberRequest[];

      const callC = client?.call(callType, callId!);
      callC?.getOrCreate({
        ring: true,
        data: {
          members: listMembers,
        },
      });
      console.log({callC});

      setCall(callC);
    };

    createCall();
  }, [channelStore.getChannel, client]);

  console.log({call});

  if (!call) {
    return null;
  }

  return (
    <StreamCall call={call}>
      <Layout>
        <IncomingCall onRejectCallHandler={() => navigation.goBack()} />
        {/* <CallContent /> */}
      </Layout>
    </StreamCall>
  );
};
